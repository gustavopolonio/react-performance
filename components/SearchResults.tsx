import { useMemo } from 'react'
import { ProductItem } from './ProductItem'

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    title: string
  }>
}

export function SearchResults({ results }: SearchResultsProps) {
  const total = useMemo(() => {
    return results.reduce((total, product) => {
      return total + product.price
    }, 0)
  }, [results])

  return (
    <div>
      <strong>{total}</strong>

      {results.map(product => (
        <ProductItem product={product} />
      ))}
    </div>
  )
}