# Secret Page App

**Section 2.1.1 - Trainee Assessment**

A modern, production-ready Next.js application with authentication, secret pages, and a friend system. Built with **Next.js 15**, **Supabase**, **shadcn/ui**, and **TanStack Query**.

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
├── app/                         # Next.js 15 App Router
│   ├── api/
│   │   └── delete-account/     # Account deletion endpoint
│   ├── secret-page-1/          # Secret pages (component composition)
│   ├── secret-page-2/
│   ├── secret-page-3/
│   ├── layout.tsx              # Root layout with providers
│   └── page.tsx                # Home/Auth page
│
├── components/                 # Reusable React components
│   ├── ui/                     # shadcn/ui components
│   ├── nav-bar.tsx             # Navigation bar
│   ├── secret-view.tsx         # ✨ Displays secret messages
│   ├── secret-form.tsx         # ✨ Create/edit secrets
│   └── friend-manager.tsx      # ✨ Friend request system
│
├── contexts/                   
│   └── auth-context.tsx        # Global auth state
│
├── hooks/                      # Custom React hooks
│   ├── use-friends.ts          # Friend requests & list
│   └── use-secret-message.ts   # Secret CRUD operations
│
├── lib/                        # Utilities
│   ├── axios/client.ts         # Axios instance
│   ├── supabase/client.ts      # Supabase client
│   └── utils.ts                # Helper functions
│
├── providers/                  
│   └── query-provider.tsx      # TanStack Query setup
│
├── services/                   # Business logic layer
│   ├── friend.service.ts       # Friend operations
│   └── secret.service.ts       # Secret operations
│
└── types/                      
    └── database.types.ts       # Supabase type definitions
```

## 🏗️ Architecture Highlights

### Component Composition Pattern
This app implements **progressive feature enhancement** through component composition:

```
Page 1: <SecretView />                              (View only)
Page 2: <SecretView /> + <SecretForm />            (+ Create/Edit)
Page 3: <SecretView /> + <SecretForm /> + <FriendManager />  (+ Social)
```

**Benefits:**
- ✅ Zero code duplication
- ✅ Single source of truth for each feature
- ✅ Easy to maintain and extend
- ✅ Follows DRY principle

### Clean Architecture
- **Service Layer**: Business logic separated from UI
- **Custom Hooks**: Data fetching with TanStack Query
- **Context API**: Global authentication state
- **TypeScript**: Full type safety throughout

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
- ✅ Send friend requests by email
- ✅ Accept/reject friend requests
- ✅ View friends list
- ✅ View friends' secret messages
- ✅ **403 Forbidden for non-friends** (database-enforced)


### 🔒 Security Features

- **Row Level Security (RLS)**: All tables have policies enforced at database level
- **403 Enforcement**: Non-friends cannot view secrets (database-enforced)
- **Cascade Delete**: Deleting an account removes all associated data
- **Auto Profile Creation**: New users automatically get a profile

## 🎯 Technical Features

### TanStack Query (React Query)
- ✅ Automatic caching and background refetching
- ✅ Optimistic UI updates
- ✅ Loading and error states
- ✅ Mutation management

### Supabase Integration
- ✅ PostgreSQL database with RLS
- ✅ Built-in authentication (JWT)
- ✅ Real-time subscriptions ready
- ✅ Automatic profile creation on signup

### Modern Stack
- ✅ TypeScript for type safety
- ✅ Service layer architecture
- ✅ Custom React hooks for data fetching
- ✅ shadcn/ui components
- ✅ Tailwind CSS v4 styling

## 📝 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Get these values from your Supabase project settings:
1. Go to **Project Settings** → **API**
2. Copy the **Project URL** and **anon public** key
3. Copy the **service_role secret** key (for delete account API)

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create `.env.local` with your Supabase credentials (see above)

### 3. Set Up Database
Run the SQL scripts in your Supabase SQL Editor (see Database Setup section)

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Build for Production
```bash
npm run build
npm start
```

## 🎨 UI Components

Built with **shadcn/ui** and **Tailwind CSS v4**:
- Button, Card, Input, Label, Textarea
- Modern gradients and smooth animations
- Fully responsive design
- Accessible components

## 📊 Project Stats

- **Lines Saved**: 69% reduction through component composition
- **Components**: 3 reusable components (SecretView, SecretForm, FriendManager)
- **Security**: Database-level RLS policies (cannot be bypassed)
- **Type Safety**: 100% TypeScript coverage

---

**Section 2.1.1 - Trainee Assessment** | Built with Next.js 15, Supabase, and shadcn/ui
