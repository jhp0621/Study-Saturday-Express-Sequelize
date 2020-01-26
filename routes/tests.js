const router = require("express").Router();
const Test = require("../db/models/test");
const Student = require("../db/models/student");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const allTests = await Test.findAll();
    res.status(200).send(allTests);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const test = await Test.findById(req.params.id);
    if (test) res.status(200).send(test);
    res.status(404).send("Test not");
  } catch (error) {
    next(error);
  }
});

router.post("/student/:studentId", async (req, res, next) => {
  try {
    let student = await Student.findById(req.params.studentId);
    let test = await Test.create(req.body);
    let studentTest = await test.setStudent(student);
    res.status(201).send(studentTest);
  } catch (err) {
    next(err);
  }
});

//option2 (me trying to be clever)
// router.post("/student/:studentId", async (req, res, next) => {
//   try {
//     req.body.studentId = req.params.studentId;
//     const newTest = await Test.create(req.body);
//     res.status(201).send(newTest);
//   } catch (error) {
//     next(error);
//   }
// });

//option3 (my initial answer):
// router.post("/student/:studentId", async (req, res, next) => {
//     try {
//       const newTest = await Test.findOrCreate({
//         where: {
//           subject: req.body.subject,
//           grade: req.body.grade,
//           studentId: req.params.studentId
//         }
//       });
//       res.status(201).send(newTest[0]);
//     } catch (error) {
//       next(error);
//     }
//   });

router.delete("/:id", async (req, res, next) => {
  try {
    const test = await Test.findById(req.params.id);
    await test.destroy();
    //await Test.destroy({where: {id: req.params.id}})
    res.sendStatus(204);
    //res.status(204).send()
  } catch (error) {
    next(error);
  }
});
