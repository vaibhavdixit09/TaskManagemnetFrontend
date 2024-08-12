FROM node:16-alpine

WORKDIR /task

COPY TaskManagemnetFrontend/package.json TaskManagemnetFrontend/package-lock.json ./

RUN npm install 

COPY TaskManagemnetFrontend/ ./

EXPOSE 8197

CMD ["npm","run", "dev"]
