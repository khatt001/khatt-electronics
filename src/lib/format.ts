export function formatPrice(price: number) {
  return new Intl.NumberFormat("az-AZ", {
    style: "currency",
    currency: "AZN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}
