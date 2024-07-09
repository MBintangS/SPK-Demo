const app = require('express');
const router = app.Router();
const {student} = require('../../controllers')

router.get('/', student.getStudents);
router.get('/:id', student.getStudentByID);
router.post('/', student.store);
router.put('/:id', student.update);
router.delete('/:id', student.destroy);

module.exports = router;