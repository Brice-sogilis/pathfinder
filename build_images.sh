cd frontend && docker build -t service:front .
cd ../backend/services/grid-storage && docker build -t service:grid .
docker build -t grid:test -f test/Dockerfile .
cd ../../..