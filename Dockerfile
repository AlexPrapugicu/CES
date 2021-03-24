FROM node:10

WORKDIR /app

COPY package.json /app

COPY . /app

RUN npm -g config set user root 

RUN npm i -g 

CMD ces-cpp-component-definer --of /app/result.json --ftg /app/filesToGroup.txt


