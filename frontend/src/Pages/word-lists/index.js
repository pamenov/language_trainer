import { Title, Pagination, CardList, Container, Main, WordsetCard } from '../../Components'
import { AuthContext } from '../../Contexts'
import styles from './styles.module.css'
import { useEffect, useState, useContext } from 'react'
import api from '../../Api/endpoints'
// import { useCollections } from '../../Utils'


const ListsPage = () => {
  // const {
  //   collections,
  //   setCollections,
  //   collectionsCount,
  //   setCollectionsCount,
  //   collectionsPage,
  //   setCollectionsPage,
  //   // tagsValue,
  //   // setTagsValue,
  //   // handleTagsChange,
  //   // handleLike,
  // } = useCollections()
  const [ collections, setCollections ] = useState([])
  const [ collectionsCount, setCollectionsCount ] = useState(0)
  const [ collectionsPage, setCollectionsPage ] = useState(1)
  const authContext = useContext(AuthContext)

  // const handleLike = async (id) => {
  //   if (authContext) {
  //     const response = await api.changeFavorites(id)
  //     // setCollection({ ...collection, "is_favorited": !collection["is_favorited"]})
  //     // return response
  //   }
  // }

  useEffect( _ => {
    const getCollections = async ({ page = 1 }) => {
      const limit = 6
      const created_by_me = false, my_favorite = false
      const {results, count} = await api.collectionsList({created_by_me, my_favorite, page, limit})
      setCollections(results)
      setCollectionsCount(count)
    }
    getCollections({ page: collectionsPage })
  }, [collectionsPage])

  return <Main>
    <Container>
      <div className={styles.title}>
        <Title title='Word sets' />
      </div>
      <CardList>
        {collections.map(card => <WordsetCard
          {...card}
          key={card.id}
          // handleLike={handleLike}
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

