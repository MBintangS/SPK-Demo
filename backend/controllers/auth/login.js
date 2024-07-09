const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../../models')

module.exports = async (req, res) => {
    const {email, password, roles} = req.body    

    if (!email || !password) {
        throw Error('All field must be filled')
    }

    const user = await User.findOne({ email })

    const dataUser = await User.findOne({email})

    if (!user) {
        return res.json(404, {
            status: false,
            message: 'Akun tidak ditemukan'
        })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        return res.json(404, {
            status: false,
            message: 'Password salah'
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: '3d' })
    
    return res.json(200, {
        status: true,
        data: {
            access_token: token,
            data: dataUser
        }
    });

}
