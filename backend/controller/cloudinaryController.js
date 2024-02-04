const User = require('../schama/userSchama')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dz5bezii1',
    api_key: '421291498356229',
    api_secret: '_IdWaEsO7X_Ca5fGA9-GOiNntoE'
})

const userCloudinary = async (req, res) => {
    try {
        const { name, email, password, gender, address } = req.body;
        const existuser = await User.findOne({ email });
        if (!existuser) {
            const file = req.files.image;
            const photo = await cloudinary.uploader.upload(file.tempFilePath)
            const data = User.create({ name, email, image: `${photo.url}`, password, gender, address });

            if (data && photo) {
                res.status(200).json({ message: "User Registretion Is Done Successfully" });
            } else {
                res.status(404).json({ message: "Registretion Failed" });
            };
        } else {
            res.status(400).json({ message: "This Email Id Already Exist So Please Use Other Email Id " });
        }

    } catch (error) {
        res.status(500).json({ error: error });
    }
}

module.exports = { userCloudinary };