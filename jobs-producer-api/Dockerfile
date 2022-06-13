FROM node:alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json /app
COPY yarn.lock /app
RUN yarn

# Bundle app source
COPY . /app
RUN yarn build

EXPOSE 80
CMD [ "node", "/app/src/index.js" ]