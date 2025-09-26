# Base
FROM node:20.11.1-alpine3.19 AS base

# Installer
FROM base as builder

WORKDIR /app

RUN npm install --ignore-scripts -g pnpm@9.1.0

COPY . .
# RUN ls -la
RUN pnpm install:frontend
RUN pnpm build:frontend


# Serve Angular app with Nginx
FROM nginx:alpine
COPY apps/frontend/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/apps/frontend/dist/frontend/browser /usr/share/nginx/html
EXPOSE 80
