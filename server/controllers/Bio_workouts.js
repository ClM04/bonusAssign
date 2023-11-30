var express = require('express');
var router = express.Router();
let Workout = require('../models/Bio_workouts');

module.exports.DislayWorkoutlist = async (req,res,next)=>{ //< Mark function as async
    try{
       const WorkoutList = await Workout.find(); //< Use of await keyword
       res.render('workout/list', {
          title: 'Workout List', 
          WorkoutList: WorkoutList
       });
    }catch(err){
       console.error(err);
       //Handle error
       res.render('workout/list', {
          error: 'Error on server'
       });
    }
 };

 module.exports.AddWorkout = async (req,res,next)=>{
    try{
        res.render('workout/add',
        {
            title:'Add Workout'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('workout/list',
        {
            error: 'Error on the server'
        });
    }
};

module.exports.ProcessWorkout = async (req,res,next)=>{
    try{
        let newWorkout = Workout({
            "Day":req.body.Day,
            "Time": req.body.Time,
            "Description": req.body.Description,
            "Duration": req.body.Duration
        });
        Workout.create(newWorkout).then(() =>{
            res.redirect('/Workoutslist')
        })
    }
    catch(error){
        console.error(err);
        res.render('workout/list',
        {
            error: 'Error on the server'
        });
    }
};

module.exports.EditWorkout = async (req,res,next)=>{
    try{
        const id = req.params.id;
        const workoutToEdit = await Workout.findById(id);
        res.render('workout/edit',
        {
            title:'Edit Workout',
            Workout:workoutToEdit
        })
    }
    catch(error){
        console.error(err);
        res.render('workout/list',
        {
            error: 'Error on the server'
        });
    }
}

module.exports.ProcessEditWorkout = (req,res,next)=>{
    try{
        const id = req.params.id;
        let updatedWorkout = Workout({
            "_id":id,
            "Day":req.body.Day,
            "Time": req.body.Time,
            "Description": req.body.Description,
            "Duration": req.body.Duration
        });
        Workout.findByIdAndUpdate(id,updatedWorkout).then(()=>{
            res.redirect('/workoutslist')
        });
    }
    catch(error){
        console.error(err);
        res.render('workout/list',
        {
            error: 'Error on the server'
        });
    }
}

// Delete Confirmation Message
module.exports.getDeleteConfirmation = async (req,res,next) => {
    try{
        let id = req.params.id;
        let workout = await Workout.findById(id).exec();
    
        res.render('workout/deleteConfirmation', { workout });
    }
    catch (error) {
        console.error(error);
        res.render('workout/list',
        {
            error: 'Error on the server'
        });
    }
}

module.exports.DeleteWorkout = (req,res,next) => {
    try {
        let id = req.params.id;
        Workout.deleteOne({_id:id}).then(() => {
            res.redirect('/workoutslist');
        });
    } 
    catch (error) {
        console.error(error);
        res.render('workout/list', {
            error: 'Error on the server'
        });
    }
};