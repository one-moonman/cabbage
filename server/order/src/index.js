'use strict';
const http = require("http");
const url = require("url");
const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

const port = process.env.PORT || 3002;
const message = `[_ORDER_] 🗳 service listening at port:${port}`;

const client = new MongoClient(process.env.DATABASE_URL);

let orderCollection;
client.connect()
    .then(client => client.db('catalog'))
    .then(database => orderCollection = database.collection('orders'))
    .catch(err => console.error(err))


const server = http.createServer(async (req, res) => {
    try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        const reqUrl = url.parse(req.url).pathname;
        if (req.method === "POST" && reqUrl === "/api/v1/order") {
            const buffers = [];
            for await (const chunk of req) {
                buffers.push(chunk);
            }
            const body = Buffer.concat(buffers).toString();
            const doc = JSON.parse(body);
            const order = await orderCollection.insertOne(doc);
            const data = {
                ...doc,
                _id: order.insertedId
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({ status: 200, data }));
            res.end();
        } else {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify({ status: 404, message: `Cannot make request to ${reqUrl}` }));
            res.end()
        }
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ status: 404, message: error.message }));
        res.end();
    }
})

server.listen(port, () => console.warn(message));

