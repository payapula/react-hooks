// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

//Refer to utils.js for full Featured Code
function useLocalStorageState(initialValue = '') {
  const [value, setValue] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem('localValue')
    if (valueInLocalStorage) {
      return JSON.parse(valueInLocalStorage)
    }
    return initialValue
  })

  React.useEffect(() => {
    console.log('I am Setting')
    window.localStorage.setItem('localValue', JSON.stringify(value))
  }, [value])

  return [value, setValue]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState(initialName)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
