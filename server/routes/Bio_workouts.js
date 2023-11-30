var express = require('express');
var router = express.Router();

let Workout = require('../models/Bio_workouts');
let WorkoutController = require('../controllers/Bio_workouts')
let mongoose = require('mongoose');
// helper function
function requireAuth(req,res,next){
    if(!req.isAuthenticated())
    {
        return res.redirect('/login')
    }
    next();
}
/* Get route for the Bio Workout list */
// Read Operation
router.get('/', WorkoutController.DislayWorkoutlist);
/* Get route for Add Workout page --> Create */
router.get('/add', requireAuth, WorkoutController.AddWorkout); 
/* Post route for Add Workout page --> Create */
router.post('/add', requireAuth, WorkoutController.ProcessWorkout);
/* Get route for displaying the Edit Workout page --> Update */
router.get('/edit/:id', requireAuth, WorkoutController.EditWorkout);
/* Post route for processing the Edit Workout page --> Update */
router.post('/edit/:id', requireAuth, WorkoutController.ProcessEditWorkout);

router.get('/delete/:id', requireAuth, WorkoutController.getDeleteConfirmation);
/* Get to perform Delete Operation --> Delete Operation */
router.post('/delete/:id', requireAuth, WorkoutController.DeleteWorkout);
 module.exports = router;