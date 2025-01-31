// /// Extra 1 and 2
// // useEffect: persistent state
// // http://localhost:3000/isolated/exercise/02.js

// import React from 'react'

// function Greeting({initialName = ''}) {
//   // 🐨 initialize the state to the value from localStorage
//   // 💰 window.localStorage.getItem('name') || initialName
//   const [name, setName] = React.useState(
//     () => window.localStorage.getItem('name') || initialName,
//   )

//   // 🐨 Here's where you'll use `React.useEffect`.
//   // The callback should set the `name` in localStorage.
//   // 💰 window.localStorage.setItem('name', name)

//   React.useEffect(() => {
//     console.log('I am Setting')
//     window.localStorage.setItem('name', name)
//   }, [name])

//   function handleChange(event) {
//     setName(event.target.value)
//   }
//   return (
//     <div>
//       <form>
//         <label htmlFor="name">Name: </label>
//         <input value={name} onChange={handleChange} id="name" />
//       </form>
//       {name ? <strong>Hello {name}</strong> : 'Please type your name'}
//     </div>
//   )
// }

// function App() {
//   return <Greeting />
// }

// export default App

// //Extra 1 and 2 ends

// //Hook Flow original

// // Hook flow
// // https://github.com/donavon/hook-flow
// // http://localhost:3000/isolated/examples/hook-flow.js

// //import React from 'react'

// function Child() {
//   console.log('%c    Child: render start', 'color: MediumSpringGreen')

//   const [count, setCount] = React.useState(() => {
//     console.log('%c    Child: useState(() => 0)', 'color: tomato')
//     return 0
//   })

//   React.useEffect(() => {
//     console.log('%c    Child: useEffect(() => {})', 'color: LightCoral')
//     return () => {
//       console.log(
//         '%c    Child: useEffect(() => {}) cleanup 🧹',
//         'color: LightCoral',
//       )
//     }
//   })

//   React.useEffect(() => {
//     console.log(
//       '%c    Child: useEffect(() => {}, [])',
//       'color: MediumTurquoise',
//     )
//     return () => {
//       console.log(
//         '%c    Child: useEffect(() => {}, []) cleanup 🧹',
//         'color: MediumTurquoise',
//       )
//     }
//   }, [])

//   React.useEffect(() => {
//     console.log('%c    Child: useEffect(() => {}, [count])', 'color: HotPink')
//     return () => {
//       console.log(
//         '%c    Child: useEffect(() => {}, [count]) cleanup 🧹',
//         'color: HotPink',
//       )
//     }
//   }, [count])

//   const element = (
//     <button onClick={() => setCount(previousCount => previousCount + 1)}>
//       {count}
//     </button>
//   )

//   console.log('%c    Child: render end', 'color: MediumSpringGreen')

//   return element
// }

// function App() {
//   console.log('%cApp: render start', 'color: MediumSpringGreen')

//   const [showChild, setShowChild] = React.useState(() => {
//     console.log('%cApp: useState(() => false)', 'color: tomato')
//     return false
//   })

//   React.useEffect(() => {
//     console.log('%cApp: useEffect(() => {}, [])', 'color: MediumTurquoise')
//     return () => {
//       console.log(
//         '%cApp: useEffect(() => {}, []) cleanup 🧹',
//         'color: MediumTurquoise',
//       )
//     }
//   }, [])

//   React.useEffect(() => {
//     console.log('%cApp: useEffect(() => {})', 'color: LightCoral')
//     return () => {
//       console.log('%cApp: useEffect(() => {}) cleanup 🧹', 'color: LightCoral')
//     }
//   })

//   React.useEffect(() => {
//     console.log('%cApp: useEffect(() => {}, [showChild])', 'color: HotPink')
//     return () => {
//       console.log(
//         '%cApp: useEffect(() => {}, [showChild]) cleanup 🧹',
//         'color: HotPink',
//       )
//     }
//   }, [showChild])

//   const element = (
//     <>
//       <label>
//         <input
//           type="checkbox"
//           checked={showChild}
//           onChange={e => setShowChild(e.target.checked)}
//         />{' '}
//         show child
//       </label>
//       <div
//         style={{
//           padding: 10,
//           margin: 10,
//           height: 50,
//           width: 50,
//           border: 'solid',
//         }}
//       >
//         {showChild ? <Child /> : null}
//       </div>
//     </>
//   )

//   console.log('%cApp: render end', 'color: MediumSpringGreen')

//   return element
// }

// export default App

// //Hook Flow Original End
