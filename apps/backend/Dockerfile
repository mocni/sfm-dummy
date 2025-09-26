FROM node:20.11.1-alpine3.19 AS base

FROM base as builder

RUN npm install --ignore-scripts -g pnpm@9.1.0

WORKDIR /app

COPY . .

RUN pnpm install:backend
RUN pnpm build:backend

RUN tar -cf outputs.tar ./.npmrc ./package.json ./pnpm-lock.yaml ./pnpm-workspace.yaml ./apps/backend/package.json ./packages/*/package.json ./apps/backend/dist/ ./packages/*/dist/

FROM base as prod-runtime

ENV NODE_ENV production

RUN npm install --ignore-scripts -g pnpm@9.1.0

WORKDIR /app

COPY --from=builder /app/outputs.tar ./
RUN tar -xf ./outputs.tar
RUN rm -f ./outputs.tar

RUN pnpm install:backend:prod


FROM base AS runner
ENV NODE_ENV production
WORKDIR /app

EXPOSE 3001

COPY --from=prod-runtime /app/ /app/

WORKDIR /app/apps/backend

CMD node dist/main
