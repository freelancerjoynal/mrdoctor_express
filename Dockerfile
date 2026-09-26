# Express API — production image
FROM node:20-alpine AS base
WORKDIR /app

# ---- deps ----
FROM base AS deps
COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./
RUN npm ci

# ---- build ----
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Generate Prisma Client + compile TypeScript (tsconfig outDir: ./dist)
RUN npx prisma generate && npx tsc -p tsconfig.json

# ---- production ----
FROM base AS production
ENV NODE_ENV=production
COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./
RUN npm ci --omit=dev && npx prisma generate && npm cache clean --force
COPY --from=build /app/dist ./dist
# Chatbot reply script (JSON loaded at runtime via createRequire; tsc emits under dist/src)
COPY --from=build /app/src/whatsappChatbot/flows/getDoctor/for-doctor-only.json ./dist/src/whatsappChatbot/flows/getDoctor/for-doctor-only.json
# Prisma needs the schema at runtime for migrate deploy
EXPOSE 8000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
