const router = require("express").Router();
const Student = require("../db/models/student");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.status(200).send(students);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      res.status(200).send(student);
    } else {
      res.status(404).send('Student not found')
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).send(student);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    const updated = await student.update(req.body, {
        returning: true,
        plain: true
    });
    res.status(200).send(updated);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    await student.destroy();
    // await Student.destroy({where: id: req.params.id})
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
