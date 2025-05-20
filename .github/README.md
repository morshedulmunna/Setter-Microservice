# Continuous Integration (CI) Workflow

## Overview

This project uses GitHub Actions to implement a comprehensive Continuous Integration pipeline for our microservices architecture.

## Workflow Stages

### 1. Lint and Test

- Runs on every push and pull request to `main` and `develop` branches
- Checks all services:
  - `admin_web`
  - `order`
  - `product`
  - `public_web`
  - `user-auth`

### 2. Docker Build

- Builds Docker images for each service
- Validates Docker Compose configurations

### 3. Security Scan

- Uses Snyk for vulnerability checking
- Requires a `SNYK_TOKEN` secret to be set in GitHub repository settings

## Prerequisites

- Node.js 20.x
- Docker
- Snyk account (optional)

## Local Development

To run CI checks locally:

```bash
# For each service
cd <service-directory>
npm run lint
npm run typecheck
npm test
```

## Customization

Modify `.github/workflows/ci.yml` to adjust:

- Node.js version
- Services to include
- Additional checks or stages
