import { memo, useState } from 'react'
import dynamic from 'next/dynamic'
import { AddProductToWishListProps } from './AddProductToWishList'

import { isEqual } from 'lodash'

const AddProductToWishList = dynamic<AddProductToWishListProps>(
  () => { return import('./AddProductToWishList').then(mod => mod.AddProductToWishList)},
  { loading: () => <span>Carregando...</span> }
)

interface ProductItemProps {
  product: {
    id: number;
    title: string;
    price: number;
    priceFormatted: string
  };
  addToWishList: (id: number) => void
}

function ProductItemComponent({ product, addToWishList }: ProductItemProps) {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false)

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>Adicionar aos favoritos</button>

      { isAddingToWishList && (
        <AddProductToWishList
          onAddProductToWishList={() => addToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      ) }
    </div>
  )
}

const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return isEqual(prevProps.product, nextProps.product)
})

ProductItem.displayName = 'ProductItem'

export default ProductItem