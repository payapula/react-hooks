// Hook flow
// https://github.com/donavon/hook-flow
// http://localhost:3000/isolated/examples/hook-flow.js

import React from 'react'

function Child({parentValue, setParentValue}) {
  console.log('%c    Child: render start', 'color: MediumSpringGreen')

  const [count, setCount] = React.useState(() => {
    console.log('%c    Child: useState(() => 0)', 'color: tomato')
    return 0
  })

  React.useEffect(() => {
    console.log('%c    Child: useEffect(() => {})', 'color: LightCoral')
    return () => {
      console.log(
        '%c    Child: useEffect(() => {}) cleanup 🧹',
        'color: LightCoral',
      )
    }
  })

  React.useEffect(() => {
    console.log(
      '%c    Child: useEffect(() => {}, [])',
      'color: MediumTurquoise',
    )
    return () => {
      console.log(
        '%c    Child: useEffect(() => {}, []) cleanup 🧹',
        'color: MediumTurquoise',
      )
    }
  }, [])

  React.useEffect(() => {
    console.log(
      '%c    Child: Value: {0} useEffect(() => {}, [parentValue])',
      'color: HotPink',
      parentValue,
    )
    return () => {
      console.log(
        '%c    Child: useEffect(() => {}, [parentValue]) cleanup 🧹',
        'color: HotPink',
      )
    }
  }, [parentValue])

  React.useEffect(() => {
    console.log('%c    Child: useEffect(() => {}, [count])', 'color: HotPink')
    return () => {
      console.log(
        '%c    Child: useEffect(() => {}, [count]) cleanup 🧹',
        'color: HotPink',
      )
    }
  }, [count])

  const element = (
    <button
      onClick={() => {
        setCount(previousCount => previousCount + 1)
        setParentValue('Pikachu')
        return
      }}
    >
      {count}
    </button>
  )

  console.log('%c    Child: render end', 'color: MediumSpringGreen')

  return element
}

function App() {
  console.log('%cApp: render start', 'color: MediumSpringGreen')

  const [showChild, setShowChild] = React.useState(() => {
    console.log('%cApp: useState(() => false)', 'color: tomato')
    return false
  })

  const [parentValue, setParentValue] = React.useState(() => {
    console.log('%cApp: useState(() => pichu)', 'color: tomato')
    return 'pichu'
  })

  React.useEffect(() => {
    console.log(
      '%cApp: parentValue useEffect(() => {}, [parentValue])',
      'color: LightCoral',
    )

    let timer
    timer = setTimeout(() => {
      console.log('%cApp: I am executed after 3 Seconds', 'color: LightCoral')
    }, 3000)
    //setParentValue('raichu')
    return () => {
      clearTimeout(timer)
      console.log(
        '%cApp: parentValue useEffect(() => {}, [parentValue]) cleanup 🧹',
        'color: LightCoral',
      )
    }
  }, [parentValue])

  React.useEffect(() => {
    console.log('%cApp: useEffect(() => {}, [])', 'color: MediumTurquoise')
    return () => {
      console.log(
        '%cApp: useEffect(() => {}, []) cleanup 🧹',
        'color: MediumTurquoise',
      )
    }
  }, [])

  React.useEffect(() => {
    console.log('%cApp: useEffect(() => {})', 'color: LightCoral')
    return () => {
      console.log('%cApp: useEffect(() => {}) cleanup 🧹', 'color: LightCoral')
    }
  })

  React.useEffect(() => {
    console.log('%cApp: useEffect(() => {}, [showChild])', 'color: HotPink')
    return () => {
      console.log(
        '%cApp: useEffect(() => {}, [showChild]) cleanup 🧹',
        'color: HotPink',
      )
    }
  }, [showChild])

  const element = (
    <>
      <label>
        <input
          type="checkbox"
          checked={showChild}
          onChange={e => setShowChild(e.target.checked)}
        />{' '}
        show child
      </label>
      <label
        style={{
          marginLeft: 2,
          border: '1px solid red',
        }}
      >
        {parentValue}
      </label>
      <button
        onClick={() => {
          setParentValue('Charazard')
          return
        }}
      >
        Parent Change
      </button>
      <div
        style={{
          padding: 10,
          margin: 10,
          height: 50,
          width: 50,
          border: 'solid',
        }}
      >
        {showChild ? (
          <Child parentValue={parentValue} setParentValue={setParentValue} />
        ) : null}
      </div>
    </>
  )

  console.log('%cApp: render end', 'color: MediumSpringGreen')

  return element
}

export default App
