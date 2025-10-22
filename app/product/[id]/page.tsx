import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BasePayButton } from "@/components/base-pay-button"
import { CopyLinkButton } from "@/components/copy-link-button"
import { CheckCircle2, ExternalLink, Shield, Zap } from "lucide-react"
import { getSupabaseServerClient } from "@/lib/supabase/server"

async function getProduct(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/products?id=${id}`,
      {
        cache: "no-store",
      },
    )
    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    console.error("[v0] Error fetching product:", error)
    return null
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isCreator = user && product.user_id === user.id
  const productUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/product/${id}`

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
              <img
                src={product.image_url || "/placeholder.svg?height=600&width=800"}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Trust Indicators */}
            <div className="grid gap-3 rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="rounded-full bg-primary/10 p-2">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Instant Access</p>
                  <p className="text-muted-foreground">Get your product immediately after payment</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="rounded-full bg-primary/10 p-2">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Secure Payment</p>
                  <p className="text-muted-foreground">Powered by Base blockchain</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-start justify-between gap-4">
                <h1 className="text-3xl font-bold">{product.title}</h1>
                <Badge variant="secondary" className="shrink-0 text-lg">
                  ${product.price_usdc} USDC
                </Badge>
              </div>
              {product.creator_name && (
                <p className="text-muted-foreground">
                  by <span className="font-medium text-foreground">{product.creator_name}</span>
                </p>
              )}
            </div>

            <Separator />

            <div>
              <h2 className="mb-3 text-lg font-semibold">About this product</h2>
              <p className="whitespace-pre-wrap text-muted-foreground">{product.description}</p>
            </div>

            <Separator />

            {/* What's Included */}
            <div>
              <h2 className="mb-3 text-lg font-semibold">What you'll get</h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">Instant access to the digital product</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">Direct download link after payment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">Secure blockchain-verified transaction</span>
                </li>
              </ul>
            </div>

            <Separator />

            {isCreator ? (
              <Card>
                <CardHeader>
                  <CardTitle>Your Product</CardTitle>
                  <CardDescription>Share this payment link with your customers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border border-border bg-muted/50 p-4">
                    <p className="mb-2 text-sm font-medium">Payment Link:</p>
                    <p className="break-all font-mono text-sm text-muted-foreground">{productUrl}</p>
                  </div>
                  <CopyLinkButton url={productUrl} />
                  <div className="rounded-lg bg-primary/5 p-3 text-sm">
                    <p className="font-medium text-primary">✓ This is your product</p>
                    <p className="mt-1 text-muted-foreground">
                      Share the link above with customers so they can pay you with USDC
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Purchase with USDC</CardTitle>
                  <CardDescription>Pay securely on Base network</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <BasePayButton
                    productId={product.id}
                    productTitle={product.title}
                    recipient={product.payment_address}
                    amount={product.price_usdc}
                    onSuccess={(txHash) => {
                      alert(
                        `Payment successful! Transaction: ${txHash}\n\nAccess your product at: ${product.product_url}`,
                      )
                      window.open(product.product_url, "_blank")
                    }}
                    onError={(error) => {
                      alert(`Payment failed: ${error.message}`)
                    }}
                  />

                  <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                    <p className="mb-1 font-medium text-foreground">After payment:</p>
                    <div className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      <span>You'll receive instant access to download your product</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
