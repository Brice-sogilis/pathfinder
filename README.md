# Structure
+ **/frontend** A minimal REACT UI to edit 2D grids and draw path between to tiles.
+ **/backend/services** A persistence microservice for ascii grids.
    - **/grid-storage** a node server microservice exposing aCRUD API for ascii grids
    - **/grpc** microservice grpc definition and generated code (COMING SOON)
    - **/compose** docker compose stacks to debug locally, run ci tests or deploy the service along with it's related mongo database
# Build docker images
On windows : ```build_images.ps1```
On linux : ```bash build_images.sh```
# Run the frontend/backend/db stack locally
+   Deploy : 
    ```
    docker compose -f ./compose-stack-local.yml up -d
    ```
    Website will be available in your brower at localhost:5000, backend api will be reachable at localhost:8888/grid

+   Undeploy:
    ```
    docker compose -f ./compose-stack-local.yml down
    ```

