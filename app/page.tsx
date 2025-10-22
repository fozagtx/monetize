import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Coins, Shield, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <Coins className="h-4 w-4" />
              Powered by Base
            </div>
            <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight md:text-7xl">
              Monetize your digital products with crypto
            </h1>
            <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
              Accept USDC payments on Base. No fees, no chargebacks, instant settlements. Create payment links in
              seconds and start earning.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="/create">
                  Create Product <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/marketplace">Browse Marketplace</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-border py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="flex flex-col items-start">
              <div className="mb-4 rounded-lg bg-primary/10 p-3">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Instant Payments</h3>
              <p className="text-muted-foreground">
                Payments settle in seconds on Base. No waiting days for bank transfers or payment processors.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <div className="mb-4 rounded-lg bg-primary/10 p-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">No Chargebacks</h3>
              <p className="text-muted-foreground">
                Crypto payments are final. No risk of fraudulent chargebacks eating into your revenue.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <div className="mb-4 rounded-lg bg-primary/10 p-3">
                <Coins className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Zero Platform Fees</h3>
              <p className="text-muted-foreground">
                Keep 100% of your earnings. Only pay minimal gas fees on Base (pennies per transaction).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 text-center md:p-12">
            <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">Ready to start earning?</h2>
            <p className="mb-8 text-pretty text-lg text-muted-foreground">
              Create your first product listing in under a minute. No signup required.
            </p>
            <Button asChild size="lg" className="gap-2">
              <Link href="/create">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
