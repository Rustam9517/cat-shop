const {Router} = require('express');
const Cats = require('../models/cats')
const router = Router();

router.get('/',async (req, res) => {
    res.render('addCat',{
       title:'Добавить питомца',
        isAdd:true
    });
})
router.post('/',async (req,res)=>{
   const addCat = new Cats({
       age:req.body.age,
       price:req.body.price,
       weight:req.body.weight,
       breed:req.body.breed,
       image:req.body.image,
       description:req.body.description,
   });
   try{
       await addCat.save();
       res.redirect('/cats');
   }catch (e) {
       console.log(e)
   }

});
module.exports = router;