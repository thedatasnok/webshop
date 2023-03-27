# Note: This Dockerfile is meant to be run with the root of the repository as context

FROM node:lts-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

# Root workspace
COPY package.json .
COPY pnpm-*.yaml .

# App & internal packages
COPY apps/dashboard/package.json ./apps/dashboard/
COPY packages/ui/package.json ./packages/ui/
COPY packages/contracts/package.json ./packages/contracts/

# Install dependencies
RUN pnpm install

# Copy source code
COPY apps/dashboard/ ./apps/dashboard/
COPY packages/ui/ ./packages/ui/
COPY packages/contracts/ ./packages/contracts/

WORKDIR /app/apps/dashboard

RUN pnpm install
RUN pnpm run build

FROM nginx:alpine AS runner 

COPY --from=builder /app/apps/dashboard/dist/ /usr/share/nginx/html
COPY config/nginx.conf /etc/nginx/conf.d/default.conf

LABEL org.opencontainers.image.source="https://github.com/thedatasnok/webshop"
LABEL org.opencontainers.image.description="Webshop dashboard frontend"
LABEL org.opencontainers.image.licenses="MIT"
