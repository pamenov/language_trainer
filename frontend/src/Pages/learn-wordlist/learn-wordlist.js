import { useEffect, useState } from "react"
import api from "../../Api/endpoints"
import { Container, Main, TagsContainer, LinkComponent, OptionButton } from '../../Components'
import { useParams } from "react-router-dom"
import styles from './styles.module.css'



const LearnWordPage = () => {
  const [wordAndOptions, setWordAndOptions] = useState({
    "hebrew":"\xd7\x97\xd7\xaa\xd7\x95\xd7\x9c",
    "translate":"cat",
    "fake_translate":"snake",
    "word_id":"4"
  })
  const id = useParams()

  useEffect(_ => {
    const getWordAndOptions = async (id) => {
      try {
        const response = await api.getWordToLearn(id)
        setWordAndOptions(response.data)
        return response
      } catch(error) {
        console.error(error)
      }
    }
    getWordAndOptions(id)
  }, [])

  const AnimateAnswer = (isCorrect, buttonId) => {

  }

  const {hebrew, translate, fake_translate, word_id} = wordAndOptions
  return <Main>
    <Container>
      <div className={styles["column-container"]}>
        <div className={styles["column-for-hebrew"]}>
          {hebrew}
        </div>
        <div className={styles["column-for-options"]}>
          <OptionButton clickHandler={() => {this.AnimateAnswer(true)}}>
            <p>{translate}</p>
          </OptionButton>
          <OptionButton clickHandler={() => {this.AnimateAnswer(false)}}>
            <p>{fake_translate}</p>
          </OptionButton>
        </div>
      </div>
    </Container>
  </Main>
}

export default LearnWordPage