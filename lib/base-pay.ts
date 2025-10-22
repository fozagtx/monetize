"use client"

// Base Pay integration using @base-org/account SDK
export interface PaymentParams {
  recipient: string
  amount: string // Amount in USDC (e.g., "9.99")
  productId: string
  productTitle: string
}

export interface PaymentResult {
  transactionHash: string
  success: boolean
}

// Initialize Base Pay
export async function initiatePayment(params: PaymentParams): Promise<PaymentResult> {
  try {
    // Import the Base Account SDK dynamically
    const { pay } = await import("@base-org/account")

    // Convert USDC amount to smallest unit (6 decimals for USDC)
    const amountInSmallestUnit = Math.floor(Number.parseFloat(params.amount) * 1_000_000).toString()

    // USDC contract address on Base mainnet
    const USDC_BASE_MAINNET = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"

    // Initiate payment using Base Pay
    const result = await pay({
      recipient: params.recipient,
      amount: amountInSmallestUnit,
      token: USDC_BASE_MAINNET,
      chainId: 8453, // Base mainnet
      metadata: {
        productId: params.productId,
        productTitle: params.productTitle,
      },
    })

    return {
      transactionHash: result.transactionHash,
      success: true,
    }
  } catch (error) {
    console.error("[v0] Payment error:", error)
    throw error
  }
}

// Check payment status
export async function checkPaymentStatus(transactionHash: string): Promise<{
  status: "pending" | "confirmed" | "failed"
  confirmations?: number
}> {
  try {
    const { getPaymentStatus } = await import("@base-org/account")

    const status = await getPaymentStatus({
      transactionHash,
      chainId: 8453, // Base mainnet
    })

    return {
      status: status.confirmed ? "confirmed" : "pending",
      confirmations: status.confirmations,
    }
  } catch (error) {
    console.error("[v0] Error checking payment status:", error)
    return { status: "failed" }
  }
}
