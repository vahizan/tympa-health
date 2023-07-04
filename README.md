# Main Container for Frontend Backend and Relational Database


## Docker instructions

- `run npm install and npm run build` while in ui directory (`tympa-health/ui`)
- `run npm install and npm run build` while in api directory (`tympa-health/api`)
- sign in to docker
- have docker running in the background
- go into .env.sample
- rename file to .env 
- go back to root directory where `docker-compose.yml` lives
`docker compose up` - docker will follow the instructions in the docker-compose.yml file and will set up all the containers up for you

## If all goes well

- Frontend app served on `CLIENT_ORIGIN (http://localhost:3000)`
- Backend app served on `CLIENT_API_BASE_URL (http://localhost:6868) `
- Mysql db served on `MYSQLDB_DOCKER_PORT (5432)`
