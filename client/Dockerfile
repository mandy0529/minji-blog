# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN yarn

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then yarn install; \
    else yarn install --only=production; \
    fi

# Copy source code
COPY . .

# Expose the port
EXPOSE 3000

# Start the Nest.js application
CMD ["yarn", "dev"]