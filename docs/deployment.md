# Deployment

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Fill Firebase, Resend, WhatsApp, and optional OpenAI values.

4. Create the default Firebase admin user:

```bash
npm run seed:admin
```

5. Run the app:

```bash
npm run dev
```

## Firebase

Deploy rules:

```bash
firebase deploy --only firestore:rules,storage
```

Enable:

- Firebase Authentication with Email/Password
- Firestore
- Firebase Storage

## Vercel

1. Import this repository in Vercel.
2. Add all `.env.example` values in Project Settings.
3. Deploy with the default Next.js build command:

```bash
npm run build
```

## Netlify

Use the Next.js runtime for Netlify and the same environment variables. The embedded course finder remains hosted at Netlify and is loaded inside `/find-courses`.
