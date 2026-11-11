# Nova AI Assistant — Black & Gold

A responsive Gemini-powered AI assistant starter built with Next.js. Includes chat, conversation context, prompt suggestions, and an optional API-key field.

## Run locally
1. Install Node.js 20 or later.
2. Run `npm install`.
3. Run `npm run dev`, then open http://localhost:3000.
4. Paste your Gemini API key into the key field at the top-right, or copy `.env.example` to `.env.local` and set `GEMINI_API_KEY=your_key`.

## Deploy to Netlify
1. Push this folder to a GitHub repository.
2. Import the repository in Netlify. Build command: `npm run build`.
3. Add the environment variable `GEMINI_API_KEY` in Netlify: Site configuration → Environment variables.
4. Deploy. Never put a real API key in GitHub or public code.

## Security note
The key entered in the UI is sent over HTTPS to this app's server endpoint for the request and is not saved by this starter. For a public app, prefer setting `GEMINI_API_KEY` in Netlify environment variables and remove the key input so visitors cannot use your private quota. Add authentication, rate limits, and usage controls before public launch.

## Current scope
This is a working text-chat starter. Image generation, video generation, voice conversation, WhatsApp integration, user accounts, and native Android APK packaging are not included yet.
