# Moments by Deepjyoti — Personalized Surprise Websites

A premium web application for creating and delivering personalized, interactive surprise websites for birthdays, romantic love stories, anniversaries, and unforgettable milestone celebrations.

## ✨ Features

- **Personalized Storyflow Experiences:**
  - 🎂 **Birthday Surprises:** Digital book unfolding memories, heartfelt letters, balloon blasts, and ambient soundtracks.
  - 💖 **Love Stories & Romantic Tributes:** Dedicated timeline journeys, photo memories, and intimate notes.
  - ✨ **Anniversary Experiences:** Milestone celebrations and photo galleries with orchestral backings.
  - 🤝 **Friendship Archives:** Interactive photo walls, shared chaos, and memories.
- **Real Client Work Showcase:**
  - Live client deployment featured directly in the portfolio: [Happy Birthday, Aarushi — from Anikesh (820 km long-distance surprise)](https://anikesh.lovable.app).
- **Interactive Experience Engine (`/s/[slug]`):**
  - Interactive multi-screen surprise renderer with audio controls, password-protected gifts, canvas confetti, and responsive mobile-first animations.
- **Custom Surprise Ordering System:**
  - Multi-step booking form with occasion customization, music selection, photo uploads, and budget options.
- **Admin Dashboard & Management (`/admin`):**
  - Secure management of incoming orders, preview generation, template customization, and live slugs.

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion, Canvas Confetti
- **Icons:** Lucide React
- **Backend / Database:** Supabase (with automatic local storage fallback mock mode)

## 🛠️ Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables (Optional)

Copy `.env.example` to `.env.local` to enable Supabase database and storage integration:

```bash
cp .env.example .env.local
```

If no Supabase credentials are provided, the platform automatically runs in Mock Mode using browser storage.

### 3. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```text
src/
├── app/
│   ├── about/            # Studio philosophy and builder profile
│   ├── admin/            # Admin control panel, orders, and live slugs
│   ├── contact/          # Direct contact and WhatsApp inquiries
│   ├── experiences/      # Productized experience catalog & detail pages
│   ├── order/            # Customer surprise booking flow
│   ├── pricing/          # Pricing tiers and custom surprise bookings
│   ├── s/[slug]/         # Live client surprise player routes
│   └── page.tsx          # Homepage with interactive mockups and client showcase
├── components/
│   ├── shared/           # Navbar, Footer, ClientWorkShowcase, WhatsApp floating button
│   ├── surprise/         # SurpriseRenderer engine
│   └── ui/               # Reusable design system (Buttons, Cards, Badges, Modals)
├── lib/
│   ├── mockData.ts       # Curated surprise templates and featured client stories
│   └── supabase.ts       # Supabase client, queries, and mock DB engine
└── templates/            # Interactive surprise layouts (Birthday, Romantic, Anniversary, Friendship)
```

## 👨‍💻 Author

**Deepjyoti Saha**  
Gemini Certified Student & Full-Stack Creative Developer  
WhatsApp: [+91 6001746854](https://wa.me/916001746854)
