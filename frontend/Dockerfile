# syntax=docker/dockerfile:1.4
FROM node:18-alpine as builder

ENV CI=true
ENV PORT=5173
# Build-time envs for Vite should be provided via .env files or build args.

WORKDIR /code

COPY . .

RUN npm ci

RUN npm run build

FROM nginx:1.25-alpine as production

ENV NODE_ENV production

COPY --from=builder /code/dist /usr/share/nginx/html

COPY /ngnix/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
