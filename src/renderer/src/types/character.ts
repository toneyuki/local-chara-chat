// src/renderer/src/types/character.ts

export type Character = {
  id: number
  name: string
  tags: string[]
  active: boolean
}

export type CharacterListProps = {
  characters: Character[]
}
