import cleanup from 'rollup-plugin-cleanup';
import {terser} from 'rollup-plugin-terser';

export default [{
  input: 'select-folder.js',
  output: {
    file: './dist/select-folder.js',
    format: 'cjs',
  	experimentalCodeSplitting: true
  },
  treeshake: true,
  plugins: [
    cleanup(),
    terser()
  ]
},]
