import type { CheckoutPreview, CheckoutPreviewRequest } from '@/lib/contracts/checkout'
import type { CartService } from '@/lib/services/cart-service'
import type { CheckoutService } from '@/lib/services/checkout-service'
import { mockCartService } from '@/lib/services/mock/cart-service'

export class MockCheckoutService implements CheckoutService {
  constructor(private readonly cartService: CartService = mockCartService) {}

  async getPreview(request: CheckoutPreviewRequest): Promise<CheckoutPreview> {
    const lines = await this.cartService.resolveLines(request.items)
    const summary = await this.cartService.getSummary(request.items)

    return {
      lines,
      summary,
      canRequestQuote: lines.length > 0,
      orderSubmissionAvailable: false,
    }
  }
}

export const mockCheckoutService = new MockCheckoutService()
