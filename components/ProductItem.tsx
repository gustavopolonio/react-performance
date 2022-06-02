import { memo, useState } from 'react'
import dynamic from 'next/dynamic'
import { AddProductToWishListProps } from './AddProductToWishList'

const AddProductToWishList = dynamic<AddProductToWishListProps>(
  () => import('./AddProductToWishList').then(mod => mod.AddProductToWishList),
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

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product)
})