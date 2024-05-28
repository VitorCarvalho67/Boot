FROM node:latest

WORKDIR /server

COPY package*.json ./
RUN npm install 

COPY . .
RUN npx prisma generate

EXPOSE 3333
CMD ["npm","dev"]