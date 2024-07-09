
const {Student} = require('../../models')

module.exports = async (req, res) => {
    const data = await Student.find({}).select('nisn name').sort({createdAt: -1})

    return res.json(200, {
        status: 'success',
        data
    });
}