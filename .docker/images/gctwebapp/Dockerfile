# Development image, no npm package publish/install
FROM node:18.14.2-alpine3.17 as build
WORKDIR /app
COPY . ./

## TODO check if npm ci can work with tsc if not globally installed and if so, remove the below `&& npm install -g typescript` 

# ensure clean before starting
RUN rm -fr packages/api/build packages/web/build node_modules

# WEB
#install only packages needed for web
RUN npm install -w @gctapp/web && npm install -g typescript 
## react prod build
RUN npm run build -w @gctapp/web

## API
# cleanup react needed packages from monorepo node_modules 
RUN rm -fr node_modules
# install monorepo API needed packages only
RUN npm install -w @gctapp/api && npm install -g typescript

RUN tsc --build packages/core packages/api/ --verbose \
          && mkdir packages/api/build \
          && cp -r -H node_modules packages/api/dist packages/api/build/ \
          && rm -fr packages/api/build/node_modules/@gctapp/* \
          && cp -r -L node_modules/@gctapp/core packages/api/build/node_modules/@gctapp/

FROM node:18.14.2-alpine3.17

WORKDIR /app

COPY --from=build /app/packages/api/build/ /app
COPY --from=build /app/packages/web/build/ /app/dist/public

EXPOSE 8080

CMD ["node", "./dist/index"]

