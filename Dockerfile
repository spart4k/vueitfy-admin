FROM node:18-alpine3.18
WORKDIR /usr/app
COPY package.json .
COPY . .
RUN npm install --quiet --legacy-peer-deps
RUN npm install vue-template-compiler@2.6.14 --force
RUN npm run build
# COPY . .