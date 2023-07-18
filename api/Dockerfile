# Base image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn

# Copy source code
COPY . .

# Set environment variables
ENV DATABASE_URL postgresql://mandy:rlaalswl12!@localhost:5432/minji_blog?schema=public
ENV JWT_ACCESS_SECRET os4O91fJW8WzpBkbrQqpcNHdBTMEL4C6
ENV JWT_REFRESH_SECRET QMBWfeav1LBowrAiipRNfLpGUFyTvOIx

# Expose the port
EXPOSE $PORT

# Start the Nest.js application
CMD ["yarn", "start"]