# 3D Max - Photo to Miniature Service

## Overview

3D Max is a Brazilian e-commerce landing page application that allows customers to submit photos to be transformed into 3D printed miniatures. The application features a modern, futuristic dark theme with a complete order submission workflow including photo upload, customer information collection, and order storage.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with SWC for fast compilation
- **Routing**: React Router DOM for client-side navigation
- **State Management**: TanStack React Query for server state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens defined in CSS variables
- **Design System**: Custom futuristic theme with royal blue, electric purple, and vibrant yellow accent colors

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript compiled with tsx
- **API Pattern**: RESTful endpoints under `/api` prefix
- **File Uploads**: Multer middleware handling image uploads to local `uploads/` directory
- **Database ORM**: Drizzle ORM for type-safe database operations

### Data Storage
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Schema Location**: `shared/schema.ts` contains Drizzle table definitions
- **Migrations**: Drizzle Kit manages database migrations in `migrations/` folder
- **File Storage**: Uploaded images stored locally in `uploads/` directory with unique filenames

### Project Structure
```
├── src/                    # Frontend React application
│   ├── components/         # React components (landing page sections)
│   ├── components/ui/      # shadcn/ui component library
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Route page components
│   └── lib/                # Utility functions
├── server/                 # Backend Express application
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API route definitions
│   ├── storage.ts          # Database storage layer
│   └── db.ts               # Database connection
├── shared/                 # Shared code between frontend and backend
│   └── schema.ts           # Drizzle database schema
└── migrations/             # Database migration files
```

### Development vs Production
- **Development**: Vite dev server on port 5000 proxies API requests to Express on port 5001
- **Production**: Express serves static files from `dist/public` and handles API routes

## External Dependencies

### Database
- **PostgreSQL**: Primary database requiring `DATABASE_URL` environment variable
- **Drizzle ORM**: Database toolkit with `drizzle-kit` for migrations

### UI/UX Libraries
- **Radix UI**: Accessible component primitives (dialogs, tooltips, forms, etc.)
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel/slider functionality
- **Vaul**: Drawer component
- **Sonner**: Toast notifications

### Form Handling
- **React Hook Form**: Form state management
- **Zod**: Schema validation with `@hookform/resolvers`
- **drizzle-zod**: Generates Zod schemas from Drizzle tables

### Backend Libraries
- **Express.js**: HTTP server framework
- **Multer**: Multipart form data handling for file uploads
- **pg**: PostgreSQL client driver
- **connect-pg-simple**: PostgreSQL session store (available but not actively used)

## Recent Changes

- **January 2026**: Migrated from Supabase to Replit PostgreSQL with Express.js backend
  - Replaced Supabase client with Drizzle ORM for database operations
  - Added Express server with Multer for file uploads
  - Photos now stored locally in `uploads/` directory
  - API endpoints available at `/api/orders`