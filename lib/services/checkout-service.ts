import type { CheckoutPreview, CheckoutPreviewRequest } from '@/lib/contracts/checkout'

/**
 * This intentionally supports preview only. Real order submission belongs to
 * a later authenticated backend phase.
 */
export interface CheckoutService {
  getPreview(request: CheckoutPreviewRequest): Promise<CheckoutPreview>
}
