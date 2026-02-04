#! /bin/bash

PORT='9090'
app_name='ASB Production'
app_path='/root/workspace/american-school-nextjs'
deploy_branch_name='deploy/production'
deploy_file_path='scripts/docker/docker-compose.production.yml'

notify_slack() {
    curl --location --request POST "" \
        --header "Content-Type: application/json" \
        --data-raw "$1"
}
# Argument details
# 1.Branch 2.Pusher name 3.Pusher email
# 4.Last commit name 5.Last commit email

if [ "$1" = "refs/heads/${deploy_branch_name}" ]; then
    payload='{
        "text": "'${app_name}': Deployment starting...",
        "blocks": [
            {
                "type": "header",
                "text": {
                    "type": "plain_text",
                    "text": ":mega: Deployment starting",
                    "emoji": true
                }
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": "*Project:*\n'${app_name}'"
                    }
                ]
            },
            {
                "type": "section",
                "fields": [
                    {
                        "type": "mrkdwn",
                        "text": "*Details:*\nPushed by '$2'\nLast commited by '$4'"
                    }
                ]
            }
        ]
    }'
    output=$(notify_slack "$payload" 2>&1 &&
        cd $app_path 2>&1 &&
        git checkout $deploy_branch_name 2>&1 &&
        git pull origin $deploy_branch_name 2>&1 &&
        docker compose -f $deploy_file_path up -d --build 2>&1 &&
        docker system prune --force 2>&1 &&
        sleep 10 2>&1 &&
        curl http://localhost:${PORT} > /dev/null)
    if [ $? -eq 0 ]; then
        payload='{
            "text": "'${app_name}': Deployment successful...",
            "blocks": [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": ":white_check_mark: Deployment successful",
                        "emoji": true
                    }
                },
                {
                    "type": "section",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": "*Project:*\n'${app_name}'"
                        }
                    ]
                }
            ]
        }'
        notify_slack "$payload"
    else
        error=$(echo $output | tr -d "\"" | tr -d "\'" | sed -r 's/[^[:print:]]//g' | tail -c 2500)
        payload='{
            "text": "'${app_name}': Deployment failed",
            "blocks": [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": ":x: Deployment failed",
                        "emoji": true
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Project:*\n'${app_name}'"
                    }
                    
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Log:*\n'${error}'"
                    }
                }
            ]
        }'
        notify_slack "$payload"
    fi
fi