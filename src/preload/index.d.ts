// src/preload/index.d.ts

// import { ElectronAPI } from '@electron-toolkit/preload'

type CreateMessageData = {
  role: string
  content: string
}

type Api = {
  createMessage: (data: CreateMessageData) => Promise<unknown>
}

declare global {
  interface Window {
    electron: unknown
    api: Api
  }
}

export {}
