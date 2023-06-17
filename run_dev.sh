docker build --no-cache -t brain-ring-button-image:latest .
docker rm -f brain-ring-button-container
docker run -d --name brain-ring-button-container -p 80:80 brain-ring-button-image
