# Build images
From **./grid-storage** :
## Service
```
docker build -t service:grid . 
```
## Test image
```
docker build -t grid:test -f ./test/Dockerfile .
```

# Run tests :
## Setup
Start by launching the test stack via docker-compose :
```
docker compose -f ./compose/compose-stak-test.yml up -d
```
## Run
+ From **./grid-storage**  with npm installed
    ```
    npm test
    ```
+ With the test image
    ```
    docker run -it grid:test
    ```
## Tear down
```
docker compose -f ./compose/compose-stak-test.yml down
```

