# Best use of purpose image of Node
FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

# Running on 3000 port by default
EXPOSE 3000

# Start the application in development mode
CMD ["yarn", "dev"]
