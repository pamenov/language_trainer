import { Container, Input, Title, Main, Form, Button, Checkbox, Textarea } from '../../Components'
import styles from './styles.module.css'
import api from '../../Api/endpoints'
import { useEffect, useState } from 'react'
// import { useTags } from '../../Utils'
import { useNavigate } from 'react-router-dom'


const CollectionCreate = ({ onEdit }) => {
  // const { value, handleChange, setValue } = useTags()
  const [ collectionName, setCollectionName ] = useState('')
  const navigate = useNavigate()
  const [ word, setWord ] = useState({
    hebrew: '',
    english: '',
    russian: '',
    id: null,
    part_of_speech: ''
  })
  const [ collectionWords, setCollectionWords ] = useState([])
  const [ description, setDescription ] = useState('')


  const checkIfDisabled = () => {
    return description === '' ||
    collectionName === ''
    // collectionWords.length === 0
  }

  return <Main>
    <Container>
      <Title title='Create words list' />
      <Form
        className={styles.form}
        onSubmit={e => {
          e.preventDefault()
          const data = {
            description: description,
            name: collectionName,
            // ADD WORDS HERE
          }
          api
          .createCollection(data)
          .then(res => {
            navigate(`/wordset/${res.pk}`)
          })
          .catch(err => {
            const { non_field_errors } = err
            if (non_field_errors) {
              alert(non_field_errors.join(', '))
            }
            const errors = Object.values(err)
            if (errors) {
              alert(errors.join(', '))
            }
          })
        }}
      >
        <Input
          label='Name'
          onChange={e => {
            const value = e.target.value
            setCollectionName(value)
          }}
        />
        <Textarea
          label='Description'
          onChange={e => {
            const value = e.target.value
            setDescription(value)
          }}
        />
        {/* <CheckboxGroup
          label='Tags'
          values={value}
          className={styles.checkboxGroup}
          labelClassName={styles.checkboxGroupLabel}
          tagsClassName={styles.checkboxGroupTags}
          checkboxClassName={styles.checkboxGroupItem}
          handleChange={handleChange}
        /> */}
        <div className={styles.ingredients}>
          <div className={styles.ingredientsInputs}>
            <Input
              label='Words'
              className={styles.ingredientsNameInput}
              inputClassName={styles.ingredientsInput}
              labelClassName={styles.ingredientsLabel}
              onChange={e => {
                const value = e.target.value

              }}
              // onFocus={_ => {
              //   setShowIngredients(true)
              // }}
              // value={ingredientValue.name}
            />

            {/* {showIngredients && ingredients.length > 0 && <IngredientsSearch
              ingredients={ingredients}
              onClick={({ id, name, measurement_unit }) => {
                handleIngredientAutofill({ id, name, measurement_unit })
                setIngredients([])
                setShowIngredients(false)
              }}
            />} */}

          </div>
          <div className={styles.ingredientsAdded}>
            {collectionWords.map(item => {
              return <div
                className={styles.ingredientsAddedItem}
              >
                <span className={styles.ingredientsAddedItemTitle}>{item.name}</span> <span>-</span> <span>{item.amount}{item.measurement_unit}</span> <span
                  className={styles.ingredientsAddedItemRemove}
                  onClick={_ => {
                    const collectionWordsUpdated = collectionWords.filter(ingredient => {
                      return ingredient.id !== item.id
                    })
                    setCollectionWords(collectionWordsUpdated)
                  }}
                >Удалить</span>
              </div>
            })}
          </div>
          <div
            className={styles.ingredientAdd}
            // onClick={_ => {
            //   if (ingredientValue.amount === '' || ingredientValue.name === '' || !ingredientValue.id) { return }
            //   setCollectionWords([...collectionWords, ingredientValue])
            //   setIngredientValue({
            //     name: '',
            //     id: null,
            //     amount: '',
            //     measurement_unit: ''
            //   })
            // }}
          >
            Add word (not working still)
          </div>
        </div>
        

        <Button
          modifier='style_dark-blue'
          disabled={checkIfDisabled()}
          className={styles.button}
        >
          Create!
        </Button>
      </Form>
    </Container>
  </Main>
}

export default CollectionCreate
