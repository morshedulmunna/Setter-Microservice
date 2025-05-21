# 🚀 ExecuteHub Microservices Project Setup Guide

## 📋 Prerequisites

### System Requirements

- Operating System: macOS, Linux, or Windows
- RAM: Minimum 16GB (Recommended 32GB)
- Disk Space: 50GB free
- Processor: Multi-core (Intel i5/i7 or AMD Ryzen)

### Required Software

- [ ] Docker Desktop (v4.0+)
- [ ] Node.js (v20.x LTS)
- [ ] Git (v2.x+)
- [ ] Visual Studio Code (Recommended)

## 🛠 Installation Steps

### 1. Install Prerequisites

#### Docker Desktop

1. Download from: https://www.docker.com/products/docker-desktop
2. Follow installation wizard
3. Start Docker Desktop
4. Verify installation:

```bash
docker --version
docker-compose --version
```

#### Node.js

1. Download from: https://nodejs.org/
2. Install LTS version
3. Verify installation:

```bash
node --version
npm --version
```

#### Git

1. Download from: https://git-scm.com/downloads
2. Follow default installation
3. Verify installation:

```bash
git --version
```

### 2. Clone Project Repository

```bash
# Clone the project
git clone https://github.com/your-organization/executehub.git

# Navigate to project directory
cd executehub
```

### 3. Local Domain Configuration

#### Mac/Linux

```bash
sudo nano /etc/hosts
```

Add these lines:

```
127.0.0.1 executehub.com
127.0.0.1 api.executehub.com
127.0.0.1 admin.executehub.com
```

#### Windows

1. Open Notepad as Administrator
2. Edit: `C:\Windows\System32\drivers\etc\hosts`
3. Add same lines as above

### 4. Install Project Dependencies

```bash
# Install dependencies for each service
npm run install:all
```

### 5. Environment Configuration

#### Create .env Files

For each service, create a `.env` file:

```bash
# Example for user-auth service
cd user-auth
cp .env.example .env
```

Edit `.env` files with your specific configurations:

- Database credentials
- API keys
- Secret tokens

### 6. Start Services

#### Development Mode

```bash
# Start all services in development mode
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# Or start specific services
docker-compose up user-auth product order
```

#### Production Mode

```bash
# Start services in production mode
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### 7. Verify Deployment

```bash
# Check running containers
docker-compose ps

# View service logs
docker-compose logs user-auth
```

## 🔍 Service Access

### Local Development URLs

- Public Web: `https://executehub.com`
- Admin Web: `https://admin.executehub.com`
- API Gateway: `https://api.executehub.com`

### Ports

- User Auth: 3005
- Product Service: 3004
- Order Service: 3003
- Public Web: 3002
- Admin Web: 3001

## 🛡️ Security Notes

- Use strong, unique passwords
- Never commit `.env` files
- Rotate secrets regularly
- Enable two-factor authentication

## 🚨 Troubleshooting

### Common Issues

1. Port Conflicts

   - Stop other services using similar ports
   - Modify `docker-compose.yml` port mappings

2. Dependency Problems

```bash
# Clean npm cache
npm cache clean --force

# Reinstall dependencies
npm run install:clean
```

3. Docker Issues

```bash
# Restart Docker services
docker-compose down
docker-compose up -d

# Rebuild containers
docker-compose build
```

## 📦 Development Workflow

### Branch Strategy

- `main`: Stable production code
- `develop`: Integration branch
- `feature/`: New features
- `bugfix/`: Bug corrections
- `hotfix/`: Critical production fixes

### Commit Guidelines

- Use conventional commits
- Descriptive commit messages
- Link to issue tracker

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request
6. Pass all CI/CD checks

## 📚 Additional Resources

- Project Documentation
- API Specifications
- Architectural Decision Records

## 🎓 Learning Path

- Docker fundamentals
- Microservices architecture
- NestJS
- Next.js
- TypeScript

## 📞 Support

- Team Slack Channel
- Weekly Tech Sync
- Mentor Program

---

Happy Coding! 🚀👩‍💻👨‍💻
