export default function formatCurrency(amount: number) {
  return Intl.NumberFormat("de", {
    style: "currency",
    currency: "EUR",
  }).format(amount)
}
