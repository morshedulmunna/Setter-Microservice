#!/bin/bash

# Wait for Kong Admin API to be ready
until curl -s http://kong-gateway:8001; do
  echo "Waiting for Kong Admin API..."
  sleep 5
done

# Configure User Auth Service
curl -i -X POST http://kong-gateway:8001/services \
  --data name=user-auth-service \
  --data url=http://user-auth:3000

curl -i -X POST http://kong-gateway:8001/services/user-auth-service/routes \
  --data name=user-auth-route \
  --data 'paths[]=/api/auth' \
  --data 'paths[]=/api/users'

# Configure Product Service
curl -i -X POST http://kong-gateway:8001/services \
  --data name=product-service \
  --data url=http://product:3000

curl -i -X POST http://kong-gateway:8001/services/product-service/routes \
  --data name=product-route \
  --data 'paths[]=/api/products'

# Configure Order Service
curl -i -X POST http://kong-gateway:8001/services \
  --data name=order-service \
  --data url=http://order:3000

curl -i -X POST http://kong-gateway:8001/services/order-service/routes \
  --data name=order-route \
  --data 'paths[]=/api/orders'

# Configure Admin Web
curl -i -X POST http://kong-gateway:8001/services \
  --data name=admin-web-service \
  --data url=http://admin_web:3000

curl -i -X POST http://kong-gateway:8001/services/admin-web-service/routes \
  --data name=admin-route \
  --data 'paths[]=/admin'

# Configure Public Web
curl -i -X POST http://kong-gateway:8001/services \
  --data name=public-web-service \
  --data url=http://public_web:3000

curl -i -X POST http://kong-gateway:8001/services/public-web-service/routes \
  --data name=public-route \
  --data 'paths[]=/'"

# Print success message
echo "Kong routes configured successfully!"

# Make the script executable
chmod +x kong/configure_routes.sh 