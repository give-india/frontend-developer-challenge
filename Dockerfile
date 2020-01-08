FROM mhart/alpine-node
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY src/ src/
COPY public/ public/
COPY tsconfig.json tsconfig.json
RUN npm run build

COPY server.js server.js

EXPOSE 1234

CMD ["node", "server.js"]