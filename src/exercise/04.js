// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import React from 'react'
import {useLocalStorageState} from '../utils.js'

function Board() {
  // 🐨 squares is the state for this component. Add useState for squares
  // const squares = Array(9).fill(null)
  const [squares, setSquares] = useLocalStorageState('squares', () =>
    Array(9).fill(null),
  )

  const [history, setHistory] = useLocalStorageState(
    'tictactoe:history',
    () => [squares],
  )

  const [step, setStep] = useLocalStorageState('tictactoe:step', 0)

  let nextValue = calculateNextValue(squares)
  let winner = calculateWinner(squares)
  let status = calculateStatus(winner, squares, nextValue)

  // React.useEffect(() => {
  //   const squaresFromStorage =
  //     window.localStorage.getItem('squares') !== null
  //       ? JSON.parse(window.localStorage.getItem('squares'))
  //       : Array(9).fill(null)
  //   setSquares(squaresFromStorage)
  // }, [])

  // React.useEffect(() => {
  //   window.localStorage.removeItem('squares')
  //   window.localStorage.setItem('squares', JSON.stringify(squares))
  // }, [squares])
  // React.useEffect(() => {
  //   console.log('history ', history.length)
  //   console.log('step ', step)

  //   if (squares.every(val => val === null)) {
  //     return
  //   }

  //   if (history.length > 0) {
  //     for (let i = 0; i < history.length; i++) {
  //       if (JSON.stringify(history[i]) === JSON.stringify(squares)) {
  //         return
  //       }
  //     }
  //   }

  //   if (step < history.length) {
  //     window.localStorage.removeItem('tictactoe:history')
  //     const copyHistory = [...history]
  //     copyHistory[step] = squares
  //     copyHistory.length = step + 1
  //     setHistory(copyHistory)
  //   } else {
  //     const copyHistory = [...history, squares]
  //     setHistory(copyHistory)
  //   }
  // }, [squares])

  function selectSquare(square) {
    if (winner || squares[square]) {
      console.log('Returned')
      return
    }

    const squaresCopy = [...squares]
    squaresCopy[square] = nextValue
    const nextStep = step + 1

    //Calculate and Store History
    if (nextStep < history.length) {
      const copyHistory = [...history]
      copyHistory[nextStep] = squaresCopy
      copyHistory.length = nextStep + 1
      setHistory(copyHistory)
    } else {
      const copyHistory = [...history, squaresCopy]
      setHistory(copyHistory)
    }

    setSquares(squaresCopy)
    setStep(prevStep => prevStep + 1)
  }

  function restart() {
    const initialSquares = Array(9).fill(null)
    setSquares(initialSquares)
    setHistory([initialSquares])
    setStep(0)
    window.localStorage.removeItem('squares')
    window.localStorage.removeItem('tictactoe:history')
    window.localStorage.removeItem('tictactoe:step')
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  function moveHistory(step) {
    if (step === 0) {
      setSquares(Array(9).fill(null))
    } else {
      setSquares(history[step])
    }
    setStep(step)
  }

  return (
    <div>
      {/* 🐨 put the status here */}
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <ol>
        {history.map((val, index) => {
          return (
            <li key={index}>
              <button
                disabled={index === step}
                onClick={() => moveHistory(index)}
              >
                {index === 0
                  ? `Go to Game Start`
                  : `Go to Move #${index} ${step === index ? `(current)` : ``}`}
              </button>
            </li>
          )
        })}
      </ol>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

function calculateStatus(winner, squares, nextValue) {
  const status = winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
  return status
}

function calculateNextValue(squares) {
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
