const express = require("express");
const app = express();
const rootRouter = require('./routes/router');
const { PORT } = require("./config");
const cors = require('cors');

// Basic middleware like cors and body parser
app.use(cors());
app.use(express.json());

// Api versioning root folder v1, v2, v3, ...
app.use('/api/v1', rootRouter);

app.listen(PORT, () => {
    console.log(`Backend listening on PORT: ${PORT}`);
});