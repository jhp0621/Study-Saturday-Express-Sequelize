const router = require('express').Router();
const Test = require('../db/models/test')
const Student = require('../db/models/student')

module.exports = router;


router.get('/', async (req, res, next) => {
    try {
        const allTests = await Test.findAll()
        res.status(200).send(allTests)
    } catch(error) { next(error) }
})

router.get('/:id', async (req, res, next) => {
    try {
        const test = await Test.findById(req.params.id)
        res.status(200).send(test)
    } catch(error) { next(error) }
})

router.post('/student/:studentId', async (req, res, next) => {
    try {
        const newTest = await Test.findOrCreate({
            where: {
                subject: req.body.subject,
                grade: req.body.grade,
                studentId: req.params.studentId
            }
        })
        res.status(201).send(newTest[0])
    } catch(error) { next(error) }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const test = await Test.findById(req.params.id);
        test.destroy();
        res.status(204).send(null)
    } catch(error) { next(error) }
})