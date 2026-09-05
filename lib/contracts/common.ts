/**
 * Shared commerce primitives. These contracts are intentionally transport-free
 * so the current mock services and a future HTTP implementation can share them.
 */
export type CurrencyCode = 'BDT'

export type Money = {
  amount: number
  currency: CurrencyCode
}

/**
 * `unknown` means that the storefront has no verified inventory information.
 * It must not be presented as an available stock quantity.
 */
export type StockState = 'unknown' | 'in_stock' | 'out_of_stock' | 'on_request'

export type StockSnapshot = {
  state: StockState
  quantity: number | null
  unit: string
  isVerified: boolean
}

export type PageRequest = {
  page?: number
  pageSize?: number
}

export type PaginatedResult<T> = {
  items: T[]
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
}
