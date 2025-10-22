# Monetize - Sell Digital Products with Crypto on Base

A platform for creators to monetize their digital products by accepting USDC payments on the Base blockchain.

## Features

- 🔐 **Supabase Authentication** - Secure user authentication with email/password
- 💰 **Base Payments** - Accept USDC payments on Base L2 with minimal gas fees
- 🛍️ **Product Marketplace** - Browse and purchase digital products
- 🔗 **Payment Links** - Generate shareable payment links for your products
- 🔒 **Row Level Security** - Database security with Supabase RLS policies
- ⚡ **Instant Settlements** - Payments settle in seconds on Base

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Blockchain**: Base (Ethereum L2)
- **Payments**: USDC on Base via @base-org/account
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui

## Setup Instructions

### 1. Clone the Repository

\`\`\`bash
git clone <your-repo-url>
cd monetize
npm install
\`\`\`

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API to get your credentials
3. Run the SQL scripts in the Supabase SQL Editor:
   - `scripts/001-create-products-table.sql`
   - `scripts/002-create-payments-table.sql`

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: For development email redirects
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/marketplace

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

### 4. Enable Email Authentication in Supabase

1. Go to Authentication > Providers in your Supabase dashboard
2. Enable Email provider
3. Configure email templates (optional)

### 5. Run the Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

\`\`\`
monetize/
├── app/
│   ├── api/
│   │   ├── products/route.ts    # Product CRUD operations
│   │   └── payments/route.ts    # Payment tracking
│   ├── auth/
│   │   ├── signin/page.tsx      # Sign in page
│   │   └── signup/page.tsx      # Sign up page
│   ├── create/page.tsx          # Create product page (protected)
│   ├── marketplace/page.tsx     # Browse products
│   ├── product/[id]/page.tsx    # Product detail & purchase
│   └── page.tsx                 # Landing page
├── components/
│   ├── auth/                    # Authentication components
│   ├── ui/                      # shadcn/ui components
│   ├── base-pay-button.tsx      # Base payment integration
│   ├── create-product-form.tsx  # Product creation form
│   └── header.tsx               # Navigation header
├── lib/
│   ├── supabase/
│   │   ├── client.ts            # Browser Supabase client
│   │   └── server.ts            # Server Supabase client
│   └── base-pay.ts              # Base payment utilities
├── scripts/
│   ├── 001-create-products-table.sql
│   └── 002-create-payments-table.sql
└── middleware.ts                # Auth token refresh
\`\`\`

## Database Schema

### Products Table
- `id` - UUID primary key
- `user_id` - References auth.users (creator)
- `title` - Product name
- `description` - Product description
- `product_url` - URL to digital product
- `payment_address` - Base wallet address for payments
- `price_usdc` - Price in USDC
- `creator_name` - Creator display name
- `creator_email` - Creator email

### Payments Table
- `id` - UUID primary key
- `product_id` - References products
- `transaction_hash` - Blockchain transaction hash
- `buyer_address` - Buyer's wallet address
- `amount_usdc` - Payment amount
- `status` - Payment status
- `buyer_email` - Buyer email (optional)

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel project settings
4. Deploy!

### Environment Variables for Production

Make sure to add these in your Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_URL` (your production URL)

## How It Works

1. **Sign Up**: Users create an account with email/password
2. **Create Product**: Authenticated users can create product listings with:
   - Product details (title, description, URL)
   - Base wallet address for receiving payments
   - Price in USDC
3. **Generate Payment Link**: Each product gets a unique payment link
4. **Accept Payments**: Buyers pay with USDC on Base using their wallet
5. **Instant Access**: After payment confirmation, buyers get access to the product URL

## Security

- Row Level Security (RLS) enabled on all tables
- Users can only modify their own products
- Authentication required for product creation
- Middleware refreshes auth tokens automatically
- Payment verification via blockchain transaction hash

## License

MIT
