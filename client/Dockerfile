# development
FROM node:18 as development
WORKDIR /app
COPY package.json ./
RUN yarn
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then yarn install; \
    else yarn install --only=production; \
    fi
COPY . .
EXPOSE 3000
CMD ["yarn", "dev"]

# production
FROM node:18 as production
WORKDIR /app

COPY package.json ./
RUN yarn
ARG NODE_ENV

ENV NEXT_PUBLIC_JWT_SECRET=os4O91fJW8WzpBkbrQqpcNHdBTMEL4C6
ENV NEXT_PUBLIC_BASE_URL=http://128.199.78.50

RUN if [ "$NODE_ENV" = "development" ]; \
    then yarn install; \
    else yarn install --only=production; \
    fi
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]