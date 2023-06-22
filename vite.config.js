import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    jsxFactory: 'h',
    jsxInject: `import h from 'hyperapp-jsx-pragma'`
  },
  build: {
    lib: {
      entry: './lib/main.js',
      name: 'Counter',
      fileName: 'counter'
    }
  }
})