# Jobs-Api Project
This is a recreational project to practice and learn Typescript <br><br>
In this project we're fetching jobs open for multiple companies, positions, and countries. <br>
We have two apps in this repo - the apps are independent and only share the database <br>
I'm using the free mongo atlas cluster for this app.
<ol>
<li>jobs-producer-api: responsible for fetching data from the 3rd api in a continuous matter - requests are spaced not to hit rate limit</li>
<li>jobs-backend: where we have access to our data consolidated by the jobs-producer-api</li>
</ol>

## To make it work, first
Create a .env file inside each of the two projects: <br>
Needed .env variables are:
<ul>
    <li>TOKEN_SECRET</li>
    <li>APP_ID</li>
    <li>API_KEY</li>
    <li>DB_CONN_STRING</li>
    <li>DB_NAME</li>
    <li>COLLECTION_NAME</li>
    <li>PORT</li>
</ul>

### Then, to run it with Docker
Set up your docker environment. Install it if you don't have it yet installed.
<br>
After that you can run the app going inside the app you want to run and running: <br>
<code>
docker-compose up
</code>
<br>
If you want to run it locally make sure you have yarn installed, you can install it with:
<br>
<code>
npm install yarn
</code>
<br>
Then, to make the app run you can run the following commands in your terminal inside the app you want to run:
<br>
<code>
yarn

# to run jobs-producer-api
cd jobs-producer-api
yarn dev
# to run jobs-pbackend
cd jobs-backend
yarn dev
</code>
<br>
### Credits:
By Mateus S. Leao 