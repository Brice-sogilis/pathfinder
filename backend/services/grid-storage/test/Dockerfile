FROM node:bullseye
WORKDIR /home/service
ADD . ./

RUN npm ci
ENTRYPOINT ["env", "DB_HOSTNAME_TEST=mongo", "DB_PORT_TEST=27017", "npm", "test"]
