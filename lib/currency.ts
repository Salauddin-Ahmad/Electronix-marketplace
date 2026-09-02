export function formatBDT(value: number) {
  return `৳${new Intl.NumberFormat('en-BD', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value)}`
}
