# z-prefix-crud-app

1. Must have docker running and a postgres image downloaded.
2. run the following commands in the myapp-backend project directory
    - npm init -y
    - npm install express cors knex pg
3. run the database through a containerized postgres image
    - docker run --rm --name myapp-postgres -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres
    - docker exec -it myapp-postgres psql -U postgres
4. install nodemon globally from root project directory
    - sudo npm install -g nodemon
5. migrate, seed, and start database server through backend directory
    - npx knex migrate:latest
    - npx knex seed:run
    - npm start
6. run the following in the myapp-frontend directory
    - npm init -y
    - npm install react-router-dom @mui/material @emotion/react @emotion/styled @mui/icons-material
    - npm start
7. The username for all authorized users is "firstnamelastname" all lowercase. An example is 'stevejobs'. The password for all authorized users is 'password'.