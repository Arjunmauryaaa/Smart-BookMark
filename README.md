🚀 Smart Bookmark App

A modern full-stack bookmark manager built using Next.js and Supabase with secure Google authentication, private user data protection using Row Level Security (RLS), and realtime updates.

🌟 Features

🔐 Google OAuth Authentication

🗄 Private user-specific bookmarks

⚡ Realtime updates (no page refresh required)

🔒 Secure Row Level Security (RLS)

🗑 Add & delete bookmarks

🎨 Modern SaaS-style UI

🚀 Deployed on Vercel

🛠 Tech Stack

Next.js (App Router)

Supabase (Auth + PostgreSQL + Realtime)

Tailwind CSS

Google OAuth

Vercel

📂 Project Structure
src/
 ├── app/
 │    ├── page.tsx
 │    ├── dashboard/page.tsx
 │    └── layout.tsx
 │
 ├── components/
 │    ├── AddBookmark.tsx
 │    └── BookmarkList.tsx
 │
 └── lib/
      └── supabase.ts

🔐 Authentication

Google OAuth is implemented using Supabase authentication.

After login:

A secure session is created

Users can only access their own bookmarks

Access control enforced using Row Level Security policies

🗄 Database Schema
create extension if not exists "uuid-ossp";

create table bookmarks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  url text not null,
  created_at timestamp default now()
);

🔒 Row Level Security Policies
alter table bookmarks enable row level security;

create policy "Users can view own bookmarks"
on bookmarks
for select
using (auth.uid() = user_id);

create policy "Users can insert own bookmarks"
on bookmarks
for insert
with check (auth.uid() = user_id);

create policy "Users can delete own bookmarks"
on bookmarks
for delete
using (auth.uid() = user_id);

⚙️ Environment Variables

Create a .env.local file in the root directory:

NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

🚀 Run Locally
npm install
npm run dev


Visit:

http://localhost:3000

🌍 Deployment

The application is deployed using Vercel.

To deploy:

Push code to GitHub

Import repository into Vercel

Add environment variables

Deploy

🧠 Key Learnings

Implementing OAuth authentication

Using Supabase Realtime subscriptions

Securing data with Row Level Security

Managing environment variables in Next.js

Production deployment workflow

📌 Future Improvements

Edit bookmark feature

Search & filtering

Bookmark categories

Favicon preview

Pagination

Mobile optimization

👨‍💻 Author

Arjun Maurya
MCA Graduate | Full Stack Developer
