import React, { useState } from "react";
import api from '../Api/endpoints'

export default function useCollections () {
  const [ collections, setCollections ] = useState([])
  const [ collectionsCount, setCollectionsCount ] = useState(0)
  const [ collectionsPage, setCollectionsPage ] = useState(1)
  // const { value: tagsValue, handleChange: handleTagsChange, setValue: setTagsValue } = useTags()

  // const handleLike = async ({ id, toLike = true }) => {
  //   const method = toLike ? api.addToFavorites.bind(api) : api.removeFromFavorites.bind(api)
  //   try {
  //     const response = await method({id})
  //     const collectionsUpdated = collections.map(collection => {
  //       if (collection.id === id) {
  //         collection.is_favorited = toLike
  //       }
  //       return collection
  //     })
  //     setCollections(collectionsUpdated)
  //   } catch(error) {
  //     console.error(error)
  //     // const { errors } = err
  //     // if (errors) {
  //     //   alert(errors)
  //     // }
  //   }
  // }

  // const handleAddToCart = ({ id, toAdd = true, callback }) => {
  //   const method = toAdd ? api.addToOrders.bind(api) : api.removeFromOrders.bind(api)
  //   method({ id }).then(res => {
  //     const recipesUpdated = recipes.map(recipe => {
  //       if (recipe.id === id) {
  //         recipe.is_in_shopping_cart = toAdd
  //       }
  //       return recipe
  //     })
  //     setRecipes(recipesUpdated)
  //     callback && callback(toAdd)
  //   })
  //   .catch(err => {
  //     const { errors } = err
  //     if (errors) {
  //       alert(errors)
  //     }
  //   })
  // }

  return {
    collections,
    setCollections,
    collectionsCount,
    setCollectionsCount,
    collectionsPage,
    setCollectionsPage,
    // tagsValue,
    // handleLike,
    // handleAddToCart,
    // handleTagsChange,
    // setTagsValue
  }
}
