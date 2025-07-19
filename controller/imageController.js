const Image = require('../models/Image');

exports.create = async (req, res) => {
    try {
        const {name} = req.body

        const file = req.file

        const image = new Image({
            name,
            src: file.path,
        });

        await image.save();
        res.json({ image, msg: "Imagem salva com sucesso!"})

    } catch (error) {
        res.status(500).json({message: "Erro ao salvar imagem."})
    }
};