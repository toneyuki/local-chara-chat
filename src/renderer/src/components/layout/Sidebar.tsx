// src/renderer/src/components/layout/Sidebar.tsx

import { SidebarHeader } from '../sidebar/SidebarHeader'
import { SidebarSearch } from '../sidebar/SidebarSearch'
import { CharacterList } from '../sidebar/CharacterList'
import { SidebarFooter } from '../sidebar/SidebarFooter'

const characters = [
  { id: 1, name: 'ルナ', tags: ['親切', '友好的'], active: true },
  { id: 2, name: 'ノヴァ', tags: ['創造的', '芸術的'], active: false },
  { id: 3, name: 'アトラス', tags: ['分析的', '論理的'], active: false }
]

export function Sidebar(): React.JSX.Element {
  return (
    <aside className="sidebar">
      <SidebarHeader />

      <SidebarSearch />

      <CharacterList characters={characters} />

      <SidebarFooter />
    </aside>
  )
}
