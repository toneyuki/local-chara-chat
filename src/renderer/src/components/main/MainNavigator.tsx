// src/renderer/src/components/main/MainNavigator.tsx

import { TabItemProps } from '@renderer/types/tabs'

export function MainNavigator({ tabs }: TabItemProps): React.JSX.Element {
  return (
    <div className="main-navigator">
      {tabs.map((tab) => {
        const activeClass = tab.active ? 'main-navigator__tab--active' : ''
        return (
          <div key={tab.id} className={`main-navigator__tab ${activeClass}`}>
            <span className="material-symbols-outlined main-navigator__tab-icon">{tab.icon}</span>
            <span className=" main-navigator__tab-label">{tab.label}</span>
          </div>
        )
      })}
    </div>
  )
}
