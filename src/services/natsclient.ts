import { connect, NatsConnection } from "nats"

class NatsClient {
  private nc!: NatsConnection

  async connect(natsUrl='nats://localhost:4222') {
    if (natsUrl == undefined) {
      natsUrl = 'nats://localhost:4222'
    }
    this.nc = await connect({ servers: natsUrl })
  }

  public async ping() {
    // nats reply test.ping '{\"message\": \"pong from nats\"}'
    const reply = await this.nc.request("test.ping")
    return reply.json()
  }
}

const client = new NatsClient()

export function useNatsClient() {
  return client
}