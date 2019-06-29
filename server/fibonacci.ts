import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'

import { promisify } from 'util'

const readFile = promisify(fs.readFile)

const toCamelCase = (str: string) => {
  return str.replace(/\s(\w)/g, (matches, letter) => {
    return letter.toUpperCase()
  })   
}

export async function readFibonacciFile() {
  const content = await readFile(path.join('server', 'fibonacci.tsv'), 'utf-8')
  const contents = content.split('\n').map(row => row.split('\t'))

  const columns = contents[0].map(content => content.replace('\r', ''))
    .map(column => ({ header: column, field: toCamelCase(column.toLowerCase()) }))

  const rows = [ ...contents ].slice(1, contents.length - 1)
    .map(value => {
      const result = {}
      for (let i = 0; i < columns.length; i++) {
        result[columns[i].field] = value[i]
      }
      return result
    })
    
  return { columns, rows }
}

export function fibonacci() {
  const router = express.Router()

  router.get('/fibonacci', async function(req: express.Request, res: express.Response) {
    const results = await readFibonacciFile()
    res.status(200).send(results)
  })  

  return router 
}