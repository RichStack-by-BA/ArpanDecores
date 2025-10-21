import ShopPage from '@/components/shop'
import { getAllCategories } from '@/lib/api/category'
import { getAllProducts } from '@/lib/api/product'
import React from 'react'

const page = async () => {
    const categories:any = await getAllCategories()
    const categoryList = categories?.ok ? categories.data : []
    const products :any= await getAllProducts()
    const productsList = products?.ok ? products.data?.data : []
  return (
   <ShopPage productsList={productsList}  categoryList={categoryList}/>
  )
}

export default page