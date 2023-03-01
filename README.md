# gcp-cicd-ts-app-playground

This is a test project! 
I imagined a demo app called <span style="color:orange">@gctapp</span>.

With this project I intend to warm up my react knowledge and also to get some GCP serverless experience. Also want to learn latest best practices around npm workspaces and monorepos 


How to run the project
---
`git clone`
`cd && npm install`

`npm run web` starts a regular react app in dev mode, default port `3000`

`npm run api` starts the express api at port `7000`

`npm run redis` (this spins a docker redis container)

## preparation for deployment in GCP Cloud Run:

`docker compose up`

Images are being prepared and tested locally, pending is a test deployment in GCP 

TLDR:

Example app context is: _Energy consumption optimization app._ 

TODOS amd milestones
(_Disclaimer:_ Im just starting with this, so milestones may change drasticly)

#--

- Deployment of 2 images in Google Cloud Run
    - gctapp/web (react, served with nginx)
    - gctapp/api (express)
- CICD pipeline: Google actions + GCP Cloud Build

#--

- redis + Firebase, or Tick Stack + Firebase, oor only firebase? Or just Redis Enterprise in Google.
    - I Reaaally wanna try out the Redis Time Series module
    - Research for a decent visualization library
    - curretnly looking at Nivo
- tests

#--

- work 'offline' with some mock data. Prepare Data generator
- webapp UX, visualizations of data in various views
- tests

#--

- basic data analisis, and endpoint exposing them as recomendations 
- Authentication (just basic integration with GCP Auth, no business roles etc)
- Multitenancy: Lets build a _Energy optimization SaaS_
- think of proper tenant data isolation strategy (silo, pooled, etc.)
- tests
