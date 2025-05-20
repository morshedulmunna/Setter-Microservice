#!/bin/bash

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Project startup script

# Check for required tools
command -v docker >/dev/null 2>&1 || { echo >&2 "Docker is required but not installed. Aborting."; exit 1; }
command -v docker-compose >/dev/null 2>&1 || { echo >&2 "Docker Compose is required but not installed. Aborting."; exit 1; }

# Function to print status
print_status() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Function to print warning
print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Startup sequence
main() {
    echo "🚀 Microservices Project Startup"
    
    # Create network if not exists
    docker network inspect microservices_network >/dev/null 2>&1 || {
        docker network create microservices_network
        print_status "Created microservices network"
    }

    # Prepare environment
    print_warning "Preparing environment..."
    
    # Generate .env file if not exists
    if [ ! -f .env ]; then
        cat > .env << EOL
COMPOSE_PROJECT_NAME=microservices
POSTGRES_USER=microservices
POSTGRES_PASSWORD=microservices_secret
KONG_PG_PASSWORD=kong_secret
EOL
        print_status "Generated .env file"
    fi

    # Build images
    print_warning "Building Docker images..."
    docker-compose build
    print_status "Images built successfully"

    # Start services
    print_warning "Starting services..."
    docker-compose up -d
    print_status "All services are now running"

    # Show running containers
    echo -e "\n📋 Running Containers:"
    docker-compose ps

    # Show access points
    echo -e "\n🌐 Access Points:"
    echo "- Kong API Gateway: http://localhost:8000"
    echo "- Kong Admin: http://localhost:8001"
    echo "- Prometheus: http://localhost:9090"
    echo "- Grafana: http://localhost:3030"
}

# Error handling
trap 'echo "❌ An error occurred. Exiting..."; exit 1' ERR

# Run main function
main

# Optional: Show logs
read -p "Would you like to view service logs? (y/n): " show_logs
if [[ $show_logs == "y" ]]; then
    docker-compose logs -f
fi 