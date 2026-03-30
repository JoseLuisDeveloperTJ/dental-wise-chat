# SmileClinic – Dental Clinic Landing Page + AI Chatbot

## Overview

SmileClinic is a single-page dental clinic website for a clinic located in **Tijuana, Baja California, Mexico**. It includes a landing page with services, pricing, and contact info, plus an **AI-powered chat widget** that answers patient questions in real time, backed by Lovable Cloud.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + TypeScript + Vite 5 |
| Styling | Tailwind CSS v3 + shadcn/ui components |
| Animations | Framer Motion 11.18.2 (pinned for React 18 compat) |
| Backend | Lovable Cloud (database + edge functions) |
| AI | Google Gemini 3 Flash via Lovable AI Gateway |
| Routing | React Router DOM v6 |

---

## Project Structure

```
src/
├── pages/
│   ├── Index.tsx          # Main landing page (assembles all sections)
│   ├── Admin.tsx          # Admin dashboard – view chat conversations
│   └── NotFound.tsx       # 404 page
├── components/
│   ├── Navbar.tsx         # Sticky navbar with smooth-scroll links
│   ├── HeroSection.tsx    # Hero with CTA buttons
│   ├── ServicesSection.tsx # 3-card grid: cleaning, whitening, braces
│   ├── PricingSection.tsx  # 3 pricing tiers with feature lists
│   ├── ContactSection.tsx  # Location, hours, phone, email cards
│   ├── Footer.tsx         # Simple branded footer
│   ├── ChatWidget.tsx     # Floating AI chat bubble (bottom-right)
│   └── ui/                # shadcn/ui component library
├── lib/
│   ├── chatStorage.ts     # Chat persistence (localStorage + DB)
│   └── utils.ts           # Tailwind merge utility
├── integrations/
│   └── supabase/          # Auto-generated client & types
└── index.css              # Design tokens (colors, fonts, shadows)

supabase/
└── functions/
    └── chat/
        └── index.ts       # Edge function – proxies AI chat requests
```

---

## Features

### 1. Landing Page
- **Navbar**: Sticky, responsive, smooth-scroll navigation to sections (Services, Pricing, Contact). Mobile hamburger menu.
- **Hero Section**: Animated headline with "Book Appointment" and "Our Services" CTA buttons.
- **Services Section**: 3 animated cards – Dental Cleaning ($50), Teeth Whitening ($120), Braces Consultation ($30).
- **Pricing Section**: 3 plan tiers (Basic, Professional, Complete) with feature checklists and highlighted recommended plan.
- **Contact Section**: 4 info cards – location, hours, phone, email.
- **Footer**: Branded footer with copyright.

### 2. AI Chat Widget (`ChatWidget.tsx`)
- Floating chat bubble in the bottom-right corner.
- Sends messages to a backend edge function that calls **Google Gemini 3 Flash** via the Lovable AI Gateway.
- System prompt configures the AI as a dental clinic assistant with knowledge of services, pricing, hours, and location.
- Chat history persisted in **localStorage** (instant load) and **database** (cross-device sync).
- User identity tracked via `crypto.randomUUID()` stored in localStorage.
- Loading spinner during AI response.
- Error handling with user-friendly messages.

### 3. Admin Dashboard (`/admin`)
- Sidebar layout using shadcn sidebar components.
- KPI cards: total chats, unique patients, last chat date.
- Conversations table with date column.
- Click-to-view chat logs in a side sheet panel.
- Data fetched from the `conversations` table.

---

## Database Schema

### `conversations` table

| Column | Type | Default |
|--------|------|---------|
| `id` | uuid | `gen_random_uuid()` |
| `user_id` | text | — |
| `messages` | jsonb | `'[]'::jsonb` |
| `created_at` | timestamptz | `now()` |
| `updated_at` | timestamptz | `now()` |

**RLS Policies**: Public read/insert/update (no authentication required). Delete is disabled.

**Trigger**: `update_updated_at_column()` — auto-updates `updated_at` on row changes.

---

## Edge Function: `chat`

- **Path**: `supabase/functions/chat/index.ts`
- **Method**: POST
- **Body**: `{ messages: [{ role, content }] }`
- **Response**: `{ reply: string }`
- **AI Model**: `google/gemini-3-flash-preview`
- **System Prompt**: Dental clinic assistant for SmileClinic in Tijuana. Knows services, prices, hours.
- **Error handling**: 429 (rate limit), 402 (credits exhausted), 500 (generic).
- Uses `LOVABLE_API_KEY` secret (aliased as `GEMINI_API_KEY` in code) to authenticate with the AI gateway.

---

## Chat Persistence Flow (`chatStorage.ts`)

1. On widget open: load from localStorage → if empty, fetch from database.
2. On each user message: update localStorage immediately, then call AI.
3. On AI response: update localStorage + upsert to database.
4. User identity: `crypto.randomUUID()` stored in localStorage under `dental_chat_user_id`.

---

## Design System

- **Fonts**: Playfair Display (headings), DM Sans (body) — imported from Google Fonts.
- **Colors**: HSL-based CSS custom properties in `index.css`. Primary teal, warm neutrals.
- **Dark mode**: Supported via `.dark` class with full token overrides.
- **Animations**: `framer-motion` scroll-in animations on sections, `fade-in-up` keyframe.
- **Shadows**: Custom `--card-shadow` and `--card-shadow-hover` tokens.

---

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Index` | Landing page with all sections + chat widget |
| `/admin` | `Admin` | Dashboard to view chat conversations |
| `*` | `NotFound` | 404 page |

---

## Known Decisions & Notes

- **Framer Motion pinned to v11.18.2**: v12 causes `useRef` null errors with React 18 due to duplicate React instances. Do not upgrade until React 19.
- **No authentication**: The app is public-facing. Admin page has no auth gate (could be added).
- **RLS is permissive**: Conversations table allows public access for simplicity since there's no auth.
- **Chat uses localStorage user IDs**: Not tied to authenticated users.

---

## Getting Started

1. Clone the repo
2. `npm install`
3. `npm run dev`
4. Visit `http://localhost:5173`

The backend (database + edge functions) is managed by Lovable Cloud and deploys automatically.
