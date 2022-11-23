## base image
FROM node:16.13.0-alpine as compile-image

## install global packages
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
RUN npm install npm@latest -g
RUN npm install pnpm react-scripts@3.3.0 -g

## set working directory & give permissions to user `node`
RUN mkdir -p /usr/src/app && chown node:node /usr/src/app
WORKDIR /usr/src/app

## switch to non-root user & install dependencies
USER node
COPY package*.json /usr/src/app/
COPY pnpm-lock.yaml /usr/src/app/pnpm-lock.yaml
ENV PATH /usr/src/app/node_modules/.bin:$PATH
ENV PATH=$PATH:/home/node/.npm-global/bin
RUN pnpm install

## set environment to production, overwrite
## with docker-compose
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

## create build
COPY . /usr/src/app
RUN pnpm run build

## runtime image
FROM nginx:1.15.9-alpine

## update nginx conf with custom config
# RUN rm -rf /etc/nginx/conf.d
# COPY conf /etc/nginx

## copy static files
COPY --from=compile-image /usr/src/app/build /usr/share/nginx/html

## expose port
EXPOSE 80

## run nginx
CMD ["nginx", "-g", "daemon off;"]
