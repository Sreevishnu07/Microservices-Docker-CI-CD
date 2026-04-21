# Microservices Docker CI/CD

## Overview

This repository demonstrates a containerized microservices-based application consisting of a frontend, backend, and MySQL database. The system is orchestrated using Docker Compose and integrated with a CI/CD pipeline using GitHub Actions for automated testing, building, and image deployment.

---

## Architecture

The application follows a layered microservices-style architecture:

* **Frontend**: NGINX serving static content and acting as a reverse proxy
* **Backend**: Node.js (Express) application handling API requests
* **Database**: MySQL for persistent storage
* **CI/CD**: GitHub Actions pipeline for integration testing and Docker image deployment

### Request Flow

Client → NGINX (port 80) → Backend (port 5000) → MySQL (port 3306)

---

## Features

* Containerized services using Docker
* Service communication via Docker network
* Reverse proxy configuration using NGINX
* Environment-based configuration for database connectivity
* Persistent storage using Docker volumes
* CI pipeline with MySQL integration testing
* Docker image build and push to Docker Hub

---

## Project Structure

```
.
├── backend/              # Node.js backend service
│   ├── app.js
│   └── Dockerfile
├── frontend/             # NGINX frontend
│   ├── index.html
│   ├── nginx.conf
│   └── Dockerfile
├── database/             # Database initialization (optional)
│   └── init.sql
├── docker-compose.yml    # Service orchestration
└── .github/workflows/    # CI/CD pipeline configuration
```

---

## Getting Started

### Prerequisites

* Docker
* Docker Compose

---

### Run the Application

```bash
docker-compose up --build
```

---

### Access Services

* Frontend: http://localhost
* Backend (optional direct access): http://localhost:5000/api/data
* MySQL (optional): localhost:3307

---

## Environment Variables

Backend service uses the following variables:

* `DB_HOST` = database
* `DB_USER` = root
* `DB_PASSWORD` = root
* `DB_NAME` = mydb

---

## CI/CD Pipeline

The pipeline is triggered on every push to the `main` branch.

### CI Stage

* Starts MySQL service
* Installs dependencies
* Waits for database readiness
* Runs backend
* Tests API endpoint

### CD Stage

* Builds Docker images for frontend and backend
* Pushes images to Docker Hub using stored secrets

---

## Docker Hub Integration

Images are pushed to:

```
<your-docker-username>/frontend
<your-docker-username>/backend
```

Ensure the following GitHub Secrets are configured:

* `DOCKER_USERNAME`
* `DOCKER_PASSWORD`

---

## Key Concepts Demonstrated

* Microservices-based architecture (foundational level)
* Container networking and service discovery
* Reverse proxy configuration
* Persistent storage using volumes
* CI/CD with integration testing
* Docker image lifecycle

---

## Notes

* Backend port exposure is for development and debugging
* In production, only the frontend should be exposed
* Database initialization can be extended using `init.sql`

---

## Conclusion

This project demonstrates a practical implementation of a containerized microservices system with CI/CD integration. It serves as a foundational model for scalable, production-ready architectures.
