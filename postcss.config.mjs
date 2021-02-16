import autoprefixer     from 'autoprefixer';                 // Adds vendor specific extensions to CSS
import postcssPresetEnv from 'postcss-preset-env';           // Popular postcss plugin for next gen CSS usage.

export default (sourceMap = false) =>
{
   return {
      inject: false,                                        // Don't inject CSS into <HEAD>
      extract: `foundry.css`,                               // Output to `foundry.css` in directory of the bundle
      extensions: ['.less', '.css'],                        // File extensions
      plugins: [autoprefixer, postcssPresetEnv],            // Postcss plugins to use
      sourceMap,                                            // Potentially generate sourcemaps
      use: ['less'],                                        // Use less
   };
};