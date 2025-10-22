# Monetize

Platform for creators to monetize digital content and Discord communities with crypto payments on Base.

![Monetize Platform](/placeholder.svg?height=400&width=800&query=modern+crypto+payment+platform+dashboard)

## Demo

[🎥 Watch Monetize in action](#)

**Sell digital products and Discord access with recurring crypto payments on Base blockchain**

![Screenshot](/placeholder.svg?height=600&width=1200&query=product+marketplace+with+discord+integration)

**So simple even your grandma can accept crypto payments 😌**

## What It Does for Creators

Monetize gives you powerful tools to turn your content and community into revenue:

- **Digital Product Sales:** Upload and sell any digital product with one-time USDC payments
- **Discord Community Access:** Sell access to exclusive Discord channels with recurring subscriptions
- **Automatic Access Control:** Members get kicked when payments fail - no manual management needed
- **Base Blockchain Payments:** Accept USDC on Base with minimal gas fees and instant settlements

---

## Real-World Usage Examples

### **Selling a Digital Course**

> I have a video course on web development. I upload the course details, set my Base wallet address, price it at $49 USDC, and share the payment link. Buyers pay with crypto and instantly get access to the course URL.

---

### **Monetizing a Discord Community**

> I run a trading signals Discord server. I connect my Discord account, select my private channels, set a $29/month recurring subscription, and add the Monetize bot. Members pay monthly in USDC, and if they miss 3 payments, they're automatically removed from the channels.

---

### **Creating a Premium Newsletter**

> I write a weekly newsletter with exclusive content. I create a product listing with my Substack URL, set the price at $10 USDC, and share the payment link with my audience. Subscribers pay once and get permanent access.

---

## Quick Start

\`\`\`bash
git clone https://github.com/yourusername/monetize
cd monetize
npm install
npm run dev
\`\`\`

Set up your `.env.local` file:

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Discord (for community monetization)
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
DISCORD_BOT_TOKEN=your_discord_bot_token
NEXT_PUBLIC_DISCORD_REDIRECT_URI=http://localhost:3000/api/discord/callback

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

---

## How Monetize Powers Your Business (Core Features)

- **Supabase Authentication:** Secure email/password auth with Row Level Security
- **Base Blockchain Payments:** Accept USDC on Base L2 with minimal fees
- **One-Time & Recurring Payments:** Support both product sales and subscriptions
- **Discord Integration:** OAuth connection, bot management, and automatic role assignment
- **Payment Link Generation:** Shareable links for each product
- **Automatic Access Management:** Discord members removed when subscriptions fail

---

## Tech Stack

- **@base-org/account** – Base blockchain payment integration
- **TypeScript** – Strongly typed language for scalable code
- **Next.js 16** – React framework with App Router
- **Supabase** – PostgreSQL database with authentication and RLS
- **Tailwind CSS v4** – Utility-first styling
- **Discord.js** – Discord bot and OAuth integration
- **Radix UI + shadcn/ui** – Accessible component library

---

## Use Cases (for any creator scenario)

- Sell digital products (courses, ebooks, templates, software)
- Monetize Discord communities with recurring subscriptions
- Create exclusive content access with crypto payments
- Build membership sites with automatic access control
- Accept international payments without payment processors
- Reduce payment fees with Base L2 blockchain

---

## Database Setup

Run these SQL scripts in your Supabase SQL Editor:

### 1. Products Table
\`\`\`sql
-- See scripts/001-create-products-table.sql
\`\`\`

### 2. Payments Table
\`\`\`sql
-- See scripts/002-create-payments-table.sql
\`\`\`

### 3. Discord Integration
\`\`\`sql
-- See scripts/003-add-discord-support.sql
\`\`\`

---

## Discord Bot Setup

### 1. Create Discord Application

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and name it "Monetize Bot"
3. Go to "OAuth2" and add redirect URL: `http://localhost:3000/api/discord/callback`
4. Copy your Client ID and Client Secret

### 2. Create Discord Bot

1. Go to "Bot" section in your Discord application
2. Click "Add Bot"
3. Enable these Privileged Gateway Intents:
   - Server Members Intent
   - Message Content Intent
4. Copy your Bot Token
5. Go to "OAuth2 > URL Generator"
6. Select scopes: `bot`, `applications.commands`
7. Select permissions: `Manage Roles`, `Kick Members`, `View Channels`
8. Copy the generated URL and invite the bot to your server

### 3. Configure Environment Variables

Add the Discord credentials to your `.env.local` file.

---

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add all environment variables
4. Deploy!

### Production Environment Variables

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
DISCORD_BOT_TOKEN=your_discord_bot_token
NEXT_PUBLIC_DISCORD_REDIRECT_URI=https://yourdomain.com/api/discord/callback
NEXT_PUBLIC_APP_URL=https://yourdomain.com
\`\`\`

---

## How It Works

### Digital Product Sales
1. Creator signs up and creates a product listing
2. Sets Base wallet address and price in USDC
3. Shares payment link with audience
4. Buyers pay with USDC on Base
5. Instant access to product URL after payment

### Discord Community Monetization
1. Creator connects Discord account via OAuth
2. Selects Discord server and channels to monetize
3. Sets recurring subscription price (monthly)
4. Adds Monetize bot to Discord server
5. Members subscribe with USDC payments
6. Bot assigns roles and manages access
7. Failed payments trigger automatic removal after 3 attempts

---

## Security

- ✅ Row Level Security (RLS) on all database tables
- ✅ Users can only modify their own products
- ✅ Authentication required for product creation
- ✅ Middleware refreshes auth tokens automatically
- ✅ Payment verification via blockchain transaction hash
- ✅ Discord bot permissions scoped to role management only

---

## License

MIT
