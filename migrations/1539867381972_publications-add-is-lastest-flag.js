import { Publication } from '../src/Publication'

exports.up = pgm => {
  const tableName = Publication.tableName

  pgm.addColumns(tableName, {
    is_latest: { type: 'BOOLEAN', default: false }
  })
  pgm.addIndex(tableName, 'is_latest')
}
