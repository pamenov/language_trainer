import { useEffect, useState, useContext } from "react"
import api from "../../Api/endpoints"
import { Container, Main, WordCard, OptionButton, SessionCounters} from '../../Components'
import { useParams } from "react-router-dom"
import styles from './styles.module.css'
import { shuffleArray } from "../../Utils"
import { AuthContext, UserContext } from '../../Contexts'


const LearnWordPage = () => {
  const [wordAndOptions, setWordAndOptions] = useState({
    "hebrew":"\xd7\x97\xd7\xaa\xd7\x95\xd7\x9c",
    "translate":"cat",
    "fake_translate":"snake",
    "word_id":"4"
  })
  const id = useParams()
  const authContext = useContext(AuthContext)
  const userContext = useContext(UserContext)

  const [questionCounter, setQuestionCounter] = useState(0)
  const [rightAnswers, setRightAnswers] = useState(0)

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
  }, [questionCounter])

  const animateAnswer = (isCorrect, buttonId) => {
    const colormap = {
      true: "#00bb00",
      false: "#ee0000"
    }
    const color = colormap[isCorrect]
    const element = document.getElementById(buttonId);
    element.style.background = color;
    return new Promise(() => {
      setTimeout(() => {
        element.style.background = "#F0F3FF"
        setQuestionCounter(questionCounter + 1)
        if (isCorrect) {
          setRightAnswers(rightAnswers + 1)
        }
        if (authContext) {
          api.sendStatistics(isCorrect, wordAndOptions["word_id"])
        }
      }, 300)
    })
  }

  const arrayToDisplay = shuffleArray([
    <OptionButton buttonId="button-1" clickHandler={async () => {await animateAnswer(true, "button-1")}}> {wordAndOptions["translate"]} </OptionButton>,
    <OptionButton buttonId="button-2" clickHandler={async () => {await animateAnswer(false, "button-2")}}> {wordAndOptions["fake_translate"]} </OptionButton>,
  ])

  return <Main>
    <Container>
      <div className={styles["column-container"]}>
        <div className={styles["column-for-hebrew"]}>
          <SessionCounters totalCounter={questionCounter} correctCounter={rightAnswers} />
          <WordCard word={wordAndOptions["hebrew"]} />
        </div>
        <div className={styles["column-for-options"]}>
          {/* lalalal */}
          {arrayToDisplay[0]}
          {arrayToDisplay[1]}
        </div>
      </div>
    </Container>
  </Main>
}

export default LearnWordPage