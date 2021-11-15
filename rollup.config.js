import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

export default {
  input: './lib/index.ts',

  output: [
    {
      file: './dist/umd/index.js',
      format: 'umd',
      name: 'ViteRequest'
    },
    {
      file: './dist/es/index.js',
      format: 'es',
      name: 'ViteRequest'
    }
  ],
  
  plugins: [
		typescript(),
    terser()
	]
}