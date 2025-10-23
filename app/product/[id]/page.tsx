import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CopyLinkButton } from "@/components/copy-link-button";
import { CheckCircle2, ExternalLink, Shield, Zap } from "lucide-react";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { ProductPayButton } from "@/components/basePay";

async function getProduct(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/products?id=${id}`,
      { cache: "no-store" },
    );
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("[v0] Error fetching product:", error);
    return null;
  }
}

export default async function ProductPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isCreator = user && product.user_id === user.id;
  const paymentLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/product/${id}`;
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="grid gap-8 sm:grid-cols-2">
          {/* Product Image & Trust Indicators */}
          <div className="space-y-3">
            <div className="grid gap-3 rounded-lg border border-border bg-card p-4">
              <div className="flex items-center gap-3 text-sm align-middle">
                <div className="rounded-full items-centerbg-primary/10 p-2">
                  <ProductPayButton
                    amount={product.price_usdc}
                    to={product.payment_address}
                    productUrl={product.product_url}
                  />
                </div>
              </div>
            </div>
          </div>

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
                  by{" "}
                  <span className="font-medium text-foreground">
                    {product.creator_name}
                  </span>
                </p>
              )}
            </div>

            <Separator />

            <div>
              <h2 className="mb-3 text-lg font-semibold">About this product</h2>
              <p className="whitespace-pre-wrap text-muted-foreground">
                {product.description}
              </p>
            </div>

            <Separator />

            <div>
              <h2 className="mb-3 text-lg font-semibold">What you'll get</h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">
                    Instant access to the digital product
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">
                    Direct download link after payment
                  </span>
                </li>
              </ul>
            </div>

            <Separator />

            {isCreator ? (
              <Card>
                <CardHeader>
                  <CardTitle>Your Product</CardTitle>
                  <CardDescription>
                    Share this payment link with your customers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border border-border bg-muted/50 p-4">
                    <p className="mb-2 text-sm font-medium">Payment Link:</p>
                    <p className="break-all font-mono text-sm text-muted-foreground">
                      {paymentLink}
                    </p>
                  </div>
                  <CopyLinkButton url={paymentLink} />
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Purchase with USDC</CardTitle>
                  <CardDescription>
                    Pay securely on Base network
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                    <p className="mb-1 font-medium text-foreground">
                      After payment:
                    </p>
                    <div className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      <span>
                        You'll receive instant access to download your product
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
