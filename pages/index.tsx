import type { NextPage } from 'next'
import { useState, FormEvent, useCallback } from 'react'
import { SearchResults } from '../components/SearchResults'

import styles from '../styles/Home.module.css'

interface results {
  data: any[];
  totalPriceFormatted: string
}

const Home: NextPage = () => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<results>({
    data: [],
    totalPriceFormatted: '0'
  })

  const addToWishList = useCallback(async (id: number) => {
    console.log(id)
  }, [])

  async function handleSeach(e: FormEvent) {
    e.preventDefault()
  
    if (!search.trim()) {
      return
    }
  
    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json()

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    const products = data.map(product => {
      return {
        // id: product.id,
        // title: product.title,
        // price: product.price,
        ...product,
        priceFormatted: formatter.format(product.price)
      }
    })

    const totalPrice = data.reduce((total, product) => {
      return total + product.price
    }, 0)

    const totalPriceFormatted = formatter.format(totalPrice)

    setResults({ data: products, totalPriceFormatted })
  }


  return (
    <div className={styles.container}>
      <h1>Search</h1>

      <form onSubmit={handleSeach}>
        <input 
          type="text" 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
        />

        <button type='submit'>Buscar</button>
      </form>

      <SearchResults 
        results={results.data} 
        totalPriceFormatted={results.totalPriceFormatted}
        addToWishList={addToWishList} 
      />
    </div>
  )
}

export default Home
