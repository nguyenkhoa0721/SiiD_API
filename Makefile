dev: down
	docker-compose -p nmcnpm -f ./docker/docker-compose.yml up -d

######################################################################

down:
	-docker-compose -p nmcnpm -f ./docker/docker-compose.yml down 

