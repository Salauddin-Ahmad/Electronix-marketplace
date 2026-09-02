export type Priority = 'P1' | 'P2' | 'P3' | 'P4'

export type StockMode = 'high' | 'medium' | 'low' | 'order'

export type Product = {
  id: string
  sku: string
  name: string
  slug: string
  category: string
  subcategory: string
  priority: Priority
  stockMode: StockMode
  trending: boolean
  shortDescription: string
  description: string
  brand: string | null
  brandSuggestions: string[]
  specifications: Record<string, string | null>
  attributes?: Record<string, string | number | boolean | string[]>
  applications: string[]
  images: {
    primary: string | null
    gallery: string[]
    imageSearchQuery: string
  }
  pricing: {
    currency: 'BDT'
    cost: number | null
    sellingPrice: number | null
  }
  availability: {
    inStock: boolean | null
    quantity: number | null
    unit: string
  }
  supplier: {
    supplierId: string | null
    supplierName: string | null
  }
  tags: string[]
  status: 'active'
}
