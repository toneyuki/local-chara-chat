// src/renderer/src/components/sidebar/SidebarSearch.tsx

export function SidebarSearch(): React.JSX.Element {
  return (
    <div className="sidebar__search">
      <div className="sidebar__search-box">
        <span className="material-symbols-outlined sidebar__search-icon">search</span>
        <input className="sidebar__search-input" type="text" placeholder="キャラクターを検索..." />
      </div>
    </div>
  )
}
