import styles from './style.module.css'
import { LinkComponent, Icons, Button} from '../index'
import { useState, useContext } from 'react'
import { AuthContext, UserContext } from '../../Contexts'
import Api from '../../Api/endpoints'
import { useEffect } from 'react'

const WordsetCard = ({
  id,
  name = 'Без названия',
  description,
  word_counter,
  is_favorited,
  // handleLike,
}) => {
  const authContext = useContext(AuthContext)
  const userContext = useContext(UserContext)

  const handleLike = async (id) => {
    if (authContext) {
      const response = await Api.changeFavorites(id)
      return response
    }
  }

    return <div className={styles.card}>
      {/* <LinkComponent
        className={styles.card__title}
        href={`/recipes/${id}`}
        title={<div className={styles.card__image} style={{ backgroundImage: `url(${ image })` }} />}
      /> */}
      <div className={styles.card__body}>
        <LinkComponent
          className={styles.card__title}
          href={`/wordset/${id}`}
          title={name}
        />
        <LinkComponent
          className={styles.card__description}
          href={`/wordset/${id}`}
          title={description}
        />
        {/*TODO <TagsContainer tags={tags} /> */}
        <div className={styles.card__time}>
          <Icons.ClockIcon /> {word_counter} words.
        </div>
        {/* <div className={styles.card__author}>
          <Icons.UserIcon /> <LinkComponent
            href={`/user/${author.id}`}
            title={`${author.first_name} ${author.last_name}`}
            className={styles.card__link}
          />
        </div> */}
      </div>
      
      <div className={styles.card__footer}>
          {/* {authContext && <Button
            className={styles.card__add}
            modifier='style_light-blue'
            clickHandler={_ => {
              handleAddToCart({ id, toAdd: !is_in_shopping_cart, callback: updateOrders })
            }}
            disabled={!authContext}
          >
            {is_in_shopping_cart ? <><Icons.DoneIcon />Рецепт добавлен</> : <><Icons.PlusIcon fill='#4A61DD' /> Добавить в покупки</>}
          </Button>} */}
          
          {authContext && <Button
            modifier='style_none'
            clickHandler={_ => {
              handleLike(id)
            }}
          >
            {is_favorited ? <Icons.StarActiveIcon /> : <Icons.StarIcon />}
          </Button>}
      </div>
  </div>
}

export default WordsetCard