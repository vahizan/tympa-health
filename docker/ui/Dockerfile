FROM node:20-buster as build

WORKDIR /ui

COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./.env

RUN npm ci --omit=dev
COPY . .

CMD ["npm","run","build"]

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /ui/build/web/public /usr/share/nginx/html

EXPOSE $REACT_DOCKER_PORT

ENTRYPOINT ["nginx", "-g", "daemon off;"]