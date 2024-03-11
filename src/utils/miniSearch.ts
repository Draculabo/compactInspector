import mdn from '@mdn/browser-compat-data'
import MiniSearch from 'minisearch'

import { Data } from '@/types/data'

let miniSearch: MiniSearch<Data>
const initialize = () => {
  miniSearch = new MiniSearch({
    fields: ['name', 'tags'], // fields to index for full-text search
    storeFields: ['name', 'tags', '__compat'], // fields to return with search results
  })
  const data = flatternData(mdn)
  miniSearch.addAll(data)
}

const getInstance = () => {
  if (!miniSearch) {
    initialize()
  }
  return miniSearch!
}

export { getInstance }
