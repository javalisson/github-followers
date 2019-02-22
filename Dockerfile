# base stage
FROM node:8-alpine as base
WORKDIR /app
COPY package*.json ./
RUN npm install -g @vue/cli @vue/cli-service-global
RUN npm install
EXPOSE 8080

# build stage
FROM base as build
WORKDIR /app
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;"]
