"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle2, XCircle } from "lucide-react"
import { initiatePayment, checkPaymentStatus, type PaymentParams } from "@/lib/base-pay"

interface BasePayButtonProps {
  productId: string
  productTitle: string
  recipient: string
  amount: string
  onSuccess?: (transactionHash: string) => void
  onError?: (error: Error) => void
}

export function BasePayButton({ productId, productTitle, recipient, amount, onSuccess, onError }: BasePayButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [status, setStatus] = useState<"idle" | "processing" | "confirming" | "success" | "error">("idle")
  const [transactionHash, setTransactionHash] = useState<string>("")

  const handlePayment = async () => {
    setIsProcessing(true)
    setStatus("processing")

    try {
      const params: PaymentParams = {
        recipient,
        amount,
        productId,
        productTitle,
      }

      // Initiate payment
      const result = await initiatePayment(params)
      setTransactionHash(result.transactionHash)
      setStatus("confirming")

      // Poll for confirmation
      let confirmed = false
      let attempts = 0
      const maxAttempts = 30 // 30 seconds max

      while (!confirmed && attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const paymentStatus = await checkPaymentStatus(result.transactionHash)

        if (paymentStatus.status === "confirmed") {
          confirmed = true
          setStatus("success")

          // Record payment in database
          await fetch("/api/payments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              productId,
              transactionHash: result.transactionHash,
              amountUsdc: amount,
            }),
          })

          onSuccess?.(result.transactionHash)
        } else if (paymentStatus.status === "failed") {
          throw new Error("Payment failed")
        }

        attempts++
      }

      if (!confirmed) {
        throw new Error("Payment confirmation timeout")
      }
    } catch (error) {
      console.error("[v0] Payment error:", error)
      setStatus("error")
      onError?.(error as Error)
    } finally {
      setIsProcessing(false)
    }
  }

  if (status === "success") {
    return (
      <Button size="lg" className="w-full gap-2" disabled>
        <CheckCircle2 className="h-5 w-5" />
        Payment Successful
      </Button>
    )
  }

  if (status === "error") {
    return (
      <Button size="lg" variant="destructive" className="w-full gap-2" onClick={handlePayment}>
        <XCircle className="h-5 w-5" />
        Retry Payment
      </Button>
    )
  }

  return (
    <Button size="lg" className="w-full gap-2" onClick={handlePayment} disabled={isProcessing}>
      {isProcessing ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          {status === "confirming" ? "Confirming Payment..." : "Processing Payment..."}
        </>
      ) : (
        <>Pay ${amount} USDC</>
      )}
    </Button>
  )
}
