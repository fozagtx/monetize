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
import { CheckCircle2, ExternalLink } from "lucide-react";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { ProductPayButton } from "@/components/basePay";

async function getProduct(id: string) {
  try {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_APP_URL ||
          "https://your-production-domain.com"
        : "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/products?id=${id}`, {
      cache: "no-store",
    });

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

  if (!product) notFound();

  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isCreator = user && product.user_id === user.id;

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_APP_URL || "https://your-production-domain.com"
      : "http://localhost:3000";

  const paymentLink = `${baseUrl}/product/${id}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-16">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left column: product info and top pay button */}
          <div className="space-y-8">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-bold tracking-tight mb-2">
                    {product.title}
                  </h1>
                  {product.creator_name && (
                    <p className="text-sm text-muted-foreground">
                      by{" "}
                      <span className="font-medium">
                        {product.creator_name}
                      </span>
                    </p>
                  )}
                </div>

                <Badge variant="outline" className="text-base px-3 py-1">
                  ${product.price_usdc} USDC
                </Badge>
              </div>

              {!isCreator && (
                <div className="mt-6 flex justify-center">
                  <ProductPayButton
                    amount={product.price_usdc}
                    to={product.payment_address}
                    productUrl={product.product_url}
                  />
                </div>
              )}
            </div>

            <Separator />

            <div>
              <h2 className="text-lg font-semibold mb-2">About this product</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            </div>

            <Separator />

            <div>
              <h2 className="text-lg font-semibold mb-2">What you'll get</h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">
                    Instant access to your digital content
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">
                    Secure Base network payment
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right column: Payment or creator card */}
          <div className="sticky top-20">
            <Card className="shadow-xl border-border/60 bg-card/95 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {isCreator ? "Your Product" : "Complete Your Purchase"}
                </CardTitle>
                <CardDescription>
                  {isCreator
                    ? "Share your payment link below"
                    : "Pay securely with USDC on Base network"}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {isCreator ? (
                  <>
                    <div className="rounded-lg border border-border bg-muted/40 p-4">
                      <p className="mb-2 text-sm font-medium">Payment Link</p>
                      <p className="break-all font-mono text-sm text-muted-foreground">
                        {paymentLink}
                      </p>
                    </div>
                    <CopyLinkButton url={paymentLink} />
                  </>
                ) : (
                  <>
                    <div className="rounded-lg bg-muted/60 p-4 text-sm text-muted-foreground">
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
                    <div className="flex justify-center">
                      <ProductPayButton
                        amount={product.price_usdc}
                        to={product.payment_address}
                        productUrl={product.product_url}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
