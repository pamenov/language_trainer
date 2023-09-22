import { useEffect } from 'react';

const Word = () => {
    useEffect(() => {
        fetch("http://127.0.0.1:8000/word/1", {method: 'GET', mode: 'cors',})
          .then(response => response.json())
          .then(data => {
            console.log(data)
          })
          .catch(error => {
            console.log(error)
          })
      }, [])
    // useEffect(() => {
    //     fetch("http://127.0.0.1:8000/word/1", {method: 'GET', mode: 'cors',})
    //       .then(response => console.log(response.json()))

    //   }, [])
    return (
        <h1>lalalala</h1>
    )
}

export default Word;