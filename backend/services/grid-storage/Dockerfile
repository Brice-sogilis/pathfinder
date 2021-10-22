#Expects the pb/directory to be already a valid grpc build as the protoc compiler doe not seem to work on this version of node
FROM node:alpine as builder
WORKDIR /home
ADD . .
RUN npm ci && \
    npm run compile

FROM node:alpine as runner
WORKDIR /home
COPY --from=builder /home/build/ ./build/
COPY --from=builder /home/node_modules/ ./node_modules/
ENTRYPOINT ["node", "build/main.js"]