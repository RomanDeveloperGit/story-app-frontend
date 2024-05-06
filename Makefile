build-image:
	docker build -t story-app-frontend-image .

run-container:
	docker run -d -e BACKEND_BASE_URL=http://backend.com:8080/api -p 80:80 --rm --name story-app-frontend-container story-app-frontend-image

remove-image:
	docker rmi story-app-frontend-image

remove-container:
	docker rm -f story-app-frontend-container


create:
	make build-image
	make run-container

delete:
	make remove-container
	make remove-image

reload:
	make delete
	make create
