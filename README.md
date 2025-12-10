# Product Management System

A modern full-stack product management application built with Next.js 15, shadcn/ui, and Spring Boot.

## Features

### Frontend (Next.js + shadcn/ui)

- 🎨 Modern UI with shadcn/ui components
- 🌙 Dark/Light theme support with next-themes
- 📱 Responsive design for all devices
- 🔔 Toast notifications with Sonner
- 📤 Image upload with preview
- ⚡ Fast development with Turbopack
- 🎯 TypeScript for type safety

### Backend (Spring Boot)

- 🚀 RESTful API endpoints
- 📊 Product CRUD operations
- 🖼️ Image upload and storage
- 🗄️ Database integration with JPA/Hibernate
- 🔄 Cross-origin request support

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/product/{id}` - Get product by ID
- `POST /api/product` - Add new product with image

### Hello

- `GET /` - Hello world endpoint

## Frontend Components

### ProductList

- Displays products in a responsive grid
- Shows product images, details, and availability
- Loading states and error handling
- Refresh functionality

### AddProductForm

- Modal dialog for adding new products
- Form validation and error handling
- Image upload with preview and validation
- Real-time feedback with toast notifications

### UI Components

- Cards for product display
- Buttons with loading states
- Input fields and labels
- Dialog modals
- Toast notifications
- Loading spinners
- Error displays

## Getting Started

### Frontend Development

```bash
cd frontend
pnpm install
pnpm dev
```

The frontend will be available at `http://localhost:3000`

### Backend Development

Make sure you have Java and Maven installed, then:

```bash
cd backend
./mvnw spring-boot:run
```

The backend API will be available at `http://localhost:8080`

## Environment Variables

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Technology Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Sonner** - Toast notifications
- **next-themes** - Theme management
- **Lucide React** - Beautiful icons

### Backend

- **Spring Boot** - Java framework
- **Spring Web** - REST API development
- **Spring Data JPA** - Database operations
- **Hibernate** - ORM framework
- **Jakarta Persistence** - JPA specification
- **Lombok** - Boilerplate code reduction

## Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── ProductList.tsx # Product display component
│   │   └── AddProductForm.tsx # Product form component
│   └── lib/                # Utilities and API client
└── public/                 # Static assets

backend/
├── src/main/java/org/istiaqfuad/learn/
│   ├── controller/         # REST controllers
│   ├── model/             # Entity models
│   ├── service/           # Business logic
│   └── repo/              # Data repositories
└── src/main/resources/    # Configuration files
```

## Features in Detail

### Product Management

- Add new products with details (name, brand, category, price, stock)
- Upload and preview product images
- View products in a responsive grid layout
- Real-time availability and stock information
- Form validation and error handling

### User Experience

- Toast notifications for all user actions
- Loading states for better feedback
- Error handling with retry options
- Responsive design for mobile and desktop
- Dark/light theme toggle support

### Developer Experience

- TypeScript for better code quality
- Hot reload with Turbopack
- Component-based architecture
- Utility-first CSS with Tailwind
- Modern React patterns and hooks
