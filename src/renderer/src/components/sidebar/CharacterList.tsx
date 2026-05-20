// src/renderer/src/components/sidebar/CharacterList.tsx

import { CharacterCard } from './CharacterCard'

type Character = {
  id: number
  name: string
  tags: string[]
  active: boolean
}

type CharacterListProps = {
  characters: Character[]
}

export function CharacterList({ characters }: CharacterListProps): React.JSX.Element {
  return (
    <div className="character-list">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          name={character.name}
          tags={character.tags}
          active={character.active}
        />
      ))}
    </div>
  )
}
