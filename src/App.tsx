import { useState } from "react"

const App = () => {
  const [count, setCount] = useState(0)

  const increaseCount = () => {
    setCount((currentCount) => currentCount + 1)
  }

  return (
    <>
      <h1>React workshop</h1>
      {/* Plasser knappene i oppgave 1 her */}
    </>
  )
}

export default App
