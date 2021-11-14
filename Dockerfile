FROM node:16

#Define working directory
WORKDIR /usr/app

#Copy and install dependency
COPY --chown=node package*.json ./
RUN npm install

#Copy app source
COPY . .

EXPOSE 3000
CMD ["npm", "run", "start:dev"]