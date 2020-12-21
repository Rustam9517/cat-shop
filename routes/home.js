const {Router} = require('express');
const router = Router();
router.get('/',async (req, res) => {
   res.render('home',{
      title:'Главная',
      isHome:true
   });
});
module.exports = router;
