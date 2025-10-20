# ---------- Etapa 1: Build ----------
FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache python3 make g++ libc6-compat

COPY package*.json ./
RUN npm ci || npm install

COPY . .
RUN npm run build


# ---------- Etapa 2: Runtime ----------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

RUN npm ci --omit=dev || npm install --omit=dev

EXPOSE 3000
CMD ["npm", "start"]
