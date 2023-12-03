const User = require('../models/user');
const router = require('express').Router();

//register
router.get('/',(req,res) =>{
    res.render('register.ejs');
})

router.post('/',async (req,res)=>{
    console.log(req.body);

    const { name, email, password} = req.body;
    const usern = new User({
        name, email, password
    });
    console.log("found data");
    try{
        const newUser = await usern.save();
        res.send(newUser);
    } catch(error){
        if (error.code === 11000){
            res.status(400).send({error: 'User with given name or email already exists.'});
        } else if(error.name = 'ValidatorError'){
            res.status(400).send({error: 'unique username or email'})
        }
    }
})

module.exports = router;