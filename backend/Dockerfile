# syntax=docker/dockerfile:1.4
FROM node:18-alpine AS development

ENV CI=true
ENV PORT=5001

WORKDIR /code

COPY package*.json ./
RUN npm ci
COPY . .

EXPOSE 5001

CMD [ "node", "server.js" ]
