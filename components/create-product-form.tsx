"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function CreateProductForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)

      // Create product
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.get("title"),
          description: formData.get("description"),
          productUrl: formData.get("productUrl"),
          paymentAddress: formData.get("paymentAddress"),
          priceUsdc: formData.get("priceUsdc"),
          creatorName: formData.get("creatorName"),
          creatorEmail: formData.get("creatorEmail"),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create product")
      }

      const { productId } = await response.json()
      router.push(`/dashboard/success?id=${productId}`)
    } catch (error) {
      console.error("[v0] Error creating product:", error)
      alert("Failed to create product. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
        <CardDescription>Fill in the information about your digital product</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Product Title</Label>
            <Input id="title" name="title" placeholder="My Awesome Digital Product" required />
          </div>

          {/* Product Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe what buyers will get..."
              rows={4}
              required
            />
          </div>

          {/* Product URL */}
          <div className="space-y-2">
            <Label htmlFor="productUrl">Product URL</Label>
            <Input
              id="productUrl"
              name="productUrl"
              type="url"
              placeholder="https://example.com/download/product"
              required
            />
            <p className="text-sm text-muted-foreground">Link where buyers can access the product after payment</p>
          </div>

          {/* Payment Address */}
          <div className="space-y-2">
            <Label htmlFor="paymentAddress">Your Base Wallet Address</Label>
            <Input
              id="paymentAddress"
              name="paymentAddress"
              placeholder="0x..."
              pattern="^0x[a-fA-F0-9]{40}$"
              required
            />
            <p className="text-sm text-muted-foreground">USDC payments will be sent to this address on Base</p>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="priceUsdc">Price (USDC)</Label>
            <Input id="priceUsdc" name="priceUsdc" type="number" step="0.01" min="0.01" placeholder="9.99" required />
          </div>

          {/* Creator Info */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="creatorName">Your Name (Optional)</Label>
              <Input id="creatorName" name="creatorName" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="creatorEmail">Your Email (Optional)</Label>
              <Input id="creatorEmail" name="creatorEmail" type="email" placeholder="john@example.com" />
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Product...
              </>
            ) : (
              "Create Product & Generate Payment Link"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
