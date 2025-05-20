#!/bin/bash

# Color Codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Verification Functions
check_docker() {
    echo -e "${YELLOW}Checking Docker Installation...${NC}"
    docker --version && docker-compose --version
}

start_services() {
    echo -e "${YELLOW}Starting Microservices...${NC}"
    ./start.sh
}

verify_containers() {
    echo -e "${YELLOW}Verifying Running Containers...${NC}"
    docker-compose ps
}

test_api_endpoints() {
    echo -e "${YELLOW}Testing API Endpoints...${NC}"
    
    endpoints=(
        "http://localhost:8000/api/auth"
        "http://localhost:8000/api/products"
        "http://localhost:8000/api/orders"
    )
    
    for endpoint in "${endpoints[@]}"; do
        response=$(curl -s -o /dev/null -w "%{http_code}" "$endpoint")
        if [[ "$response" -ge 200 && "$response" -lt 300 ]]; then
            echo -e "${GREEN}✓ Endpoint $endpoint is accessible (HTTP $response)${NC}"
        else
            echo -e "${RED}✗ Endpoint $endpoint failed (HTTP $response)${NC}"
        fi
    done
}

check_monitoring_tools() {
    echo -e "${YELLOW}Checking Monitoring Tools...${NC}"
    
    tools=(
        "http://localhost:8001"   # Kong Admin
        "http://localhost:9090"   # Prometheus
        "http://localhost:3030"   # Grafana
    )
    
    for tool in "${tools[@]}"; do
        if curl -s "$tool" > /dev/null; then
            echo -e "${GREEN}✓ $tool is accessible${NC}"
        else
            echo -e "${RED}✗ $tool is not accessible${NC}"
        fi
    done
}

network_inspection() {
    echo -e "${YELLOW}Inspecting Docker Network...${NC}"
    docker network inspect microservices_network
}

main() {
    echo -e "${YELLOW}🚀 Microservices Deployment Verification 🚀${NC}"
    
    check_docker
    start_services
    sleep 30  # Wait for services to start
    
    verify_containers
    test_api_endpoints
    check_monitoring_tools
    network_inspection
    
    echo -e "${GREEN}✨ Deployment Verification Complete! ✨${NC}"
}

# Run verification
main 