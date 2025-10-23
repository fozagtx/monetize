import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const supabase = await getSupabaseServerClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      description,
      productUrl,
      paymentAddress,
      priceUsdc,
      creatorName,
      creatorEmail,
    } = body;

    if (!title || !productUrl || !paymentAddress || !priceUsdc) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const priceNumber =
      typeof priceUsdc === "string" ? parseFloat(priceUsdc) : priceUsdc;

    if (isNaN(priceNumber) || priceNumber <= 0) {
      return NextResponse.json({ error: "Invalid price" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("products")
      .insert({
        user_id: user.id,
        title,
        description,
        product_url: productUrl,
        payment_address: paymentAddress,
        price_usdc: priceNumber,
        creator_name: creatorName || user.email,
        creator_email: creatorEmail || user.email,
      })
      .select("id")
      .single();

    if (error) {
      console.error(" Error creating product:", error);
      return NextResponse.json(
        { error: "Failed to create product", details: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ productId: data.id });
  } catch (error) {
    console.error(" Error creating product:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to create product", details: message },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await getSupabaseServerClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product ID missing" }, { status: 400 });
    }

    // First, verify the user owns the product
    const { data: product, error: fetchError } = await supabase
      .from("products")
      .select("user_id")
      .eq("id", id)
      .single();

    if (fetchError) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.user_id !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Proceed with deletion
    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Error deleting product:", deleteError);
      return NextResponse.json(
        { error: "Failed to delete product" },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const supabase = await getSupabaseServerClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const { data: product, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(" Error fetching product:", error);
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 },
        );
      }

      return NextResponse.json(product);
    }

    const { data: products, error } = await supabase
      .from("products")
      .select("id, title, description, price_usdc, creator_name, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: 500 },
      );
    }

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
