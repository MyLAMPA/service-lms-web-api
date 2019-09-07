
FROM node:10.15-slim

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY tsconfig.json /usr/src/app/
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
RUN npm install

# Bundle app source
COPY ./src /usr/src/app/src

EXPOSE 3000
CMD [ "npm", "start" ]
