// import babel from "rollup-plugin-babel";
import babel from '@rollup/plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
  },
  plugins: [babel({ babelHelpers: 'bundled' }), uglify()],
  external: ['react'],
};
