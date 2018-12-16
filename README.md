# thingy-client-red
Client using the thingy API.

## Environments
Before you begin, you need to decide if you want to run the API used by the
client on your system or if it's already hosted somewhere else.

For the former, you don't need to do anything at this point. For the latter,
you need to create an environment pointing to the API.
Create `src/environments/environment.hosted.ts` (see
`environment.hosted.ts.TEMPLATE`) in the same directory.
If the API uses TLS, make sure to use `wss://` instead of simply `ws://` for
the WebSocket URL.

## Getting started
There are two ways to run the client, either directly on your system or in a
Docker container.
### Native
0. Have the API running on your system or somewhere else
1. Install nodejs & npm
2. Install Angular CLI `npm install -g @angular/cli`
3. Run `npm install`
4. Run `ng serve` if the API is running on your system, or
   `ng serve --configuration=hosted` if it's somewhere else and you have set
   up the environment as described before.

### Docker
0. Have the API running on your system or somewhere else
1. Configure the environment as described above. For Docker you need to do
   this regardless of whether the API runs on your system or remotely. If it's
   on your system, simply use
   ```
   api: 'http://localhost:8000',
   ws: 'ws://localhost:8080'
   ```
2. Run `docker-compose up`

Navigate to `http://localhost:4200`
