# Secret Page App

**Section 2.1.1 - Trainee Assessment**

A modern Next.js application with authentication, secret pages, and friend system. Built with **shadcn/ui**, **Supabase**, **TanStack Query**, and **Axios**.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: shadcn/ui
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Data Fetching**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Language**: TypeScript

## 📁 Project Structure

```
src/
├── app/                      # Next.js app directory
│   ├── secret-page-1/       # Secret page routes
│   ├── secret-page-2/
│   ├── secret-page-3/
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   └── nav-bar.tsx          # Navigation bar
├── contexts/                # React contexts
│   └── auth-context.tsx     # Authentication context
├── hooks/                   # Custom React hooks
│   ├── use-friends.ts       # Friends management
│   └── use-secret-message.ts # Secret messages
├── lib/                     # Utility libraries
│   ├── axios/               # Axios configuration
│   ├── supabase/            # Supabase client
│   └── utils.ts             # Utility functions
├── providers/               # React providers
│   └── query-provider.tsx   # TanStack Query provider
├── services/                # API services
│   ├── friend.service.ts    # Friend requests service
│   └── secret.service.ts    # Secret messages service
└── types/                   # TypeScript types
    └── database.types.ts    # Database types
```

## ✨ Features

### Page 1: `/` (Unauthenticated)
- ✅ Login form
- ✅ Registration form
- ✅ Form validation
- ✅ Toggle between login/register

### Page 2: `/` (Authenticated)
- ✅ Dashboard with navigation
- ✅ Links to all secret pages
- ✅ Sign out functionality
- ✅ Delete account functionality

### Page 3: `/secret-page-1`
- ✅ View secret message
- ✅ Sign out button
- ✅ Delete account button
- ✅ Route protection

### Page 4: `/secret-page-2`
- ✅ Inherits Page 1 features
- ✅ Add/edit your secret message
- ✅ Save to Supabase
- ✅ Real-time updates with TanStack Query

### Page 5: `/secret-page-3`
- ✅ Inherits Pages 1 & 2 features
- ✅ Send friend requests
- ✅ Accept/reject friend requests
- ✅ View friends list
- ✅ View friends' secret messages
- ✅ **401 error for non-friends**

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a Supabase project at [https://supabase.com](https://supabase.com)
2. Create a `.env.local` file with your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

**Important**: The `SUPABASE_SERVICE_ROLE_KEY` is required for account deletion. Get it from:
- Supabase Dashboard > Project Settings > API > `service_role` secret
- ⚠️ **NEVER** commit this key to version control!

### 3. Run Database Migrations

Follow the SQL scripts in `SUPABASE_SETUP.md` to create:
- `profiles` table
- `secrets` table
- `friend_requests` table
- Row Level Security (RLS) policies

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

### Tables

1. **profiles** - User profiles
2. **secrets** - User secret messages
3. **friend_requests** - Friend request management

See `SUPABASE_SETUP.md` for complete schema and RLS policies.

## 🎯 Key Features

### TanStack Query Integration
- Automatic caching and refetching
- Optimistic updates
- DevTools for debugging
- Loading and error states

### Supabase Features
- Real-time subscriptions ready
- Row Level Security (RLS)
- Built-in authentication
- PostgreSQL database

### Modern Architecture
- **src/** directory structure
- Service layer pattern
- Custom React hooks
- Type-safe with TypeScript
- Clean separation of concerns

## 📝 Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_API_URL=your_api_url_if_needed
```

**Note**: See `.env.local.example` for detailed descriptions of each variable.

## 🔒 Security

- Row Level Security (RLS) enabled
- JWT-based authentication
- Secure API endpoints
- Friend verification before viewing secrets

## 📚 Documentation

- [Supabase Setup Guide](./SUPABASE_SETUP.md)
- [Project Structure](./PROJECT_STRUCTURE.md)

## 🚦 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎨 UI Components

All UI components are from **shadcn/ui** with Tailwind CSS v4:
- Button
- Card
- Input
- Label
- Textarea

Styled with modern gradients and smooth transitions.

## 🏗️ Architecture

- **Service Layer**: Business logic separated in service files
- **Custom Hooks**: Data fetching with TanStack Query
- **Context API**: Global authentication state
- **TypeScript**: Full type safety
- **src/ Structure**: Organized and scalable

---

## 📂 Related Projects

This is **Section 2.1.1 - Secret Page App**

For **Section 2.1.2 - Multiple Activities App**, see the separate project repository.
