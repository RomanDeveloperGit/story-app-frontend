image:
	docker build -t story-app-frontend-image .

container:
	docker run -d -p 80:80 --rm --name story-app-frontend-container story-app-frontend-image

stop-container:
	docker stop story-app-frontend-container
