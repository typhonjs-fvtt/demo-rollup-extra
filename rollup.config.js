import path             from 'path';

import postcss          from 'rollup-plugin-postcss';       // Process Sass / CSS w/ PostCSS
import { terser }       from 'rollup-plugin-terser';        // Terser is used for minification / mangling

// Import config files for Terser and Postcss; refer to respective documentation for more information.
import terserConfig     from './terser.config';
import postcssOptions   from './postcss.config';

// Basic directories paths. The `foundry.js` client code is bundled to `./public` in order to serve it via `http-server`
const s_CLIENT_PATH = './public';

// The deploy path for the server bundle which includes the common code.
const s_DEPLOY_PATH = './dist';

// Produce sourcemaps or not.
const s_SOURCEMAP = true;

// Adds Terser to the output plugins for server bundle if true.
const s_MINIFY = false;

export default () =>
{
   // Defines potential output plugins to use conditionally if the .env file indicates the bundles should be
   // minified / mangled.
   const outputPlugins = [];
   if (s_MINIFY)
   {
      outputPlugins.push(terser(terserConfig));
   }

   // Reverse relative path from the deploy path to local directory; used to replace source maps path, so that it
   // shows up correctly in Chrome dev tools.
   const relativeClientPath = path.relative(`${s_CLIENT_PATH}`, '.');
   const relativeServerPath = path.relative(`${s_DEPLOY_PATH}`, '.');

   // This bundle is for the client.
   return [{
      input: ['src/client/index.js'],
      output: [{
         file: `${s_CLIENT_PATH}${path.sep}foundry-iife.js`,
         format: 'iife',
         name: 'foundry',  // namespace for iife bundle
         preferConst: true,
         sourcemap: s_SOURCEMAP,
         sourcemapPathTransform: (sourcePath) => sourcePath.replace(relativeClientPath, `.`)
      }],
      plugins: [
         postcss(postcssOptions(s_SOURCEMAP))                // Engages PostCSS for LESS / CSS processing
      ]
   },

   // This bundle is for the server.
   {
      input: ['src/server/index.js'],
      output: [{
         file: `${s_DEPLOY_PATH}${path.sep}server-esm.js`,
         format: 'es',
         plugins: outputPlugins,
         preferConst: true,
         sourcemap: s_SOURCEMAP,
         sourcemapPathTransform: (sourcePath) => sourcePath.replace(relativeServerPath, `.`)
      }]
   }];
};
