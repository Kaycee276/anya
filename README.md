# Anya: Backend-as-an-Agent

Anya is an autonomous backend engineer that lives in your GitHub repository. It introduces a new paradigm: **Backend-as-an-Agent**.

Instead of manually wiring up databases, writing API endpoints, and configuring BaaS (Backend-as-a-Service) platforms, you simply connect your frontend repository to Anya. Anya reads your frontend code, infers your data models and API needs, and automatically generates and maintains a complete, deterministic backend for you.

## The Concept

We've all seen BaaS platforms like Firebase or Supabase. They give you the primitives, but you still have to design the schema, write the validation rules, and wire everything up.

Anya takes a different approach:
1. **Connect your repo**: Anya reads your entire frontend codebase (Next.js, React, etc.) and infers your data models and API needs based on your components and fetch calls.
2. **Automatic Generation**: It automatically generates a complete, deterministic backend—including the database schema, API endpoints, and security guardrails.
3. **Incremental Updates**: As you push new commits to your frontend, Anya computes the diff and proposes backend updates to match.
4. **PR-Style Approval**: You are always in control. Anya presents the proposed backend changes as a diff for you to review and approve before they go live.

The best part? The AI operates entirely at *build time*. Once generated, your backend runs as normal, deterministic server code. No unpredictable AI latency in production.

## Architecture

The project is structured as a monorepo containing two main services:

- `frontend/`: A Next.js application that serves as the marketing site and user dashboard. This is where users connect their GitHub repos and review/approve Anya's proposed backend changes.
- `backend/`: A NestJS application that houses the core agent logic, GitHub webhook listeners, and the engine that generates the backend code.

## Current State

- **Frontend**: The marketing site and dashboard are built using Next.js, Tailwind CSS v4, and Framer Motion for animations. It features a premium "orange on black" aesthetic.
- **Authentication**: GitHub OAuth is integrated using `next-auth`. Users can log in and view their dashboard.
- **Backend**: The NestJS backend is initialized and contains the foundational logic for webhook processing and generation caps.

## Getting Started

### Prerequisites
- Node.js (v20+)
- pnpm

### Setup
1. Clone the repository.
2. Navigate to the `frontend` directory and install dependencies:
   ```bash
   cd frontend
   pnpm install
   ```
3. Create a `.env.local` file in the `frontend` directory with your GitHub OAuth credentials:
   ```env
   GITHUB_ID=your_client_id
   GITHUB_SECRET=your_client_secret
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```
4. Start the frontend development server:
   ```bash
   pnpm run dev
   ```

## License
MIT
