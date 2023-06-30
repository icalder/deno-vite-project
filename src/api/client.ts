export class ApiClient {
  constructor(private url: string) {
  }

  public async ping(): Promise<{'message': string}> {
    const response = await fetch(`${this.url}/api/ping`, {
      headers: {'accept': 'application/json',}
    })
    const data: {'message': string} = await response.json()
    if (response.ok) {
      return data
    }
    throw new Error(await response.text())
  }
}

const client = new ApiClient(import.meta.env.SSR ? 'http://localhost:5173' : '')

export function useApiClient() {
  return client
}