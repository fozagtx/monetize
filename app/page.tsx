import { getSupabaseServerClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Package,
  DollarSign,
  TrendingUp,
  Plus,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#FAFAFA] to-[#F5F7FA] relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[url('/noise.png')] opacity-[0.12] mix-blend-soft-light" />

      <div className="flex-1 space-y-10 p-8 max-w-6xl mx-auto w-full">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Dashboard Overview
        </h1>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Total Products",
              value: totalProducts,
              icon: Package,
              note: "Active listings",
            },
            {
              title: "Total Sales",
              value: totalSales,
              icon: TrendingUp,
              note: "Completed transactions",
            },
            {
              title: "Total Revenue",
              value: `$${totalRevenue.toFixed(2)}`,
              icon: DollarSign,
              note: "USDC earned",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl p-[1px] overflow-hidden transition-all duration-300 group"
            >
              <div className="absolute inset-0 bg-[conic-gradient(at_top_left,_#ff00ff,_#00ffff,_#ffff00,_#ff00ff)] opacity-75 group-hover:opacity-100 blur-[2px]" />
              <Card className="relative z-10 bg-white/70 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-md transition-all">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {item.title}
                  </CardTitle>
                  <item.icon className="h-5 w-5 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-semibold text-gray-900">
                    {item.value}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{item.note}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="relative rounded-2xl p-[1px] overflow-hidden transition-all duration-300 group">
          <div className="absolute inset-0 bg-[conic-gradient(at_top_left,_#ff00ff,_#00ffff,_#ffff00,_#ff00ff)] opacity-75 group-hover:opacity-100 blur-[2px]" />
          <Card className="relative z-10 bg-white/70 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-md transition-all">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">
                Recent Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              {products && products.length > 0 ? (
                <div className="space-y-4">
                  {products.slice(0, 5).map((product) => (
                    <div
                      key={product.id}
                      className="relative rounded-xl p-[1px] bg-[conic-gradient(at_top_left,_#ff00ff,_#00ffff,_#ffff00,_#ff00ff)] overflow-hidden"
                    >
                      <div className="flex items-center justify-between bg-white/70 backdrop-blur-md rounded-xl px-6 py-4 transition-all hover:bg-white/90">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {product.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            Created{" "}
                            {new Date(product.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="font-semibold text-gray-800">
                            ${product.price_usdc} USDC
                          </p>
                          <Button
                            asChild
                            className="relative overflow-hidden rounded-full px-6 py-1.5 text-sm font-medium text-white bg-black hover:bg-gray-900 transition-all"
                          >
                            <Link href={`/product/${product.id}`}>
                              <span className="flex items-center gap-1">
                                View <ArrowRight className="h-4 w-4" />
                              </span>
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Package className="mb-4 h-12 w-12 text-gray-400" />
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    No products yet
                  </h3>
                  <p className="mb-4 text-sm text-gray-500">
                    Create your first product to start accepting payments
                  </p>
                  <Button
                    asChild
                    className="relative overflow-hidden bg-black text-white rounded-full px-6 py-2 text-sm font-medium hover:bg-gray-900"
                  >
                    <Link href="/dashboard/create">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Product
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
