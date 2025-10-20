import resolve from '@rollup/plugin-node-resolve';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import nodePolyfills from 'rollup-plugin-polyfill-node';

export default {
    // onwarn: function ( message ) {
    // if (message.code === 'CIRCULAR_DEPENDENCY') {
    //   return;
    // }
    // console.error(message);
    // },
    input:'./src/index.js',
    output: {
      file:'build/bundle.js',
      format:'iife',
      name: 'MyReactApp',
      globals: {
        'd3': 'd3',
        'react' : 'React',
        'react-dom': 'ReactDOM'
      }
    },
    external: [
      'd3', 'react', 'react-dom',
    ],
    plugins: [
      resolve(),
      nodeResolve({
          jsnext:true,
          main:true,
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
        preventAssignment: true,
      }),
      babel({
        babelHelpers: 'bundled',
        extensions: ['.js', '.jsx']
      }),
      commonjs({
        include: 'node_modules/**'
      }),
      nodePolyfills()
    ]
};