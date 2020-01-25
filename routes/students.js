const router = require('express').Router();
const Student = require('../db/models/student')
module.exports = router;


router.get('/', async (req, res, next) => {
    try {
        const students = await Student.findAll()
        res.status(200).send(students)
    } catch(error) { next(error) }
} )


router.get('/:id', async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id)
        if (student) {
            res.status(200).send(student)
        } else {
            res.sendStatus(404)
        }
    } catch(error) { next(error) }
} )


router.post('/', async (req, res, next) => {
    try {
        const newStudent = await Student.findOrCreate({
            where: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            }
        })
        res.status(201).send(newStudent[0])
    } catch(error) { next(error) }
})


router.put('/:id', async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id)
        student.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        })
        res.status(200).send(student)
    } catch(error) { next(error) }
} )

router.delete('/:id', async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id)
        await student.destroy()
        res.status(204).send(null)
    } catch(error) { next(error) }
} )
