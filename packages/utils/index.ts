export function formatCurrency(n: number): string {
  return "USD" + Number(n).toFixed(2);
}
