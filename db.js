const mongoose = require('mongoose');

require('dotenv').config();

async function main() {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.v0zufwc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);

    console.log("Conectado com sucesso!");
}

main().catch((err) => console.log(err));

module.exports = main;