# Melofy Vercel Deployment Guide

## Current Setup

This project has been configured for a simplified deployment to Vercel. Due to the limitations of Vercel's serverless functions with PostgreSQL database connections, the current deployment is set up as a simplified API that:

1. Provides a health check endpoint at `/api/health`
2. Provides database connection information at `/api/db-info`
3. Returns helpful information about database connectivity options for serverless environments

## Deployment Instructions

1. Install the Vercel CLI (if not already installed):
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy to Vercel:
```bash
vercel
```

4. For production deployment:
```bash
vercel --prod
```

## Understanding the Limitations

Vercel's serverless functions are not ideal for direct PostgreSQL connections because:

1. Serverless functions are ephemeral and spin up/down for each request
2. Database connections may not be properly closed between invocations
3. Cold starts can lead to slow response times for database operations

## Recommended Solutions

For a full NestJS application with database connectivity, consider one of these approaches:

### Option 1: Use a Different Hosting Provider
- Platforms like Heroku, DigitalOcean App Platform, or AWS Elastic Beanstalk support long-running Node.js applications
- These platforms can maintain persistent database connections

### Option 2: Use a Serverless-Compatible Database
- Consider using Vercel Postgres, Supabase, Neon, or another serverless-friendly database service
- These services are designed to work well with serverless functions

### Option 3: Split Your Application
- Deploy your frontend on Vercel
- Deploy your backend API on a platform that supports long-running processes

## How to Modify Your Database Configuration

If you decide to use a cloud database with Vercel, you can modify your app.module.ts to use environment variables in production while keeping your local development setup unchanged:

```typescript
TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    const isProd = process.env.NODE_ENV === 'production';
    return {
      type: 'postgres',
      host: isProd ? config.get('DATABASE_HOST') : 'localhost',
      port: isProd ? parseInt(config.get('DATABASE_PORT')) : 5432,
      username: isProd ? config.get('DATABASE_USERNAME') : 'postgres',
      password: isProd ? config.get('DATABASE_PASSWORD') : 'Mehemmed200405',
      database: isProd ? config.get('DATABASE_NAME') : 'postgres',
      entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
      synchronize: isProd ? false : true,
      ssl: isProd ? { rejectUnauthorized: false } : false,
      logging: isProd ? false : true
    };
  },
}),
```

This way, you can keep your local development setup unchanged while using environment variables for production.
