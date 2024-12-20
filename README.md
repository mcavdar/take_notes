# take_notes

## steps

### install postgresql

install postgresql
```
sudo apt install postgresql
```

run Postgres interactive terminal
```
sudo su postgres
psql
```

create textdb database and add user privileges:
```
CREATE DATABASE textdb;
CREATE USER user WITH PASSWORD 'pass';
GRANT ALL PRIVILEGES ON DATABASE textdb to user;
exit
```

run Postgres interactive terminal for user
```
psql -U user textdb
```

create table
```
CREATE TABLE texts (
id SERIAL PRIMARY KEY,
content TEXT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
### install nvm & node

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc 
nvm install v20
```

### create project subfolders

```
mkdir take_notes
cd take_notes/
mkdir text-app
cd text-app/
npm init -y
npm install express pg cors
cd ..
npx create-react-app client
cd client/
npm install axios web-vitals
# update client/src/App.js
npm start
```

run in another shell:
```
#in another shell
cd ~/take_notes/text-app/
# add server.js file here
node server.js
```
