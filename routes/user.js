const express =require('express');
const router=express.Router();
const userCtrl=require('../controles/user');
//routes
router.post('/signup',userCtrl.signup);
router.post('/signin',userCtrl.login);
router.delete('/:userId',userCtrl.deleteUser);
router.get('/all',userCtrl.getUsers);
router.post('/update/:userId',userCtrl.updateUserLocation);



 

module.exports=router;