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
