import typescript from 'rollup-plugin-typescript2'

export default {
  input: './lib/index.ts',

  output: [
    {
      file: './dist/umd/index.js',
      format: 'umd',
      name: 'QuickRequest'
    },
    {
      file: './dist/es/index.js',
      format: 'es',
      name: 'QuickRequest'
    }
  ],
  
  plugins: [
		typescript()
	]
}