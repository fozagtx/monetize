import { CreateProductForm } from "@/components/create-product-form"

export default function CreatePage() {
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
        <h1 className="text-xl font-semibold">Create Product</h1>
      </header>

      <div className="flex-1 p-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-3xl font-bold">Create Your Product</h2>
            <p className="text-lg text-muted-foreground">
              Add your product details and get a shareable payment link to accept USDC on Base
            </p>
          </div>
          <CreateProductForm />
        </div>
      </div>
    </div>
  )
}
