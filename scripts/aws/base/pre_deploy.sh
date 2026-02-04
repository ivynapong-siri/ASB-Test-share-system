#!/bin/bash
set -e

### Docker prune if storage almost full
storage_usage=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ $storage_usage -gt 85 ]; then
  echo "Server storage usage is ${storage_usage}%, running docker system prune..."
  docker system prune -f
else
  echo "Server storage usage is ${storage_usage}%, no need to run docker system prune."
fi

# Install AWS CLI if missing
if ! command -v aws &> /dev/null; then
    echo "AWS CLI not found. Installing..."
    sudo apt update && sudo apt install -y awscli
fi

# Install unzip if missing
if ! command -v unzip &> /dev/null; then
    echo "Unzip not found. Installing..."
    sudo apt install -y unzip
fi