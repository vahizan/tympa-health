# Main Container for Frontend Backend and Relational Database


## Docker instructions

### Frontend UI

- `run npm install then npm run build` in `./ui` directory (`tympa-health/ui`)
- create a .env file inside `./ui` directory and add the following variable:
````
REACT_APP_API_URL=http://localhost:6868
````
This .env file will only be utilised by the frontend app

### Backend UI

- Run `npm install` then `npm run build` in ./api directory (`tympa-health/api`)


### Root Directory

- Go into .env.sample
- Rename to .env 


### Docker
- Sign in to docker
- Have docker running in the background
- Go to project's root directory where `docker-compose.yml` lives
- Run`docker compose up` - docker will follow the instructions in the docker-compose.yml file and will set up all the containers up for you



## If all goes well

- Frontend app served on `CLIENT_ORIGIN (http://localhost:3000)`
- Backend app served on `CLIENT_API_BASE_URL (http://localhost:6868) `
- Mysql db served on `MYSQLDB_DOCKER_PORT (5432)`
