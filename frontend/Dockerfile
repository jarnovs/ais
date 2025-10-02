FROM node:latest

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci 

COPY . .

ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}

RUN npm run build
