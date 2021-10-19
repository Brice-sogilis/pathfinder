FROM node:alpine as builder
WORKDIR /home
ADD ./ ./
RUN npm ci && \
    npm run build
FROM node:alpine as runner
WORKDIR /home
COPY --from=builder /home/build/ ./build/
ENTRYPOINT ["npx", "serve", "-s", "build"]