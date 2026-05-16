// src/main/db/database.ts

import { app } from 'electron'
import path from 'path'
import DatabaseConstructor from 'better-sqlite3'
import type { Database as DatabaseType } from 'better-sqlite3'

const db_path = path.join(app.getPath('userData'), 'app.db')

export const db: DatabaseType = new DatabaseConstructor(db_path)
