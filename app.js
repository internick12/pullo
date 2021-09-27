const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
const port = process.env.PORT;

app.use( express.static(path.join(__dirname, 'public')) );


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/404.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

