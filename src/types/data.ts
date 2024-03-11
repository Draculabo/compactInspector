import { SearchResult } from 'minisearch'

export interface Data {
  id: number
  name: string
  tags: string[]
  __compat: any
}

export type SearchData = Data & SearchResult
