FROM node:alpine as builder
WORKDIR /home
ADD . .
RUN npm ci && \
    npx tsc

FROM node:alpine as runner
WORKDIR /home
COPY --from=builder /home/build/ ./build/
COPY --from=builder /home/node_modules/ ./node_modules/
ENTRYPOINT ["node", "build/service.js"]