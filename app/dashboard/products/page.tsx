import { getSupabaseServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Plus } from "lucide-react"
import Link from "next/link"

export default async function ProductsPage() {
  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false })

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
        <h1 className="text-xl font-semibold">My Products</h1>
      </header>

      <div className="flex-1 space-y-6 p-6">
        {products && products.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product.id} className="flex flex-col">
                <CardHeader>
                  <div className="mb-2 flex items-start justify-between">
                    <CardTitle className="line-clamp-2">{product.title}</CardTitle>
                    <Badge variant="secondary">${product.price_usdc}</Badge>
                  </div>
                  <CardDescription className="line-clamp-3">{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto space-y-2">
                  <div className="text-sm text-muted-foreground">
                    Created {new Date(product.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" className="flex-1" size="sm">
                      <Link href={`/product/${product.id}`}>
                        <ExternalLink className="mr-2 h-3 w-3" />
                        View
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <h3 className="mb-2 text-lg font-semibold">No products yet</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Create your first product to start accepting payments
              </p>
              <Button asChild>
                <Link href="/dashboard/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Product
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
