FROM node:18.14.2-alpine3.17 as build
WORKDIR /app
COPY . ./
# building outside of docker for now, how github action cache the node_modules if in docker?
# RUN npm run web:prodbuild

# Local development image containing configuration for localhost API url
FROM fholzer/nginx-brotli:v1.12.2
WORKDIR /etc/nginx
COPY --from=build /app/.docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
