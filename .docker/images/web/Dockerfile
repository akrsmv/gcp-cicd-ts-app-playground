FROM node:18.14.2-alpine3.17 as build
WORKDIR /app
ARG REACT_APP_GCT_ENV
ENV REACT_APP_GCT_ENV=$REACT_APP_GCT_ENV
COPY . ./
# WEB
#install only packages needed for web
RUN npm install -w @gctapp/web && npm install -g typescript 
## react prod build
RUN npm run build -w @gctapp/web

# Local development image containing configuration for localhost API url
FROM fholzer/nginx-brotli:v1.12.2
WORKDIR /etc/nginx
COPY --from=build /app/.docker/images/web/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/packages/web/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
