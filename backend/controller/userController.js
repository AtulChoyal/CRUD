const User = require('../schama/userSchama')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dz5bezii1',
    api_key: '421291498356229',
    api_secret: '_IdWaEsO7X_Ca5fGA9-GOiNntoE'
})

const userRegister = async (req, res) => {
    try {
        // const { name, email, password, gender, address } = req.body;
        // console.log(req.body)
        // if (req.body) {
        //     res.status(200).json({ message: "User Registretion Is Done Successfully" });
        // }
        // else {
        //     res.status(404).json({ message: "Registretion Failed" });
        // };
        const { name, email, password, gender, address } = req.body;
        const existuser = await User.findOne({ email });
        if (!existuser) {
            const file = req.files.image;
            const photo = await cloudinary.uploader.upload(file.tempFilePath)
            const data = User.create({ name, email, image: `${photo.url}`, password, gender, address });
            if (data && photo) {
                res.status(200).json({ message: "User Registretion Is Done Successfully" });
            }
            else if (!photo) {
                res.status(404).json({ message: "Image Data Failed" });
            } else if (!data) {
                res.status(404).json({ message: "Text data Failed" });
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

const userGetAll = async (req, res) => {
    try {
        const userdata = await User.find();
        if (userdata) {
            res.status(200).json({
                userdata,
                message: "User Get All Data is Done"
            })
        }
        else {
            res.status(404).json({ message: "Get All Data is Fail" });
        }

    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const userdata = await User.findOne({ email });
    let userPW;
    // console.log(userdata); console.log(userPW); console.log(password);
    if (userdata) { userPW = userdata.password };

    if (userdata && (userPW === password)) {
        res.status(200).json({
            data: userdata,
            message: "User Login Is Done Successfully"
        });
    } else if (userdata) {
        res.status(404).json({ message: "Wrong Password " });
    } else {
        res.status(404).json({ message: "Email or Password Not Match" });
    };
}

const userUpdate = async (req, res) => {
    try {
        const id = req.params.id;
        const userRecod = await User.findById(id);
        if (!userRecod) {
            return res.status(404).json({ message: "User Is Not Found" });
        } else {
            if (userRecod.image === req.body.image) {
                // id :- id to data; 
                // req.body :- data get(lane) karne keliye;  
                //{new;true} :- new data return karne k
                const updateData = await User.findByIdAndUpdate(id, req.body, { new: true });
                res.status(200).json({ message: "Data Is Updated successfully" });
            } else {
                const imgDetail = userRecod.image
                const imgArray = imgDetail.split('/')
                const imgFullName = imgArray[imgArray.length - 1]
                const imgName = imgFullName.split('.')[0]
                const imgDelete = await cloudinary.uploader.destroy(imgName)
                if (imgDelete) {
                    const file = req.files.image;
                    const photo = await cloudinary.uploader.upload(file.tempFilePath)
                    req.body.image = photo.url
                    const updateData = await User.findByIdAndUpdate(id, req.body, { new: true });
                    if (updateData) {
                        res.status(200).json({ message: "Data Is Updated successfully" });
                    }
                } else {
                    return res.status(404).json({ message: "Error-Image is not delete in cloudinary" });
                }
            }
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

const userDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const dataUser = await User.findById(id);
        const imgDetail = dataUser.image
        const imgArray = imgDetail.split('/')
        const imgFullName = imgArray[imgArray.length - 1]
        const imgName = imgFullName.split('.')[0]
        if (!dataUser) {
            return res.status(404).json({ message: "User Data Is Not Found" });
        } else {
            const userDel = await User.findByIdAndDelete(id);
            if (userDel) {
                const imgDelete = await cloudinary.uploader.destroy(imgName)
                if (imgDelete) {
                    res.status(200).json({ message: "User Data Is Deleted successfully" });
                }
            }
        }
    } catch (error) {
        res.status(500).json({ error: error });
    };
};

module.exports = { userRegister, userLogin, userUpdate, userDelete, userGetAll };

// const userRegister = async (req, res) => {
//     // const { name, email, image, password, gender, address } = req.body;
//     const userSave = new User(req.body);
//     const em = userSave.email;

//     // const existuser = await User.findOne({ email });
//     const existuser = await User.findOne({ email: em });


//     if (!existuser) {
//         // const data = User.create({ name, email, image, password, gender, address });
//         const data = await userSave.save();
//         if (data) {
//             // res.status(201).json({
//             // regitretion: "successfully complited",
//             // name: name,
//             // email: email,
//             // image: image,
//             // password: password,
//             // gender: gender,
//             // address: address});
//             res.status(200).json({ message: "User Registretion Is Done Successfully" });
//         } else {
//             res.status(404).json({ message: "Registretion Failed" });
//         };
//     } else {
//         res.status(400).json({ message: "This Email Id Already Exist So Please Use Other Email Id " });
//         // throw new Error('user already exist')
//     }
// }