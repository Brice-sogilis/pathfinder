# Structure
+ **/frontend** A minimal REACT UI to edit 2D grids and draw path between to tiles.
+ **/backend/services** A persistence microservice for ascii grids.
    - **/grid-storage** a node server gRPC microservice exposing a CRUD API for ascii grids
    - **/gateway** a node server acting a a reverse proxy from http front request to gRPC servers
    - **/grpc** grpc hello-world (TO BE REMOVED SOON)
    - **/compose** docker compose stacks to debug locally, run ci tests or deploy the service along with it's related mongo database

# Build docker images
On windows (cmd): ```build_images.ps1```
On windows (powershell): ```build_images.cmd```
On linux : ```bash build_images.sh```

# Demonstration : Run the frontend/backend/db stack locally
+   Deploy : 
    ```
    docker compose -f ./compose-stack-local.yml up -d
    ```
    Website will be available in your browser at localhost:5000, backend rest api will be reachable at localhost:8888/grid, backend gRPC server at localhost:9999

+   Undeploy:
    ```
    docker compose -f ./compose-stack-local.yml down
    ```

