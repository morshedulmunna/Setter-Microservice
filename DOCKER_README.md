# Docker Compose Setup for Microservices

## Prerequisites

- Docker
- Docker Compose
- Node.js (recommended 20.x)

## Services

The Docker Compose configuration includes the following services:

1. **Admin Web** - Port 3001
2. **Public Web** - Port 3002
3. **Order Service** - Port 3003
4. **Product Service** - Port 3004
5. **User Auth Service** - Port 3005

## Getting Started

### Development Mode

```bash
# Build and start all services
docker-compose up --build

# Build and start services in detached mode
docker-compose up -d --build

# Stop all services
docker-compose down

# View logs for all services
docker-compose logs -f

# View logs for a specific service
docker-compose logs -f admin_web
```

### Accessing Services

- Admin Web: `http://localhost:3001`
- Public Web: `http://localhost:3002`
- Order Service: `http://localhost:3003`
- Product Service: `http://localhost:3004`
- User Auth Service: `http://localhost:3005`

## Development Workflow

- Volumes are mounted to allow live reloading
- Each service uses its respective `Dockerfile.dev`
- Environment is set to development mode

## Troubleshooting

- Ensure no other services are running on the specified ports
- Check Docker and Docker Compose versions
- Verify network connectivity

## Performance Optimization

- Use `docker-compose up --build -j` for parallel builds
- Utilize Docker layer caching
- Minimize image size in individual Dockerfiles
