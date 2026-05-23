// src/renderer/src/types/tabs.ts

export type MainTab = 'chat' | 'profile' | 'memory' | 'prompt' | 'model'

export type TabItem = {
  id: MainTab
  label: string
  icon: string
  active: boolean
}

export type TabItemProps = {
  tabs: TabItem[]
}
