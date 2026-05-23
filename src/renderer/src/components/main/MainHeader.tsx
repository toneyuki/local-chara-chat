// src/renderer/src/components/main/MainHeader.tsx

import { Character, CharacterListProps } from '@renderer/types/character'

export function MainHeader({ characters }: CharacterListProps): React.JSX.Element {
  const selectedCharacter = getSelectedCharacter(characters)
  return (
    <div className="main-header">
      <span className="material-symbols-outlined main-header__character-icon">settings</span>
      <span className="main-header__character-name">{selectedCharacter?.name}</span>
    </div>
  )
}

function getSelectedCharacter(characters: Character[]): Character | undefined {
  return characters.find((character) => character.active)
}
