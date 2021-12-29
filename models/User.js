const mongoose=require('mongoose');
//const uniquevalator=require('mongoose-unique-validator');


const userSchema = new mongoose.Schema({

  fullname: {
    type: String,
   required: true,
},

email: {
    type: String,
    required: true,
    unique: true
},

password: {
    type: String,
    default: false,
    required: true
},
latitude:{
    type:Number,
    required: false
},
longitude:{
type:Number,
required: false

},

 langage :{
     type:String,
    required: true
 },
vision: {
    type: Boolean,
  required: true,
},

}, {
timestamps: true
});
//userSchema.plugin(uniquevalator);

const model=mongoose.model('user',userSchema);
  module.exports = model;