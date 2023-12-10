const express = require('express')
const router = express.Router()
const teacherController = require('../../controllers/teacherController');

router.get('/getAlITP', teacherController.getAllITP);
//gets all for summary table

router.get('/getAllPRISM', teacherController.getAllPRISM);
//gets all for summary table

router.get('/getAllStudents', teacherController.getAllStudents);
//gets all for summary table

router.get('/getITPTable', teacherController.getITPTable);
//does a SELECT * from dbo.ITP

router.get('/getPRISMTable', teacherController.getPRISMTable);
//does a SELECT * from dbo.PRISM

router.get('/getStudent/:id',teacherController.getStudent);
//gets Student by StudentID

router.get('/:id/getslots',teacherController.getSlots);
//uses opportunity id to getSlots

router.put('/updatePRISM/:id',teacherController.updatePRISM);
//uses opportunityID to update

router.put('/updateITP/:id',teacherController.updateITP);
//Uses opportunityID to update

router.post('/addITP',teacherController.addITP);
//Adds ITP

router.post('/addPRISM',teacherController.addPRISM);
//adds PRISM

router.post('/addStudent',teacherController.addStudent);
//adds Student

router.post('/:id/Assign',teacherController.Assign);
//adds studentid(to specify in route) to Assign table with opportunity

router.delete('UnAssign/:id',teacherController.UnAssign);
//deletes row based on student id





module.exports = router;