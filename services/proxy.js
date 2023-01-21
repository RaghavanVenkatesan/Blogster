const httpProxy = require('http-proxy');
const proxy = httpProxy.createServer({});

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:3000/' })
})

router.get('/blogs', (req, res) => {
    proxy.web(req, res, { target: 'http://localhost:3000/blogs' })
});

module.exports = router;