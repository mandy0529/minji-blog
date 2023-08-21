# development
FROM node:18 as development
WORKDIR /app
COPY package.json ./
COPY ./prisma/ ./prisma
RUN yarn
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then yarn install; \
    else yarn install --only=production; \
    fi
COPY . .
EXPOSE 3333
CMD ["yarn", "start:dev"]

# production
FROM node:18 as production
WORKDIR /app
COPY package.json ./
COPY ./prisma/ ./prisma
RUN yarn
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then yarn install; \
    else yarn install --only=production; \
    fi
COPY . .
RUN yarn build
EXPOSE 3333
CMD ["yarn", "start:prod"]