const express = require('express');
const app = express();
const PORT = 3000;

let cases = [];
let nextCaseId = 1;
app.use(express.json());

app.get('/', (req, res) => {
	res.send('testing testing');
});



module.exports = app;

