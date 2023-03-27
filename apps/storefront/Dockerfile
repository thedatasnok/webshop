# Note: This Dockerfile is meant to be run with the root of the repository as context

FROM node:lts-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

# Root workspace
COPY package.json .
COPY pnpm-*.yaml .

# App & internal packages
COPY apps/storefront/package.json ./apps/storefront/
COPY packages/ui/package.json ./packages/ui/
COPY packages/contracts/package.json ./packages/contracts/

# Install dependencies
RUN pnpm install

# Copy source code
COPY apps/storefront/ ./apps/storefront/
COPY packages/ui/ ./packages/ui/
COPY packages/contracts/ ./packages/contracts/

WORKDIR /app/apps/storefront

RUN pnpm install
RUN pnpm run build

FROM nginx:alpine AS runner 

COPY --from=builder /app/apps/storefront/dist/ /usr/share/nginx/html
COPY config/nginx.conf /etc/nginx/conf.d/default.conf

LABEL org.opencontainers.image.source="https://github.com/thedatasnok/webshop"
LABEL org.opencontainers.image.description="Webshop store frontend"
LABEL org.opencontainers.image.licenses="MIT"
