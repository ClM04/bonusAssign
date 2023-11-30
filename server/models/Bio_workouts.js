let mongoose = require('mongoose');

// create a model class
let workoutModel = mongoose.Schema({
    Day:String,
    Time:String,
    Description:String,
    Duration:String
},
{
    collection:"Bio_workouts"
});
module.exports = mongoose.model('Workout',workoutModel);
