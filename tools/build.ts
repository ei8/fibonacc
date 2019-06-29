import { clean, build, TSRollupConfig, terser, minifyHTML } from 'aria-build'
import { inlineLitElement } from 'rollup-plugin-inline-lit-element'

(async function() {

  const options: TSRollupConfig = {
    input: 'src/index.ts',
    output: {
      file: 'dist/app.js',
      sourcemap: true,
      format: 'es'
    },
    plugins: {
      before: [ inlineLitElement(), minifyHTML() ],
      after: [ terser() ]
    }
  }

  await clean('dist')
  await build(options)
})()