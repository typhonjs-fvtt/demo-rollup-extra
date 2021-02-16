# demo-rollup-extra
Demonstrates a Rollup configuration to bundle shared resources
across client and server code. This is a possible configuration to use
for building `foundry.js` and the server backend from shared code.

An IIFE bundle is produced with the `foundry` namespace for inclusion
as a global script resource with this issue in mind: https://gitlab.com/foundrynet/foundryvtt/-/issues/4156

In this case both the common resources and client resources are namespaced under `foundry` as one bundle.

In addition, PostCSS w/ LESS is enabled for the client code. Two popular / useful PostCSS plugins
`autoprefixer` and `postcss-preset-env` are also configured. The LESS files are located in
`./src/client/less` and each `.less` file associated with a component is simply imported in the
relevant component / `.js` file. If that code is bundled then the `.less` content is included in the
output `foundry.css` file in `./public`.

The server bundle is produced in `./dist` and is simply mock / dummy code,
but shows how the common shared resources can be utilized across client / server
bundles.

Terser to minify the server bundle is optionally enabled by in `./rollup.config.js` by setting
`s_MINIFY` to `true`.

There are two NPM scripts.
- `build` - Invokes Rollup to build the client and server bundles to `./public` and `./dist`.


- `serve` - Uses `http-server` to pop up a web server with the client bundles. By default this is set to localhost:8080.
  The index.html simply loads the iife script global version of the mock `foundry.js` that is accessible from the
  `foundry` namespace by all scripts. `test-script.js` logs to the console the keys of the script global foundry namespace.