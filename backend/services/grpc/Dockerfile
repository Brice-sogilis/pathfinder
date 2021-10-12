FROM ubuntu:latest

WORKDIR /home/grpc

RUN apt-get update && apt-get install -y g++ bash git curl cmake && \
    git clone https://github.com/grpc/grpc-node.git && cd grpc-node/packages/grpc-tools && \
    bash ./build_binaries.sh