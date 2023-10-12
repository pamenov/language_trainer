import { Container, Main, Button, TagsContainer, Icons, LinkComponent } from '../../Components'
import { UserContext, AuthContext } from '../../Contexts'
import { useContext, useState, useEffect } from 'react'
import styles from './styles.module.css'
import Wordlist from './wordlist'
import Description from './description'
import cn from 'classnames'
import { Navigate, useParams, useLocation} from 'react-router-dom'
import Api from '../../Api/endpoints'

import { useCollections } from '../../Utils/index.js'
import api from '../../Api/endpoints'

const WordsetDetail = () => {
  // const [ loading, setLoading ] = useState(true)
  const {
    collections,
    setCollections
  } = useCollections()
  const authContext = useContext(AuthContext)
  const userContext = useContext(UserContext)
  const [collection, setCollection] = useState({
    "id": "2",
    "name": "Animals",
    "description": "AAAAAAAAAAAAAAAAAAA ITS A TRAP",
    "list_of_words": [
        {
            "id": 4,
            "hebrew": "חתול",
            "english": "cat",
            "russian": "кот"
        },
        {
            "id": 5,
            "hebrew": "נָחָשׁ",
            "english": "snake",
            "russian": "змея"
        }
    ],
    "is_favorited": true
  })
  const { id } = useParams()

  const handleLike = async (id) => {
    if (authContext) {
      const response = await Api.changeFavorites(id)
      setCollection({ ...collection, "is_favorited": !collection["is_favorited"]})
      return response
    }
  }

  useEffect(_ => {
    // console.log(useLocation())
    const getCollection = async (id) => {
      try {
        const response = await api.collectionDetails({id})
        return response.data
      } catch(error) {
        console.error(error) 
      }
    }
    // const get
    const getAllStates = async (id) => {
      const collection_tmp = await getCollection(id)
      setCollection(collection_tmp)
    }
    getAllStates(id)
  }, [])
  
  let {
    name,
    description,
    is_favorited,
    list_of_words,
  } = collection

  const length = list_of_words.length
  
  return <Main>
    <Container>
      {/* <MetaTags>
        <title>{name}</title>
        <meta name="description" content={`Продуктовый помощник - ${name}`} />
        <meta property="og:title" content={name} />
      </MetaTags> */}
      <div className={styles['single-card']}>
        {/* <img src={image} alt={name} className={styles["single-card__image"]} /> */}
        <div className={styles["single-card__info"]}>
          <div className={styles["single-card__header-info"]}>
              <h1 className={styles["single-card__title"]}>{name}</h1>
              {authContext && <Button
                modifier='style_none'
                clickHandler={async _ => {
                  await handleLike(id)
                }}
              >
                {collection["is_favorited"]? <Icons.StarBigActiveIcon /> : <Icons.StarBigIcon />}
              </Button>}

          </div>
          {/* <TagsContainer tags={tags} /> */}
          <div>
            <p className={styles['single-card__text']}><Icons.ClockIcon /> {length} words.</p>
            <p className={styles['single-card__text_with_link']}>
              {/* <div className={styles['single-card__text']}>
                <Icons.UserIcon /> <LinkComponent
                  title={`${author.first_name} ${author.last_name}`}
                  href={`/user/${author.id}`}
                  className={styles['single-card__link']}
                />
              </div> */}
              {/* {(userContext || {}).id === author.id && <LinkComponent
                href={`${url}/edit`}
                title='Edit word list'
                className={styles['single-card__edit']}
              />} */}
            </p>
          </div>
          <div className={styles['single-card__buttons']}>
            <Button
              modifier='style_dark-blue'
              className={styles.button}
              href={`${window.location.href}/learn/`}
            >
              Start!
            </Button>
          </div>
          <Description description={description} />
          <Wordlist words={list_of_words} />

        </div>
    </div>
    </Container>
  </Main>
}

export default WordsetDetail

