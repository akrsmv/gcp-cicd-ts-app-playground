# gcp-cicd-ts-app-playground

This is a test project! 
I imagined a demo app called <span style="color:orange">@gctapp</span>.

With this project I intend to warm up my react knowledge and also to get some GCP serverless experience. Also want to learn latest best practices around npm workspaces and monorepos 


How to use this monorepo project
---
download and install dependencies (`git clone ...` && `cd && npm install`)

`npm run web` Starts a regular react app in dev mode, default port `3000`

`npm run build && npm run api` Starts the express API used, at port `8080`

`npm run redis` NOTE: since data is being stored in Redis as time series, running the api is not enough, you need local redis


__EDIT__ for the thoughts around redis + firebase or redis + mongo etc.. _Redis Enterprise has a huge progress_, and now it is being used as a central event bus, in reactive micro service architectures. 
Basically you get all in one: (functionalities of Kafka and the app-synchronization of fire base or dynamodb, if you like), with litle maintanence and configuration

So I will focus only on it, ofcourse thinking of some cold storage/backups etc. Insipired by this talk: 

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/odhL_bP9XTQ/0.jpg)](https://www.youtube.com/watch?v=odhL_bP9XTQ)

## Test for deployment in GCP Cloud Run:

`docker compose up` Images are being prepared and tested locally, ~~pending is a test deployment in GCP~~

Example app context is: _Energy consumption optimization app._ 

TODOS amd milestones
(_Disclaimer:_ Im just starting with this, so milestones may change drasticly)

#### Basic CICD  

- Deployment of 2 images in Google Cloud Run
    - gctapp/web (react, served with nginx)
    - gctapp/api (express)
- CICD pipeline: Google actions + GCP Cloud Run

__update__:  There are Github worklfow actions for the `dev` branch (for now only), which, upon commits in respective places will trigger a redeployment of API/WEB

#### Project structure and tech stack

- pure npm monorepo (without lerna / nx)
- redis + Firebase (Maybe later), or ~~Tick Stack + Firebase~~, oor only ~~firebase~~? Or just Redis Enterprise in Google.
    - __DONE__~~I Reaaally wanna try out the Redis Time Series module~~
    - Research for a decent visualization library
    - curretnly looking at Nivo
- tests

__update__:  With Redis [Time Series](https://redis.io/docs/stack/timeseries/), I pull data from google storage and push them to redis time series (which is also a stream, but supports for real time downsampling, i.e aggregations, transformations etc). [Nivo](https://nivo.rocks/) looks great but for huge amount of data [requires more research](https://www.influxdata.com/blog/data-visualization-reactjs-nivo-influxdb/). On the other hand [Trading View lightweight charts](https://tradingview.github.io/lightweight-charts/tutorials/how_to/two-price-scales) behaves very well with litle sonfiguration

#### Data Preparation

- work 'offline' with some mock data. __DONE__~~Prepare Data generator~~
- webapp UX, visualizations of data in various views
- tests

__update__:  
[Basic documentation of endpoints](./Endpoints.md)
Created myself price and usage random data generator, not to have to upload files each time a new dev case is to be tested. `rebuildIndex` method can work wither by downloading data from GCS or via the test data generator. Currently opened up myself an admin endpoint to send data generation config:
```javascript
POST {{gct_api}}/admin/sampledata/generate
{
  "start": "2021/01/01",
  "end": "2023/03/04",
  "randValueKey": "price",
  "prefix": "prices",
  "randValueRange": [500,600],
  "additionalProps": {
    "currency": "BGN"
  },
  "tickStep": 3600000
}
```
Notes:
- you can omit `end` in which case it will always generate till current date
- for `start` you can provide a partial date, in which case it will start from 1st day/mnth, Eg:
    - `start: 2022-5` or `start: 2022/5` or `start: 2021`
- MAX 5 years of data generation allowed

#--

- implement SSE (server side events), for 
    - pushing any new price/usage data to clients
    - pushing any suggestions/notifications to clients
- Use [redis srtreams](https://redis.io/docs/data-types/streams/), and [redis Pub/Sub](https://redis.io/docs/manual/pubsub/) for event bus, and from where backend services will react and do analyses over new data

#### More Backend development

- Unblocked only after Redis Pub/Sub is ready, since we wanna do reactive architecture/ no service to service communication
- basic data analisis, ~~and endpoint exposing them as recomendations~~ And push notifications to clients
- Authentication (just basic integration with GCP Auth, no business roles etc)
- Multitenancy: Lets build a _Energy optimization SaaS_
- think of proper tenant data isolation strategy (silo, pooled, etc.)
- tests
