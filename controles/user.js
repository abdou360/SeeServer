const User=require('../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('jsonwebtoken');

//Sign up
exports.signup=(req,res,next)=>{

  User.find({ email: req.body.email })
  .then((userFound) => {
      console.log(userFound);
      if (userFound.length && userFound.length >= 1) {
          return res.status(409).json({
              message: "email already taken!"
          })
      } else {
          
        bcrypt.hash(req.body.password,10)
        .then(hash=>{
            const user=new User({
                fullname:req.body.fullname,
                email:req.body.email,
                password:hash,
                langage:req.body.language,
                vision:req.body.vision
            });
            user.save()
            .then(()=>res.status(200).json(user))
            .catch(error => res.status(400).json({error}));
        })
        .catch(error=> res.status(500).json({error}));

      }
  })


};
// Log in
exports.login=(req,res,next)=>{
    User.findOne({email:req.body.email})
    .then(user=>{
        if(!user){
            return res.status(409).json({message:'utilisateur non trouvé'});
        }

bcrypt.compare(req.body.password,user.password)
.then(valid=>{
    if(!valid){
        return res.status(401).json({message:'mot de passe incorrecte !'});
    }
     res.status(200).json(user);
    /* {
         userId:user._id,
         token: jwt.sign({userId:user._id},'RAndom_token_secret',
         {expiresIn:'24h'})
     }*/ 
     next();
})
.catch();


    })
    .catch(error=>res.status(501).json({message:'probleme  interne du serveur!!'}));

};
//Dele user de
exports.deleteUser=(req,res,next)=>{
  
    User.findByIdAndRemove(req.params.userId)
        .then(result => {
            if (result) {
                res.status(200).json({
                    message: "User Deleted !"
                })
            } else {
                res.status(404).json({
                    message: "user not found or cannot be deleted!"
                })
            }
        }, (err) => next(err))
        .catch((err) => next(err));
}
// get all users
exports.getUsers=(req,res,next)=>{
  User.find({})
  .then((users) => {
      res.status(200).json(users)
  }, (err) => next(err))
  .catch((err) => next(err));
}
// update user location
exports.updateUserLocation=(req, res) =>{

        const user = new User({
            _id: req.params.userId,
            latitude: req.body.latitude,
            longitude: req.body.longitude
        });
        User.updateOne({_id:req.params.userId}, user).then(
          () => {
            res.status(201).json({message:"success"});
          }
        ).catch(
          (error) => {
            res.status(400).json({
              message: "ooooooooh"
            });
          }
        );


}
