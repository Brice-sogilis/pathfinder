FROM node:bullseye as builder
WORKDIR /home
ADD ./ ./
RUN npm ci && \
    npm run build
FROM node:bullseye as runner
WORKDIR /home
COPY --from=builder /home/build/ ./build/
ENTRYPOINT ["npx", "serve", "-s", "build"]