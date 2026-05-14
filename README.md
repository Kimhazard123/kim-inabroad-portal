# InAbroad Edupartner Study Abroad Portal

Production-ready Next.js 14 portal for InAbroad Edupartner with an embedded live course finder, smart applications, Firebase dashboards, document upload, email/WhatsApp notifications, AI chatbot support, PWA metadata, and deployment artifacts.

## Core Finder Integration

The `/find-courses` page embeds:

https://course-finder-a97606.netlify.app/

It is used as the main Course Finder, University Finder, Tuition Finder, and Admission Fee Finder. Portal-level actions let students apply, copy details, share on WhatsApp, and open the finder directly. Because the finder is cross-origin, the parent app cannot safely inject buttons inside the iframe; the Apply action is placed in the portal toolbar.

## Features

- Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, ShadCN-style components
- Firebase Authentication, Firestore, Storage, and security rules
- Smart multi-step application form with Tanzania-specific education logic
- PDF/JPG/PNG upload validation and Firebase Storage persistence
- Admin dashboard with search, status updates, document links, mail/WhatsApp actions, and CSV export
- Student dashboard with real-time status tracking
- Resend admin/student email notifications
- WhatsApp Cloud API or Twilio WhatsApp admin notification
- AI chatbot endpoint with OpenAI support and local fallback
- PWA manifest and deployment docs

## Default Admin

- Email: `kimhazard25@gmail.com`
- Password: `Admin@12345`

Create this user with:

```bash
npm run seed:admin
```

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run seed:admin
npm run dev
```

Open `http://localhost:3000`.

## Environment

See `.env.example` for Firebase, Resend, WhatsApp, Twilio, and OpenAI values.

## Database

See `docs/firestore-schema.md`.

## Deployment

See `docs/deployment.md`.
