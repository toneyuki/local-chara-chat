// src/renderer/src/components/sidebar/SidebarSearch.tsx

export function SidebarSearch(): React.JSX.Element {
  return (
    <div className="sidebar__search">
      <span className="sidebar__search-icon">🔎</span>
      <input className="sidebar__search-input" type="text" placeholder="キャラクターを検索..." />
    </div>
  )
}
