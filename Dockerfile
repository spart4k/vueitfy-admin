FROM node:18-alpine3.18
WORKDIR /usr/app
COPY package.json .
RUN npm install --quiet --legacy-peer-deps
COPY . .