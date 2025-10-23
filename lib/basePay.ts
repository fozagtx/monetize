"use client";

export interface PaymentParams {
  recipient: string;
  amount: string;
  productId: string;
  productTitle: string;
}

export interface PaymentResult {
  transactionHash: string;
  success: boolean;
}

export async function initiatePayment(
  params: PaymentParams,
): Promise<PaymentResult> {
  try {
    const { pay } = await import("@base-org/account");
    const amountInSmallestUnit = Math.floor(
      Number.parseFloat(params.amount) * 1_000_000,
    ).toString();
    const USDC_BASE_MAINNET = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

    const result = await pay({
      recipient: params.recipient,
      amount: amountInSmallestUnit,
      token: USDC_BASE_MAINNET,
      chainId: 8453,
      metadata: {
        productId: params.productId,
        productTitle: params.productTitle,
      },
    });

    return {
      transactionHash: result.transactionHash,
      success: true,
    };
  } catch (error) {
    console.error("[v0] Payment error:", error);
    throw error;
  }
}

export async function checkPaymentStatus(transactionHash: string): Promise<{
  status: "pending" | "confirmed" | "failed";
  confirmations?: number;
}> {
  try {
    const { getPaymentStatus } = await import("@base-org/account");

    const status = await getPaymentStatus({
      transactionHash,
      chainId: 8453,
    });

    return {
      status: status.confirmed ? "confirmed" : "pending",
      confirmations: status.confirmations,
    };
  } catch (error) {
    console.error(" Error checking payment status:", error);
    return { status: "failed" };
  }
}
