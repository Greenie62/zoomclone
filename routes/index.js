const router = require('express').Router();




router.get('/',(req,res)=>{
    res.redirect('/login')
})



router.get('/login',(req,res)=>{
    res.render('login')
})


router.post('/login',(req,res)=>{
    console.log(req.body)
    res.locals.username = req.body.username;
    let { username:user, room } = req.body 
    res.redirect(`/chat/${room}/${user}`)
})


router.get("/chat/:room/:user",(req,res)=>{
    console.log(req.params.user);
    const {user, room} = req.params;
    
    res.render("chat",{user,room})
    // res.json({room:req.params.room, user:req.params.user})
})



module.exports = router;