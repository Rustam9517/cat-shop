const {Router} = require('express');
const Cat = require('../models/cats');
const router = Router();
function mapToObj(cart){
     return cart.items.map(el =>({
        ...el.catId._doc,
        count:el.count,
        id:el.catId.id
     }));
}
function calculatePrice(obj){
   return obj.reduce((acc,el)=>acc+=el.price*el.count,0)
}
router.get('/',async (req, res) => {
   const user = await req.user
       .populate('cart.items.catId')
       .execPopulate();
   const cat = mapToObj(user.cart);
   const price = calculatePrice(cat);
   res.render('cart',{
      title:'Корзина',
      isCart:true,
      cat,
      price
   });
})

router.post('/add', async (req, res) => {
   try {
      const cat = await Cat.findById(req.body.id);
      await req.user.addToCart(cat);
      res.redirect('/cart');
   }catch (e) {
      console.log(e);
   }

});

module.exports = router;