import { Title, Pagination, CardList, Container, Main, CheckboxGroup, WordsetCard } from '../../Components'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import api from '../../Api/endpoints'
import { useCollections } from '../../Utils'
// import MetaTags from 'react-meta-tags'
// import axios from 'axios'

const ListsPage = () => {
  const {
    collections,
    setCollections,
    collectionsCount,
    setCollectionsCount,
    collectionsPage,
    setCollectionsPage,
    // tagsValue,
    // setTagsValue,
    // handleTagsChange,
    handleLike,
  } = useCollections()

  // const [collections, setCollections] = useState()

  
  const getCollections = async ({ page = 1 }) => {
    const created_by_me = false, my_favorite = false
    const result = await api.collectionsList(created_by_me, my_favorite)
    console.log(result.data, "result.data")
    setCollections(result.data)
  }

  useEffect(_ => {
    const sendRequest = async() => {
      await getCollections({ page: collectionsPage })
      console.log(collections, "in use effect")
    }
    sendRequest()
  }, [])

  // useEffect(_ => {
  //   api.getTags()
  //     .then(tags => {
  //       setTagsValue(tags.map(tag => ({ ...tag, value: true })))
  //     })
  // }, [])


  return <Main>
    <Container>
      {/* <MetaTags>
        <title>Рецепты</title>
        <meta name="description" content="Продуктовый помощник - Рецепты" />
        <meta property="og:title" content="Рецепты" />
      </MetaTags> */}
      <div className={styles.title}>
        <Title title='Word sets' />
        {/* <CheckboxGroup
          values={tagsValue}
          handleChange={handleTagsChange}
        /> */}
      </div>
      <CardList>
        {collections.map(card => <WordsetCard
          {...card}
          key={card.id}
          handleLike={handleLike}
        />)}
      </CardList>
      <Pagination
        count={collectionsCount}
        limit={6}
        onPageChange={page => setCollectionsPage(page)}
      />
    </Container>
  </Main>
}

export default ListsPage

