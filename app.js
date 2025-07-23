const express = require('express');
const app = express();

require('dotenv').config();
require("./db");

// Middleware para servir arquivos estáticos
app.use(express.static('.'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para servir uploads
app.use('/uploads', express.static('uploads'));

const imageRouter = require("./routes/image");
app.use("/images", imageRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Servidor está rodando na porta: ${port}`);
});