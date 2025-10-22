import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, Package } from "lucide-react"

async function getProducts() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/products`, {
      cache: "no-store",
    })
    if (!response.ok) return []
    return await response.json()
  } catch (error) {
    console.error("[v0] Error fetching products:", error)
    return []
  }
}

export default async function MarketplacePage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-4xl font-bold">Digital Product Marketplace</h1>
          <p className="text-lg text-muted-foreground">Browse and purchase digital products with USDC on Base</p>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="mx-auto max-w-md text-center">
            <div className="mb-6 inline-flex rounded-full bg-muted p-6">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="mb-3 text-2xl font-semibold">No products yet</h2>
            <p className="mb-6 text-muted-foreground">
              Be the first to create a digital product and start accepting crypto payments!
            </p>
            <Button asChild size="lg">
              <Link href="/create">Create First Product</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product: any) => (
              <Card key={product.id} className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
                {/* Product Image */}
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  <img
                    src={product.image_url || "/placeholder.svg?height=400&width=600"}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <CardHeader>
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <CardTitle className="line-clamp-2 text-xl">{product.title}</CardTitle>
                    <Badge variant="secondary" className="shrink-0">
                      ${product.price_usdc} USDC
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-3">{product.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  {product.creator_name && (
                    <p className="text-sm text-muted-foreground">
                      by <span className="font-medium text-foreground">{product.creator_name}</span>
                    </p>
                  )}
                </CardContent>

                <CardFooter>
                  <Button asChild className="w-full gap-2" size="lg">
                    <Link href={`/product/${product.id}`}>
                      View Product <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
