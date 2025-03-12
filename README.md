# Elo Drinks App

Application that allows you to create estimates for drink buffet services.

## Features

- Create estimates
  ...

## Tech Stack

- Next.js
- Tailwind CSS
- PostgreSQL
- Prisma ORM

## Requirements

- Node.js 22.x
- Yarn 1.22.x
- Docker
- Docker Compose

## Running the project

Follow the steps below to run this project locally:

### Install dependencies

First, install the project dependencies:

```bash
yarn install
```

### Run docker compose

Start the docker compose to run the database:

```bash
docker-compose up -d
```

### Generate database types

Generate the types for the database:

```bash
yarn prisma generate
```

### Apply migrations

Apply the migrations to the database:

```bash
yarn prisma migrate dev
```

### Run the project

Finally, run the development server with the command below:

```bash
yarn dev
```
