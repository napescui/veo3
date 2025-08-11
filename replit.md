# JrennGenerator - Professional Video Editor Platform

## Overview

JrennGenerator is a comprehensive web-based video editing platform that combines AI-powered video generation with a full-featured video editor similar to Adobe Premiere Pro. The platform provides both automated video creation and professional editing capabilities. Key features include:

**AI Video Generation:**
- **Text-to-Video Generation**: Convert text prompts into 8-second AI videos using anabot.my.id API
- **Prompt Enhancement**: AI-powered prompt improvement using Gemini 2.5 Flash for better video quality
- **Auto-Translation**: Automatic translation from Indonesian to English for optimal video generation
- **Background Processing**: Queue up to 10 concurrent video generations with real-time status tracking

**Professional Video Editor:**
- **Multi-Track Timeline**: Unlimited video and audio tracks with drag & drop functionality
- **Advanced Editing**: Cut, trim, split, transitions, speed control, and keyframe animation
- **Color Correction**: Exposure, contrast, saturation, temperature, and LUT support
- **Audio Editing**: Multi-track audio, EQ, volume keyframes, and fade effects
- **Text & Graphics**: Dynamic text layers, lower-thirds, captions, and image overlays
- **Real-Time Preview**: WebGL/WebGPU compositing with smooth playback
- **Export Options**: Server-side FFmpeg rendering with multiple format presets

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

**Concurrent Video Processing**: Allows users to generate multiple videos simultaneously without blocking, supporting high-throughput video creation with real-time status updates.

**Enhanced User Interface**: Moved video generation interface to the top of the homepage with improved design, compact layout, and Enter key support for quick video generation.

**Migration to Standard Replit**: Successfully migrated from Replit Agent to standard Replit environment with proper PostgreSQL database integration and all dependencies configured.

**Duplicate Prompt Detection**: Added intelligent duplicate prompt detection that shows confirmation dialog when users try to generate videos with identical prompts from their history.

**Top-Priority Video Generator**: Moved the video generation interface to the very top of the homepage (above logo and marketing content) so authenticated users can immediately start creating videos without scrolling. This improves user experience by eliminating the need to scroll down to access the main functionality.

**Enhanced Concurrent Video Processing**: Removed blocking restrictions - users can now generate multiple videos simultaneously without waiting for previous videos to complete processing. Only duplicate requests during the actual submission process are prevented to avoid server overload.

**Comprehensive Legal Framework**: Added complete legal pages system including privacy policy, terms of service, cookie policy, acceptable use policy, DMCA policy, refund policy, security policy, AI disclosure, age verification, and data request management. All pages feature Indonesian primary content with English summaries, responsive design, and proper navigation integration.

**Cookie Consent Management**: Implemented GDPR-compliant cookie banner with granular preferences (essential, functional, analytics, marketing), local storage persistence, and preference management dialog with detailed explanations.

**Professional Footer Integration**: Added comprehensive footer with organized legal links, support information, company details, and system status indicators, replacing the basic layout.

**Help System & Content Policy**: Created extensive help documentation including getting started guide, comprehensive FAQ with collapsible sections, and detailed content policy guidelines with examples and best practices.

**Contact & Support Pages**: Implemented professional contact form with categorized inquiries, response time indicators, and dedicated support channels for different user types and concerns.

**Pricing & Business Pages**: Added complete pricing page with plan comparison, feature breakdowns, FAQ section, and enterprise contact options with responsive design.

**SEO & Technical Compliance**: Created sitemap.xml, robots.txt, and implemented proper meta tags, structured navigation, and search engine optimization for all legal and help pages.

**Complete Architecture Transformation - Video Merger Tool**: Completely replaced the complex video editor with a simple 2-video merge interface. Users now upload two videos, click merge, and receive the combined result processed server-side using FFmpeg. This fundamental change transforms the application from a complex client-side editor to a streamlined server-side video processing tool.

## External Dependencies

- **Database**: Neon PostgreSQL serverless database with connection pooling
- **Video Generation API**: anabot.my.id service for AI-powered video creation
- **UI Framework**: Radix UI primitives for accessible, unstyled components
- **Styling**: Tailwind CSS with custom design tokens and dark mode support
- **Build Tools**: Vite for fast development and optimized production builds
- **Development Tools**: TypeScript compiler, ESLint, and Replit-specific development plugins
- **Session Storage**: PostgreSQL with connect-pg-simple for production session management
- **Fonts**: Google Fonts (Inter) for consistent typography across the platform