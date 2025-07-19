const express = require('express');
const app = express();

require('dotenv').config();
require("./db");

const imageRouter = require("./routes/image");
app.use("/images", imageRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Servidor está rodando na porta: ${port}`);
});