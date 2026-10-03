import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: '../engine/docs/swagger.json',
  output: 'src/lib/api',
  plugins: [
    '@hey-api/typescript',
    '@hey-api/client-fetch',
    { name: '@hey-api/sdk', validator: true },
    'zod',
  ],
})