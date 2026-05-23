// src/renderer/src/App.tsx

import { Sidebar } from './components/layout/Sidebar'
import { Main } from './components/layout/Main'
import { Character } from './types/character'
import { TabItem } from './types/tabs'

const characters: Character[] = [
  { id: 1, name: 'ルナ', tags: ['親切', '友好的'], active: true },
  { id: 2, name: 'ノヴァ', tags: ['創造的', '芸術的'], active: false },
  { id: 3, name: 'アトラス', tags: ['分析的', '論理的'], active: false }
]

const tabs: TabItem[] = [
  { id: 'chat', label: 'チャット', icon: 'chat_bubble', active: true },
  { id: 'profile', label: 'プロフィール', icon: 'person', active: false },
  { id: 'memory', label: 'メモリーツリー', icon: 'network_intelligence', active: false },
  { id: 'prompt', label: 'プロンプト', icon: 'chat_dashed', active: false },
  { id: 'model', label: 'モデル', icon: 'settings', active: false }
]

function App(): React.JSX.Element {
  return (
    <div className="app">
      <Sidebar characters={characters} />
      <Main characters={characters} tabs={tabs} />
    </div>
  )
}

export default App
