FROM node:18

WORKDIR /app

COPY . .

RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

CMD ["pnpm", "start","dev"]
