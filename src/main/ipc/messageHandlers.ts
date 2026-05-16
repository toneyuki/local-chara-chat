// src/main/ipc/messageHandlers.ts

import { ipcMain } from 'electron'
import { createMessage } from '../db/repositories/messageRepository'

export function registerMessageHandlers(): void {
  ipcMain.handle('message:create', (_, data) => {
    return createMessage(data.role, data.content)
  })
}
