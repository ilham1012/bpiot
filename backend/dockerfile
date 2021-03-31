FROM node:lts-alpine
ENV NODE_ENV=development
WORKDIR /code
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --development -g
EXPOSE 5000
COPY . .
CMD ["npm", "run", "dev"]