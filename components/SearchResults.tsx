import { ProductItem } from './ProductItem'

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    priceFormatted: string
    title: string
  }>;
  addToWishList: (id: number) => void;
  totalPriceFormatted: string
}

export function SearchResults({ results, addToWishList, totalPriceFormatted }: SearchResultsProps) {

  return (
    <div>
      <strong>{totalPriceFormatted}</strong>

      {results.map(product => (
        <ProductItem key={product.id} product={product} addToWishList={addToWishList} />
      ))}
    </div>
  )
}