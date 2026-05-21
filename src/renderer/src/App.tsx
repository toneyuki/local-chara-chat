// src/renderer/src/App.tsx

import { Sidebar } from './components/layout/Sidebar'
import { Main } from './components/layout/Main'


function App(): React.JSX.Element {
  return (
    <div className="app">
      <Sidebar />
      <Main />
    </div>
  )
}

export default App
