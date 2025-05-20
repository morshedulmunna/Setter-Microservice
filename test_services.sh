#!/bin/bash

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Services to test
SERVICES=(
    "user-auth:3000/api/auth"
    "product:3000/api/products"
    "order:3000/api/orders"
    "public_web:3000"
    "admin_web:3000"
)

# Kong Gateway test URLs
KONG_URLS=(
    "http://localhost:8000/api/auth"
    "http://localhost:8000/api/products"
    "http://localhost:8000/api/orders"
)

# Function to test service connectivity
test_service_connectivity() {
    local service=$1
    local port=$2
    local endpoint=$3

    echo -e "${YELLOW}Testing $service service...${NC}"
    
    # Direct service test
    response=$(docker-compose exec -T $service curl -s -o /dev/null -w "%{http_code}" http://localhost:$port/$endpoint)
    
    if [[ "$response" -ge 200 && "$response" -lt 300 ]]; then
        echo -e "${GREEN}✓ $service service is accessible (HTTP $response)${NC}"
        return 0
    else
        echo -e "${RED}✗ $service service failed (HTTP $response)${NC}"
        return 1
    fi
}

# Function to test Kong Gateway routing
test_kong_routing() {
    local url=$1
    
    echo -e "${YELLOW}Testing Kong Gateway: $url${NC}"
    
    response=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [[ "$response" -ge 200 && "$response" -lt 300 ]]; then
        echo -e "${GREEN}✓ Kong routing for $url is working (HTTP $response)${NC}"
        return 0
    else
        echo -e "${RED}✗ Kong routing for $url failed (HTTP $response)${NC}"
        return 1
    fi
}

# Performance and load test function
performance_test() {
    local url=$1
    
    echo -e "${YELLOW}Performance Test for $url${NC}"
    
    # Use wrk for load testing
    wrk_output=$(wrk -t4 -c100 -d10s "$url")
    
    echo "$wrk_output"
}

# Main testing function
main() {
    echo -e "${YELLOW}===== Microservices Connectivity Test =====${NC}"
    
    # Test individual services
    for service in "${SERVICES[@]}"; do
        IFS=':' read -r name port_endpoint <<< "$service"
        IFS='/' read -r port endpoint <<< "$port_endpoint"
        test_service_connectivity "$name" "$port" "${endpoint:-}"
    done
    
    echo -e "\n${YELLOW}===== Kong Gateway Routing Test =====${NC}"
    
    # Test Kong routing
    for url in "${KONG_URLS[@]}"; do
        test_kong_routing "$url"
    done
    
    # Optional: Performance testing (requires wrk)
    echo -e "\n${YELLOW}===== Optional Performance Tests =====${NC}"
    echo "Note: Performance tests require 'wrk' to be installed"
    
    read -p "Run performance tests? (y/n): " run_perf
    if [[ $run_perf == "y" ]]; then
        for url in "${KONG_URLS[@]}"; do
            performance_test "$url"
        done
    fi
}

# Run tests
main 