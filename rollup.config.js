// import babel from "rollup-plugin-babel";
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import pkg from './package.json';

const extensions = ['.ts', '.js', '.jsx', '.es6', '.es', '.mjs', '.tsx'];

export default {
  input: 'src/main.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'default',
    },
  ],
  plugins: [
    nodeResolve({
      extensions,
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      include: ['src/**/*'],
      extensions,
    }),
    uglify(),
  ],
  external: ['react'],
};
