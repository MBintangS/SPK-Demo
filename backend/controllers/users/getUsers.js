
const {User} = require('../../models')

module.exports = async (req, res) => {

    const data = await User.find({}).select('email').sort({createdAt: -1})
    return res.json(200, {
        status: 'success',
        data
    });
}