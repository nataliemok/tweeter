# Tweeter Project

A simple single-page AJAX-based Twitter clone that uses jQuery, HTML5 and plain ol' CSS3 to help web bootcamp students get comfortable with their front-end chops with those technologies.

## Technical Approach & Objectives

This project is starter (incomplete) code for students to fork and clone, located here.

The server is built with Node, Express and Mongo and allows users to request and submit tweets via a JSON end-point. The server/express code should not require any change from the student.

Students must work with and implement the HTML, CSS and client-side JS to bring this project to life.

## Final Product

The end result should look and function like this:

!["End Result"](https://d.pr/i/1eyEY/4MEH16BY+)

## Getting Started

1. Fork and clone your fork of this repository.
2. Install dependencies: `npm install` or `npm i` for short.
3. Create a `.env` file in the root of the project and add the following line to it:
  - `MONGODB_URI=mongodb://127.0.0.1:27017/tweeter`
4. Start the web server from the command line: `npm run local`
5. Open the app on <http://localhost:8080/> and make sure that it's loading.
6. Seed the mongodb with initial tweets: `npm run seed`.
7. Connect to your local mongo db using `mongo tweeter` and use `show collections` and `db.tweets.find().pretty()` to see the tweets in the database (this will be useful later).

## Dependencies & Troubleshooting

Dependencies:

- MongoDB
- Express
- Node 5.10.x or above

**This project assumes that:**

- It is running in our Vagrant machine (and therefore...)
- It is Running with Node 5.10.x or above
- `mongod` is up and running in the VM (you may have to start it up if connection fails). You can check if it is by using `ps aux | grep mongod` to see a list of processes that match `mongod`



