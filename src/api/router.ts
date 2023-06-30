// @deno-types="npm:@types/express@^4"
import express from 'express'
import { useNatsClient } from '../services/natsclient.ts'

export const apiRouter = express.Router()
apiRouter.use(express.json())
const natsClient = useNatsClient()

apiRouter.get('/ping', async (_, res) => {
  //return res.status(200).send({'message': `pong @ ${new Date()}`})
  const response = await natsClient.ping()
  return res.status(200).send(response)
})