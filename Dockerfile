FROM node:10

# Create app directory
WORKDIR /usr/src/app

COPY ./eyulingo-web/package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8081 8082

CMD ["npm", "run serve"]