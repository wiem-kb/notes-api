FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
 
FROM base AS test
RUN npm ci
COPY src ./src
COPY tests ./tests
RUN npm test
 
FROM base AS production
ENV NODE_ENV=production
RUN npm ci --omit=dev
COPY src ./src
EXPOSE 3000
CMD ["node", "src/server.js"]
