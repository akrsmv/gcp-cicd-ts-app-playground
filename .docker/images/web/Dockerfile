FROM node:18.14.2-alpine3.17 as build
WORKDIR /app
COPY . ./
RUN npm run web:prodbuild

# Local development image containing configuration for localhost API url
FROM fholzer/nginx-brotli:v1.12.2
WORKDIR /etc/nginx
COPY --from=build /app/.docker/images/web/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/packages/web/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
