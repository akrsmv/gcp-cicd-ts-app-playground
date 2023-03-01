FROM node:18.14.2-alpine3.17 as build
WORKDIR /app
COPY . ./

# Local development image containing configuration for localhost API url
FROM fholzer/nginx-brotli:v1.12.2 as gctapp-web-dev
# test adding dev configuration
# ADD ./package.json ./

WORKDIR /etc/nginx
ADD _docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

FROM fholzer/nginx-brotli:v1.12.2 as gctapp-web-prod
WORKDIR /etc/nginx
ADD _docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]