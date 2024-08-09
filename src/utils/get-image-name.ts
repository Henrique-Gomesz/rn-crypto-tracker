export function getImageUrlBySymbol(symbol: string): string {
  const url = `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;

  return url;
}
