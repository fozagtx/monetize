import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const supabase = await getSupabaseServerClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, productUrl, paymentAddress, priceUsdc, creatorName, creatorEmail } = body

    // Validate required fields
    if (!title || !productUrl || !paymentAddress || !priceUsdc) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("products")
      .insert({
        user_id: user.id,
        title,
        description,
        product_url: productUrl,
        payment_address: paymentAddress,
        price_usdc: priceUsdc,
        creator_name: creatorName || user.email,
        creator_email: creatorEmail || user.email,
      })
      .select("id")
      .single()

    if (error) {
      console.error("[v0] Error creating product:", error)
      return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
    }

    return NextResponse.json({ productId: data.id })
  } catch (error) {
    console.error("[v0] Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = await getSupabaseServerClient()

    const { data: products, error } = await supabase
      .from("products")
      .select("id, title, description, price_usdc, creator_name, created_at")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Error fetching products:", error)
      return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
    }

    return NextResponse.json({ products })
  } catch (error) {
    console.error("[v0] Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
