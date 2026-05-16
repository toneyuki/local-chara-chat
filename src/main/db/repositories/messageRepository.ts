// src/main/db/messageRepository.ts

import { RunResult } from 'better-sqlite3'
import { db } from '../database'

export function createMessage(role: string, content: string): RunResult {
  const stmt = db.prepare(`
        INSERT INTO messages(
            role,
            content,
            created_at
        )
        VALUES (?, ?, ?)
    `)

  return stmt.run(role, content, new Date().toISOString())
}

export function findMessages(): unknown[] {
  const stmt = db.prepare(`
        SELECT * FROM messages ORDER BY DESC
    `)

  return stmt.all()
}
