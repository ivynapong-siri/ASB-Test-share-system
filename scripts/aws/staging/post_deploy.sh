#!/bin/bash
set -e

APP_IMAGE_NAME=american-school-next-staging:latest
SERVER_NAME="American School Staging"
DEPLOY_DIR="/home/ubuntu/app/american-school-staging/deploy"

# Remove old images if they exist
if [[ "$(docker images -q ${APP_IMAGE_NAME} 2> /dev/null)" != "" ]]; then
    docker rmi ${APP_IMAGE_NAME} -f
fi

# Load new images
docker load < "$DEPLOY_DIR/american-school-next-image.tar"

# Start containers
docker compose -f "$DEPLOY_DIR/docker-compose.staging.yml" up -d
docker image prune -f

# Send server info to internal slack channel
memory=$(free -b | awk '/Mem:/ {print $2,$3}')
memory_total=$(echo "$memory" | awk '{printf "%.2f", $1/(1024*1024*1024)}')
memory_used=$(echo "$memory" | awk '{printf "%.2f", $2/(1024*1024*1024)}')
memory_percentage=$(echo "scale=2; ($memory_used/$memory_total)*100" | bc)

df_output=$(df --output=used,size,pcent / | awk 'NR==2')
df_used=$(echo "$df_output" | awk '{print $1}')
df_total=$(echo "$df_output" | awk '{print $2}')
df_used_gb=$(echo "scale=2; $df_used / 1024 / 1024" | bc)
df_total_gb=$(echo "scale=2; $df_total / 1024 / 1024" | bc)
df_percentage=$(echo "$df_output" | awk '{print $3}' | sed 's/\%//')

echo "Server: American School Staging"
echo "Memory Usage: ${memory_used}GB / ${memory_total}GB (${memory_percentage}%)"
echo "Disk Usage: ${df_used_gb}GB / ${df_total_gb}GB (${df_percentage}%)"

curl --location --request POST '' \
                --header 'Content-Type: application/json' \
                    --data-raw '{
                        "text": "'"$SERVER_NAME"' : Server info..",
                        "blocks": [
                            {
                                "type": "section",
                                "fields": [
                                    {
                                        "type": "mrkdwn",
                                        "text": "'"$SERVER_NAME"'\nStorage: '"$df_used_gb"'/'"$df_total_gb"' Gb ('"$df_percentage"'%)\nMemory: '"$memory_used"'/'"$memory_total"' Gb ('"$memory_percentage"'%)"
                                    }
                                ]
                            }
                        ]
                    }'