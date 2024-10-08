#!/bin/bash

# deploy_frontend.sh
# Description: Automates the deployment of the React frontend using Docker and Traefik.

# Exit immediately if a command exits with a non-zero status
set -e

# ------------------------------
# Configuration - Customize Below
# ------------------------------

# Frontend project configuration
FRONTEND_DIR="/path/to/your-project/frontend"  # Update to your actual frontend directory path
COMPOSE_FILE="/path/to/your-project/docker-compose.frontend.yml"  # Update to your actual compose file path

# Docker image configuration
IMAGE_NAME="frontend:latest"  # Image name and tag

# React app domain (for Traefik routing)
REACT_APP_DOMAIN="your-react-app-domain.com"  # Replace with your actual domain

# Logging configuration (optional)
LOG_FILE="/var/log/deploy_frontend.log"
mkdir -p "$(dirname "${LOG_FILE}")"
touch "${LOG_FILE}"
chmod 644 "${LOG_FILE}"
exec > >(tee -a "${LOG_FILE}") 2>&1

# ------------------------------
# Helper Functions
# ------------------------------

usage() {
    echo "Usage: $0"
    echo ""
    echo "This script deploys the React frontend by building the Docker image from HEAD and updating the service using docker-compose."
    exit 1
}

# ------------------------------
# Deployment Steps
# ------------------------------

echo "======================================="
echo "Starting Deployment of React Frontend"
echo "======================================="

# Step 0: Load environment variables from .env (optional)
if [ -f "${FRONTEND_DIR}/.env" ]; then
    echo "[Step 0] Loading environment variables from .env..."
    export $(grep -v '^#' "${FRONTEND_DIR}/.env" | xargs)
fi

# Step 1: Navigate to the frontend directory
echo "[Step 1] Navigating to frontend directory..."
cd "${FRONTEND_DIR}"

# Optional Step: Pull the latest code from the repository
# Uncomment the following lines if you want the script to update the code
# echo "[Step 1.1] Pulling latest code from repository..."
# git pull origin main  # Replace 'main' with your default branch if different

# Step 2: Build the Docker image
echo "[Step 2] Building Docker image for frontend..."
docker build -t "${IMAGE_NAME}" -f Dockerfile .

# Step 3: Deploy the frontend service using Docker Compose
echo "[Step 3] Deploying frontend service with Docker Compose..."
docker-compose -f "${COMPOSE_FILE}" up -d --no-deps --build frontend

# Optional Step: Remove dangling images to save space
echo "[Step 4] Cleaning up unused Docker images..."
docker image prune -f

echo "======================================="
echo "Deployment Completed Successfully"
echo "======================================="
