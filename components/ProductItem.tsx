import { memo } from 'react'

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

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
    </div>
  )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product)
})