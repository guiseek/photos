import { defineConfig } from 'vite'

export default defineConfig({
  base: '/photos/',
  esbuild: {
    jsxInject: `import { h, Fragment } from '/src/core'`
  },
})