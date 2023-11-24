# ./Dockerfile
FROM node:18.18.2-alpine3.17 AS base
WORKDIR /usr/src/app
RUN apk update \ 
  && apk add bash \
  && rm -rf /var/cache/apk/*
COPY . . 
RUN npm ci
RUN npm run prisma-generate