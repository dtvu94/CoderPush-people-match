FROM node:16.14.2 as dependencies
WORKDIR /app
COPY app/package.json app/package-lock.json ./
RUN npm install

FROM node:16.14.2 as builder
WORKDIR /app
COPY app ./
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build

FROM node:16.14.2 as production
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]