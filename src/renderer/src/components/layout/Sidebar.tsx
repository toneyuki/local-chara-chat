// src/renderer/src/components/layout/Sidebar.tsx

import { SidebarHeader } from '../sidebar/SidebarHeader'
import { SidebarSearch } from '../sidebar/SidebarSearch'
import { CharacterList } from '../sidebar/CharacterList'
import { SidebarFooter } from '../sidebar/SidebarFooter'

import { CharacterListProps } from '@renderer/types/character'

export function Sidebar({ characters }: CharacterListProps): React.JSX.Element {
  return (
    <aside className="sidebar">
      <SidebarHeader />

      <SidebarSearch />

      <CharacterList characters={characters} />

      <SidebarFooter />
    </aside>
  )
}
