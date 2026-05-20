// src/renderer/src/components/sidebar/CharacterCard.tsx

type CharacterCardProps = {
  name: string
  tags: string[]
  active?: boolean
}

export function CharacterCard({
  name,
  tags,
  active = false
}: CharacterCardProps): React.JSX.Element {
  return (
    <button
      type="button"
      className={active ? 'character-card character-card--active' : 'character-card'}
    >
      <div className="character-card__icon">?</div>

      <div className="character-card__body">
        <div className="character-card__name">{name}</div>

        <div className="character-card__tags">
          {tags.map((tag) => (
            <span key={tag} className="character-card__tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  )
}
