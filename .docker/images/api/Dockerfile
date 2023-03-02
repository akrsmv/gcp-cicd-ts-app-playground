FROM node:18.14.2-alpine3.17
WORKDIR /app
COPY . ./
RUN npm run build:api
COPY --from=build /app/packages/api/dist/ /app/dist/
COPY --from=build /app/node_modules/ /app/node_modules/
COPY --from=build /app/packages/core/dist /app/node_modules/@gctapp/core/dist
COPY --from=build /app/packages/core/package.json /app/node_modules/@gctapp/core/package.json
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