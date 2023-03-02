FROM node:18.14.2-alpine
WORKDIR /basic-social-network
COPY ./package.json .
RUN npm i -g @nestjs/cli
RUN corepack enable
RUN pnpm i
COPY . .
CMD ["nest", "start"]
