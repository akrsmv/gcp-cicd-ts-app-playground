FROM node:18.14.2-alpine3.17 as build

WORKDIR /app
COPY . ./

# ensure clean before starting
RUN rm -fr packages/api/build

RUN npm install -w @gctapp/api && npm install -g typescript
RUN tsc --build packages/core packages/api/ --verbose \
          && mkdir packages/api/build \
          && cp -r -H node_modules packages/api/dist packages/api/build/ \
          && rm -fr packages/api/build/node_modules/@gctapp/* \
          && cp -r -L node_modules/@gctapp/core packages/api/build/node_modules/@gctapp/


FROM node:18.14.2-alpine3.17

WORKDIR /app
COPY --from=build /app/packages/api/build/ /app
EXPOSE 7000
CMD ["node", "./dist/index"]





# FROM node:18.14.2-alpine3.17 as build
# WORKDIR /app
# COPY . ./

## Local development image 
# node_modules copied instead of 'npm ci'
# FROM node:18.14.2-alpine3.17 as gctapp-api-dev
# WORKDIR /app
# COPY --from=build /app/packages/api/dist/ /app/dist/
# COPY --from=build /app/node_modules/ /app/node_modules/
# COPY --from=build /app/packages/core/dist /app/node_modules/@gctapp/core/dist
# COPY --from=build /app/packages/core/package.json /app/node_modules/@gctapp/core/package.json
# CMD ["node", "./dist/index"]


# FROM node:18.14.2-alpine3.17 as gctapp-api-prod
# WORKDIR /app
# COPY --from=build /app/dist/ /app/dist/
# #-- TODO 'npm ci' instead of the below
# COPY --from=build /app/node_modules/ /app/node_modules/
# COPY --from=build /app/packages/core/dist /app/node_modules/@gctapp/core/dist
# COPY --from=build /app/packages/core/package.json /app/node_modules/@gctapp/core/package.json
# #--
# CMD ["node", "./dist/index"]