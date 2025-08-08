# VideoAI - AI-Powered Video Generation Platform

## Overview

VideoAI is a modern web application that transforms text prompts into professional 8-second videos using advanced AI technology. The platform provides a seamless user experience for generating videos without requiring any editing skills. Key features include:

- **Text-to-Video Generation**: Convert text prompts into 8-second AI videos using anabot.my.id API
- **Prompt Enhancement**: AI-powered prompt improvement using Gemini 2.5 Flash for better video quality
- **Auto-Translation**: Automatic translation from Indonesian to English for optimal video generation
- **Background Processing**: Queue up to 10 concurrent video generations with real-time status tracking
- **Spam-Capable Generation**: Generate multiple videos simultaneously from different prompts

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system featuring dark theme and gradient color schemes
- **State Management**: TanStack React Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

### Backend Architecture
- **Runtime**: Node.js with Express.js REST API
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM configured for PostgreSQL with Neon database support
- **Session Management**: In-memory storage for development with plans for PostgreSQL sessions
- **Error Handling**: Centralized error handling middleware with structured error responses
- **Logging**: Custom request/response logging with performance metrics

### Data Storage Solutions
- **Primary Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with migrations support
- **Schema**: Type-safe database schema with Zod validation
- **Development Storage**: In-memory storage implementation for rapid development
- **Session Store**: PostgreSQL-backed sessions using connect-pg-simple

### Authentication and Authorization
- **Session-based Authentication**: Uses Express sessions with PostgreSQL backing
- **CORS**: Configured for cross-origin requests in development
- **Request Validation**: Zod schemas for type-safe API request/response validation

### External Service Integrations
- **Video Generation**: anabot.my.id API integration for AI video generation
- **AI Enhancement**: Google Gemini 2.5 Flash API for prompt enhancement and translation services
- **Video Processing Pipeline**: 
  - Submit generation requests with text prompts
  - Poll for completion status with automatic retries
  - Handle success/failure states with appropriate user feedback
  - Support for concurrent processing of up to 10 videos
- **Asset Management**: Static file serving for generated video content
- **Language Processing**: Auto-detection and translation of Indonesian prompts to English

### Key Architectural Decisions

**Monorepo Structure**: The application uses a shared type system between client and server with a `/shared` directory containing common schemas and types, reducing code duplication and ensuring type consistency.

**Progressive Enhancement**: The application starts with in-memory storage for rapid development and can be easily upgraded to persistent PostgreSQL storage without changing the interface contracts.

**Component-Driven UI**: Built on shadcn/ui for consistent, accessible, and customizable components with proper TypeScript support throughout the component tree.

**Real-time Status Updates**: Uses React Query with polling intervals to provide real-time updates on video generation progress without requiring WebSocket infrastructure.

**Multi-Video Queue Management**: Implements background processing for up to 10 concurrent video generations with real-time status tracking and queue visualization.

**Fully Responsive Design Implementation**: Created comprehensive responsive design that adapts perfectly to laptop/PC, tablet, and mobile devices with optimized layouts, typography scaling, and touch-friendly interfaces.

**Real HD Robot Video Integration**: Replaced SVG robot with real HD video that loops continuously, includes scroll-reactive effects and fallback system for optimal loading across all devices.

**Customer Service Chatbot Implementation**: Added AI-powered customer service chat using Gemini 2.5 Flash API with real-time responses, professional interface, and comprehensive knowledge about Veo3 Lite features.

**AI-Enhanced User Experience**: Integrates Gemini 2.5 Flash for intelligent prompt enhancement and automatic language translation to improve video generation quality.

## External Dependencies

- **Database**: Neon PostgreSQL serverless database with connection pooling
- **Video Generation API**: anabot.my.id service for AI-powered video creation
- **UI Framework**: Radix UI primitives for accessible, unstyled components
- **Styling**: Tailwind CSS with custom design tokens and dark mode support
- **Build Tools**: Vite for fast development and optimized production builds
- **Development Tools**: TypeScript compiler, ESLint, and Replit-specific development plugins
- **Session Storage**: PostgreSQL with connect-pg-simple for production session management
- **Fonts**: Google Fonts (Inter) for consistent typography across the platform