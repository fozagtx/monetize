import { getSupabaseServerClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, DollarSign, TrendingUp, Plus } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "@/components/empty-state";

export default async function DashboardPage() {
  const supabase = await getSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: products } = await supabase

    .from("products")

    .select("id, title, price_usdc, created_at")

    .eq("user_id", user?.id)

    .order("created_at", { ascending: false });

  const { data: payments } = await supabase

    .from("payments")

    .select("amount_usdc, product_id")

    .in("product_id", products?.map((p) => p.id) || []);

  const totalProducts = products?.length || 0;

  const totalRevenue =
    payments?.reduce((sum, payment) => sum + Number(payment.amount_usdc), 0) ||
    0;

  const totalSales = payments?.length || 0;

  return (
    <div className="flex flex-col">
      {/*<header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">

        <h1 className="text-xl font-semibold">Dashboard</h1>

      </header>*/}

      <div className="flex-1 space-y-6 p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Products
              </CardTitle>

              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>

              <p className="text-xs text-muted-foreground">Active listings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>

              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">{totalSales}</div>

              <p className="text-xs text-muted-foreground">
                Completed transactions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>

              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">
                ${totalRevenue.toFixed(2)}
              </div>

              <p className="text-xs text-muted-foreground">USDC earned</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>

            <CardDescription>Your latest product listings</CardDescription>
          </CardHeader>

          <CardContent>
            {products && products.length > 0 ? (
              <div className="space-y-4">
                {products.slice(0, 5).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{product.title}</p>

                      <p className="text-sm text-muted-foreground">
                        Created{" "}
                        {new Date(product.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">
                          ${product.price_usdc} USDC
                        </p>
                      </div>

                      <Button asChild variant="outline" size="sm">
                        <Link href={`/product/${product.id}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No products yet"
                description="Create your first product to start accepting payments"
                buttonText="Create Product"
                buttonLink="/dashboard/create"
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
