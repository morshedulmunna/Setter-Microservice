# Microservices and Web Application Project

## Project Structure

### NestJS Microservices

..

1. **Product Service** (`/nestjs-projects/product`)

   - Handles product-related operations
   - Located in: `nestjs-projects/product`

2. **Order Service** (`/nestjs-projects/order`)

   - Manages order processing and tracking
   - Located in: `nestjs-projects/order`

3. **User Authentication Service** (`/nestjs-projects/user-auth`)
   - Handles user registration, login, and authentication
   - Located in: `nestjs-projects/user-auth`

### Next.js Web Applications

1. **Public Web** (`/nextjs-projects/public_web`)

   - Customer-facing web application
   - Located in: `nextjs-projects/public_web`

2. **Admin Web** (`/nextjs-projects/admin_web`)
   - Administrative dashboard and management interface
   - Located in: `nextjs-projects/admin_web`

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- NestJS CLI
- TypeScript

### Setup Instructions

1. Clone the repository
2. Navigate to each project directory
3. Run `npm install` to install dependencies
4. Use `npm run start` to run individual services/applications

## Development Notes

- Each service and web app is set up with TypeScript
- NestJS services use npm as package manager
- Next.js apps configured with Tailwind CSS and ESLint

## Future Improvements

- Add inter-service communication
- Implement authentication middleware
- Set up CI/CD pipelines

# Microservices Project Docker Deployment

## Prerequisites

- Docker (20.10+)
- Docker Compose (1.29+)
- Git
- Minimum 8GB RAM recommended

## Project Structure

```
.
├── admin_web/           # Admin Web Application
├── public_web/          # Public Web Application
├── user-auth/           # User Authentication Service
├── product/             # Product Service
├── order/               # Order Service
├── kong/                # API Gateway Configuration
├── monitoring/          # Monitoring Configuration
├── docker-compose.yml   # Main Docker Compose Configuration
└── start.sh             # Project Startup Script
```

## Quick Start

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <project-directory>
```

### 2. Make Startup Script Executable

```bash
chmod +x start.sh
```

### 3. Start the Project

```bash
./start.sh
```

## Services Overview

### Backend Microservices

- **User Authentication**: `http://localhost:8000/api/auth`
- **Product Service**: `http://localhost:8000/api/products`
- **Order Service**: `http://localhost:8000/api/orders`

### Web Applications

- **Public Web**: `http://public.yourdomain.com`
- **Admin Web**: `http://admin.yourdomain.com`

### Management & Monitoring

- **Kong API Gateway**: `http://localhost:8000`
- **Kong Admin**: `http://localhost:8001`
- **Prometheus**: `http://localhost:9090`
- **Grafana**: `http://localhost:3030`

## Docker Commands

### Build Services

```bash
docker-compose build
```

### Start Services

```bash
docker-compose up -d
```

### Stop Services

```bash
docker-compose down
```

### View Logs

```bash
docker-compose logs -f
```

## Troubleshooting

### Common Issues

- Ensure no port conflicts
- Check Docker and Docker Compose versions
- Verify network connectivity

### Debugging

```bash
# List running containers
docker-compose ps

# View specific service logs
docker-compose logs <service-name>
```

## Environment Configuration

Create a `.env` file with the following (optional):

```
COMPOSE_PROJECT_NAME=microservices
POSTGRES_USER=microservices
POSTGRES_PASSWORD=your_secure_password
KONG_PG_PASSWORD=your_kong_password
```

## Security Recommendations

- Use strong, unique passwords
- Enable HTTPS in production
- Regularly update Docker images
- Implement proper network segmentation

## Performance Optimization

- Monitor resource usage
- Scale services as needed
- Use caching mechanisms
- Implement connection pooling

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

[Your License Here]

---

Happy Microservicing! 🚀
