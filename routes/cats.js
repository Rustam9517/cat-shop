const {Router} = require('express');
const Cats = require('../models/cats');
const router = Router();

router.get('/',async (req, res) => {
    const cats =  await Cats.find();
    res.render('cats',{
       title:'Питомцы',
        isCats:true,
        cats
    });
})
router.post('/edit', async (req,res) =>{
   const {id} = req.body;
   delete req.body.id;
   try{
       await Cats.findByIdAndUpdate(id,req.body);
       res.redirect('/cats');
   }catch (e) {
       console.log(e);
   }
});
router.get('/:id/edit',async (req, res) => {
    const cat = await Cats.findById(req.params.id);
    if(!req.query.allow){
       return  res.redirect('/');
    }
    res.render('edit',{
        title:'Редактировать',
        cat
    })
});
router.get('/:id/info',async (req, res) => {
    const cat = await Cats.findById(req.params.id);
    res.render('info',{
        title:cat.breed,
        cat
    })
});

module.exports = router;