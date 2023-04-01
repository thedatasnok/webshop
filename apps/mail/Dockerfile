# Note: This Dockerfile is meant to be run with the root of the repository as context

FROM node:lts-alpine AS runner

WORKDIR /app

RUN npm install -g pnpm

# Root workspace
COPY package.json .
COPY pnpm-*.yaml .

# App & internal packages
COPY apps/mail/package.json ./apps/mail/
COPY packages/ui/package.json ./packages/ui/
COPY packages/contracts/package.json ./packages/contracts/

# Install dependencies
RUN pnpm install

# Copy source code
COPY apps/mail/ ./apps/mail/
COPY packages/ui/ ./packages/ui/
COPY packages/contracts/ ./packages/contracts/

WORKDIR /app/apps/mail

RUN pnpm install
RUN pnpm run build

CMD ["pnpm", "start:prod"]