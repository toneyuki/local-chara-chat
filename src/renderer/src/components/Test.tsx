import { useState } from 'react'

function Test(): React.JSX.Element {
  const [count, setCount] = useState(0)

  return <button onClick={() => setCount(count + 1)}>{count}</button>
}

export default Test
