import { globSync } from 'glob'
import { readFileSync } from 'fs'
import { build } from 'esbuild'
const files = globSync('./*.test.js')
files.forEach(async item => {
  const fileContent = readFileSync(item, 'utf-8')
  const text = await readModel(fileContent)
  const fn = new Function(text)
  fn()
})
async function readModel(fileContent) {
  const result = await build({
    stdin: {
      contents: fileContent + `\n import {  run} from './core.js'; run()`,
      resolveDir: process.cwd(),
    },
    write: false,
    bundle: true,
    target: 'esnext'
  })
  return result.outputFiles[0].text
}
