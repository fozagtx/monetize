import { CreateProductForm } from "@/components/create-product-form"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function CreatePage() {
  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/signin")
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-4xl font-bold">Create Digital Product</h1>
          <p className="text-lg text-muted-foreground">
            Upload your product details and start accepting USDC payments on Base
          </p>
        </div>
        <CreateProductForm />
      </div>
    </div>
  )
}
