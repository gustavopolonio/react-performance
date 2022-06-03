import { List, ListRowRenderer } from 'react-virtualized'
import ProductItem from './ProductItem'

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
  const rowRender: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem product={results[index]} addToWishList={addToWishList} />
      </div>
    )
  }

  return (
    <div>
      <strong>{totalPriceFormatted}</strong>

      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRender}
      />
    </div>
  )
}