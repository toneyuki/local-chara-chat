// src/renderer/src/components/layout/Main.tsx

import { CharacterListProps } from '@renderer/types/character'
import { TabItemProps } from '@renderer/types/tabs'

import { MainHeader } from '../main/MainHeader'
import { MainNavigator } from '../main/MainNavigator'

type MainProps = CharacterListProps & TabItemProps

export function Main({ characters, tabs }: MainProps): React.JSX.Element {
  return (
    <main className="main-content">
      <MainHeader characters={characters} />
      <MainNavigator tabs={tabs} />
    </main>
  )
}
