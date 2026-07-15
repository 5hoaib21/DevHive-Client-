# PromptForge - Agent Instructions

## Project Structure

**Two separate projects:**
- **PromptForge/** - Next.js 16 (React 19) frontend on Vercel
- **PromptForge-Server/** - Express 5 backend on port 5005 (or 8008)

Run each from its own directory.

## Commands

### PromptForge (Frontend)
```bash
cd PromptForge
npm i           # install
npm run dev     # dev server (Turbopack)
npm run build   # production build
npm run start   # production server
npm run lint    # eslint
```

### PromptForge-Server (Backend)
```bash
cd PromptForge-Server
npm i
node index.js   # runs on PORT (default 5005)
```
No test/lint scripts configured.

## Environment Variables

### PromptForge/.env
```
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=
SERVER_URL=http://localhost:5000
```

### PromptForge-Server/.env
```
PORT=8008
MONGODB_URI=
CLIENT_URL=http://localhost:3000
```

Both share the same MongoDB URI (`tech-bazaar` database).

## Architecture

**Frontend (Next.js 16 + React 19 + React Compiler)**
- App Router (`src/app/*`)
- Tailwind CSS v4 + HeroUI v3
- Better Auth (JWT sessions, MongoDB adapter, Google OAuth)
- Stripe subscriptions at `/api/subscription/route.js`
- Client auth via `src/lib/auth-client.js` (JWT client plugin)

**Backend (Express 5 + MongoDB driver)**
- JWT verification via JWKS from frontend (`${CLIENT_URL}/api/auth/jwks`)
- Role-based middleware: `verifyToken` → `creatorVerifyToken` / `userVerifyToken` / `adminVerifyToken`
- MongoDB collections: `user`, `subscriptions`, `prompts`, `reports`
- Role-based access: `user` (free/pro), `creator` (pro only), `admin`
- Free tier: max 3 prompts

**Key Backend Endpoints:**
- `POST /subscriptions` - Stripe webhook handler
- `POST /api/prompts` - Create prompt (auth + free tier limit)
- `PATCH /api/prompts/:id` - Update own prompt
- `PATCH /api/prompts/:id/copy` - Increment copy count
- `PATCH /api/prompts/:id/bookmark` - Toggle bookmark
- `POST /api/prompts/:id/review` - Add review
- `POST /api/prompts/:id/report` - Report prompt
- `GET /api/creator-analytics` - Creator stats (creator role + pro)
- `GET /api/user-analytics` - User stats (user role + pro)
- Admin routes under `/admin/*` (role + admin verification)

## Key Conventions

- **Frontend auth**: Better Auth React client (`src/lib/auth-client.js`), JWT sessions
- **Backend auth**: JWKS verification against frontend's `/api/auth/jwks`, roles in JWT payload
- **Database**: Shared MongoDB `tech-bazaar` DB, raw `mongodb` driver (no Mongoose)
- **Roles**: `user` (default), `creator` (pro only), `admin` — stored in user document
- **Plans**: `free` (default, 3 prompt limit), `pro` (Stripe subscription)
- **Stripe**: Frontend creates checkout, backend `/subscriptions` webhook upgrades plan
- **Images**: Remote patterns allowed for any HTTPS/HTTP hostname (`next.config.mjs`)
- **Lint**: `npm run lint` runs ESLint with Next.js core-web-vitals config
- **No TypeScript** — JS with JSDoc (`jsconfig.json`)

## Important Notes

- Two separate `package.json` — run commands from correct directory
- Shared MongoDB URI in both `.env` files
- Backend expects JWT from frontend's Better Auth JWKS endpoint
- Role checks happen in backend middleware (`creatorVerifyToken`, `userVerifyToken`, `adminVerifyToken`)
- Free tier limited to 3 prompts enforced in backend `POST /api/prompts`
- Stripe webhook updates user `plan: "pro"` in MongoDB
- Next.js 16 uses React Compiler (`reactCompiler: true` in `next.config.mjs`)
- Tailwind v4 via PostCSS (`@tailwindcss/postcss`)
- No test suite configured