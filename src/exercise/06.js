// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React from 'react'
import {ErrorBoundary} from 'react-error-boundary'

// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  // const [pokemon, setPokemon] = React.useState(null)
  // const [error, setError] = React.useState(null)
  // const [status, setStatus] = React.useState('idle')

  const [state, setState] = React.useState({
    status: pokemonName ? 'pending' : 'idle',
    pokemon: null,
    error: null,
  })

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    // setPokemon(null)
    // setError(null)
    // setStatus('pending')
    setState({status: 'pending'})
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        setState({status: 'resolved', pokemon: pokemonData})

        // setPokemon(pokemonData)
        // setStatus('resolved')
      })
      .catch(error => {
        setState({status: 'rejected', error})

        //setState({status: 'rejected', error})

        // setError(error)
        // setStatus('rejected')
      })
  }, [pokemonName])
  // 🐨 Have state for the pokemon (null)
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, make sure to update the loading state
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => { /* update all the state here */},
  //   )
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemonName: 'Submit a pokemon'
  //   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />
  function showBasedOnStatus(status) {
    switch (status) {
      case 'pending':
        return <PokemonInfoFallback name={pokemonName} />
      case 'resolved':
        return <PokemonDataView pokemon={state.pokemon} />
      case 'rejected':
        throw state.error
      // return (
      //   <div role="alert">
      //     There was an error:{' '}
      //     <pre style={{whiteSpace: 'normal'}}>{state.error.message}</pre>
      //   </div>
      // )
      case 'idle':
      default:
        return 'Submit a Pokemon'
    }
  }

  return <>{showBasedOnStatus(state.status)}</>

  // NORMAL ==>
  // return (
  //   <>
  //     {status === 'idle' ? (
  //       'Submit a Pokemon'
  //     ) : status === 'rejected' ? (
  //       <div role="alert">
  //         There was an error:{' '}
  //         <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
  //       </div>
  //     ) : status === 'resolved' ? (
  //       <PokemonDataView pokemon={pokemon} />
  //     ) : status === 'pending' ? (
  //       <PokemonInfoFallback name={pokemonName} />
  //     ) : (
  //       'Bye Bye'
  //     )}
  //   </>
  // )
}

// class MyErrorBoundary extends React.Component {
//   state = {
//     errorhappened: false,
//     error: null,
//     errorInfo: null,
//   }

//   componentDidCatch(error, errorInfo) {
//     // Catch errors in any components below and re-render with error message
//     this.setState({
//       errorhappened: true,
//       error: error,
//       errorInfo: errorInfo,
//     })
//     // You can also log error messages to an error reporting service here
//   }

//   render() {
//     if (this.state.errorhappened) {
//       // You can render any custom fallback UI
//       return <div>Uh Oh! Something happened! Please check your console!</div>
//     }
//     return this.props.children
//   }
// }

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        {/* <MyErrorBoundary key={pokemonName}>
          <PokemonInfo pokemonName={pokemonName} />
        </MyErrorBoundary> */}
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          resetKeys={[pokemonName]}
          onReset={() => setPokemonName('')}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
