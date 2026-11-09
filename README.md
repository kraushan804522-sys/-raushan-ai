# AI Studio — Black & Gold

A responsive Next.js starter for an all-in-one AI Studio. It works as a mobile-friendly website and can be deployed as a PWA-style web experience; it is not yet a signed native Android APK.

## Included
- Black & gold responsive dashboard
- Gemini-powered AI chat
- Study assistant prompt mode
- Browser voice input (Chrome support varies) and read-aloud
- Clearly marked setup placeholders for image, video, and WhatsApp integrations

## Run locally
1. Install Node.js 20 or later.
2. In this folder run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Put your key in `.env.local` as `GEMINI_API_KEY=your_key` (never commit or share this file).
5. Run `npm run dev` and open `http://localhost:3000`.

## Security
The Gemini key is read only by the server route `app/api/chat/route.ts`. Do not put it in browser code, a public GitHub repository, or screenshots. Add usage limits and authentication before public launch.

## Feature notes
- Image generation needs an image-capable model available to your API project and a dedicated server endpoint.
- Video generation depends on eligible model access and may require billing or separate entitlement.
- A real WhatsApp bot requires Meta WhatsApp Business Cloud API credentials and a webhook; Gemini API alone is not enough.
- To install on Android, deploy the site over HTTPS and use Chrome's menu > Add to Home screen. A native APK requires a separate Android wrapper/build and signing step.
