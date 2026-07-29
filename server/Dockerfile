FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY knexfile.ts ./
COPY migrations ./migrations
COPY assets ./assets
# knexfile + schema migrations import this at boot (tsx resolve .js → .ts)
COPY src/db-schema.ts ./src/db-schema.ts
EXPOSE 8080
CMD ["sh", "-c", "npx tsx node_modules/knex/bin/cli.js migrate:latest --knexfile knexfile.ts && node dist/index.js"]
