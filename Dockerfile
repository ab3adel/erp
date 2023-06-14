FROM node:16
  
WORKDIR /app

COPY package.json package-lock.json /app/

#RUN npm install --force
RUN npm install --legacy-peer-deps

COPY . /app

CMD ["npm", "run", "dev"]
