import { client } from '@/lib/api/client.gen'

client.setConfig({
  baseUrl: process.env.API_URL ?? 'http://localhost:9136',
  throwOnError: true,
})