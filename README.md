# 🎫 Ticketing Microservices Application

A full-stack microservices-based ticketing application built with Node.js, React, and Kubernetes. This project demonstrates modern microservices architecture with event-driven communication, containerization, and cloud deployment.

## 🏗️ Architecture Overview

This application follows a microservices architecture pattern with the following services:

### Core Services

- **Auth Service** - User authentication and authorization
- **Tickets Service** - Ticket management and CRUD operations
- **Orders Service** - Order processing and management
- **Payments Service** - Payment processing with Stripe integration
- **Expiration Service** - Order expiration handling with Redis queues

### Frontend

- **Client** - Next.js React application with Ant Design UI

### Infrastructure

- **NATS Streaming** - Event bus for inter-service communication
- **MongoDB** - Primary database for services
- **Redis** - Caching and queue management
- **Kubernetes** - Container orchestration and deployment

## 🚀 Features

- **Event-Driven Architecture** - Services communicate through NATS events
- **JWT Authentication** - Secure user sessions with JWT tokens
- **Stripe Integration** - Secure payment processing
- **Order Expiration** - Automatic order cancellation with Redis queues
- **Containerized** - Docker containers for easy deployment
- **Kubernetes Ready** - Production-ready K8s manifests
- **Comprehensive Testing** - Jest test suites for all services
- **TypeScript** - Full TypeScript implementation for type safety

## 🛠️ Technology Stack

### Backend Services

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with cookie-session
- **Event Bus**: NATS Streaming
- **Testing**: Jest with Supertest

### Frontend

- **Framework**: Next.js 12 with React 18
- **UI Library**: Ant Design
- **HTTP Client**: Axios
- **Payment**: React Stripe Checkout

### Infrastructure

- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **CI/CD**: Skaffold
- **Queue Management**: Redis with Bull
- **Load Balancer**: Nginx Ingress

## 📁 Project Structure

```
dev/
├── auth/                 # Authentication service
├── tickets/             # Ticket management service
├── orders/              # Order processing service
├── payments/            # Payment processing service
├── expiration/          # Order expiration service
├── client/              # Next.js frontend application
├── infra/               # Kubernetes manifests
│   ├── k8s/            # Production K8s configs
│   ├── k8s-dev/        # Development K8s configs
│   └── k8s-prod/       # Production-specific configs
├── nats-test/           # NATS testing utilities
└── skaffold.yaml        # Skaffold configuration
```

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Kubernetes cluster (local: Minikube/Docker Desktop, cloud: GKE/AKS/EKS)
- kubectl CLI tool
- Skaffold CLI

### Local Development

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd dev
   ```

2. **Start local Kubernetes cluster**

   ```bash
   # Using Minikube
   minikube start

   # Or using Docker Desktop
   # Enable Kubernetes in Docker Desktop settings
   ```

3. **Deploy with Skaffold**

   ```bash
   # Install Skaffold if not already installed
   # https://skaffold.dev/docs/install/

   # Start development environment
   skaffold dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Auth Service: http://localhost:3001
   - Tickets Service: http://localhost:3002
   - Orders Service: http://localhost:3003
   - Payments Service: http://localhost:3004

### Manual Service Setup

Each service can be run independently for development:

```bash
# Install dependencies
cd auth && npm install
cd ../tickets && npm install
cd ../orders && npm install
cd ../payments && npm install
cd ../expiration && npm install
cd ../client && npm install

# Start services (in separate terminals)
cd auth && npm start
cd tickets && npm start
cd orders && npm start
cd payments && npm start
cd expiration && npm start
cd client && npm run dev
```

## 🧪 Testing

Each service includes comprehensive test suites:

```bash
# Run tests for a specific service
cd tickets && npm test

# Run tests in CI mode
npm run test:ci

# Run all tests across services
# (implement a root-level test script)
```

## 🐳 Docker

### Development

```bash
# Build development images
docker-compose -f docker-compose.dev.yml build

# Run development environment
docker-compose -f docker-compose.dev.yml up
```

### Production

```bash
# Build production images
docker build -f Dockerfile -t service-name:latest .

# Push to registry
docker push your-registry/service-name:latest
```

## ☸️ Kubernetes Deployment

### Development Environment

```bash
# Deploy to development cluster
kubectl apply -f infra/k8s-dev/
```

### Production Environment

```bash
# Deploy to production cluster
kubectl apply -f infra/k8s/
kubectl apply -f infra/k8s-prod/
```

## 🔧 Configuration

### Environment Variables

Key environment variables for each service:

```bash
# Common
NODE_ENV=development
JWT_KEY=your-jwt-secret
MONGO_URI=mongodb://localhost:27017/ticketing

# NATS
NATS_CLIENT_ID=service-name
NATS_URL=nats://localhost:4222
NATS_CLUSTER_ID=ticketing

# Stripe (Payments Service)
STRIPE_KEY=your-stripe-secret-key

# Redis (Expiration Service)
REDIS_HOST=localhost
REDIS_PORT=6379
```

## 📊 API Endpoints

### Auth Service

- `POST /api/users/signup` - User registration
- `POST /api/users/signin` - User login
- `POST /api/users/signout` - User logout
- `GET /api/users/currentuser` - Get current user

### Tickets Service

- `GET /api/tickets` - List all tickets
- `POST /api/tickets` - Create new ticket
- `GET /api/tickets/:id` - Get ticket by ID
- `PUT /api/tickets/:id` - Update ticket

### Orders Service

- `GET /api/orders` - List user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `DELETE /api/orders/:id` - Cancel order

### Payments Service

- `POST /api/payments` - Process payment

## 🔄 Event Flow

1. **Ticket Creation**: User creates ticket → Tickets service publishes `ticket:created` event
2. **Order Creation**: User orders ticket → Orders service listens to `ticket:created` and creates order
3. **Payment Processing**: User pays → Payments service processes payment and publishes `payment:created`
4. **Order Completion**: Orders service listens to `payment:created` and marks order as complete
5. **Order Expiration**: Expiration service manages order timeouts with Redis queues

## 🚀 Deployment

### Cloud Platforms

#### Google Cloud Platform (GKE)

```bash
# Create cluster
gcloud container clusters create ticketing-cluster --zone=us-central1-a

# Deploy
skaffold run -p gcp
```

#### DigitalOcean (DOKS)

```bash
# Create cluster
doctl kubernetes cluster create ticketing-cluster

# Deploy
skaffold run -p digitalocean
```

#### AWS (EKS)

```bash
# Create cluster
eksctl create cluster --name ticketing-cluster

# Deploy
skaffold run -p aws
```

## 📈 Monitoring and Logging

- **Health Checks**: Built-in health endpoints for each service
- **Logging**: Structured logging with correlation IDs
- **Metrics**: Service-level metrics for monitoring
- **Tracing**: Request tracing across services

## 🔒 Security Features

- JWT-based authentication
- Secure cookie sessions
- Input validation with express-validator
- CORS configuration
- Rate limiting (implement as needed)
- HTTPS enforcement in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 🙏 Acknowledgments

This project is based on Stephen Grider's [Microservices with Node.js and React course](https://www.udemy.com/course/microservices-with-node-js-and-react/).

---

**Happy Coding! 🚀**
