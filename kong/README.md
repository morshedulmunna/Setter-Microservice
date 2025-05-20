# API Gateway Configuration

## Overview

This API Gateway setup provides:

- A unified backend URL for all services
- Separate web application URLs
- Advanced routing and security features

## URL Structure

### Backend API

- **Base URL**: `http://yourdomain.com/api/v1`
- **Supported Methods**: GET, POST, PUT, DELETE, PATCH
- **Rate Limit**: 10 requests/second, 600/minute, 10,000/hour

### Web Applications

1. **Public Web**

   - **URL**: `http://public.yourdomain.com`
   - **Allowed Methods**: GET

2. **Admin Web**
   - **URL**: `http://admin.yourdomain.com`
   - **Allowed Methods**: GET, POST, PUT, DELETE

## Features

### Backend API

- Rate Limiting
- CORS Support
- JWT Authentication
- Prometheus Metrics
- Request Size Limiting
- Compression

### Routing

- Path-based routing
- Host-based routing
- Method-based access control

## Developer Integration Guide

### Backend Services

1. All backend services should be accessible at `localhost:3000`
2. Implement endpoints under `/api/v1`
3. Use standard HTTP methods (GET, POST, PUT, DELETE)

### Web Applications

1. Public Web: Serve at `public_web:3000`
2. Admin Web: Serve at `admin_web:3000`

## Example API Calls

```bash
# Backend API Call
curl http://yourdomain.com/api/v1/users

# Public Web
curl http://public.yourdomain.com

# Admin Web
curl http://admin.yourdomain.com
```

## Local Development

1. Update `/etc/hosts` for local testing:

```
127.0.0.1 public.yourdomain.com
127.0.0.1 admin.yourdomain.com
```

2. Start services:

```bash
docker-compose -f docker-compose.kong.yml up -d
```

## Security Recommendations

- Use HTTPS in production
- Implement strong JWT authentication
- Regularly update Kong and plugins
- Monitor Prometheus metrics

## Troubleshooting

- Check Kong logs: `docker logs kong-gateway`
- Verify service availability
- Check network configurations
