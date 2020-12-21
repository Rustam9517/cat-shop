const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
const Handlebars = require('handlebars');
const User = require('./models/user');
const homeRoutes = require('./routes/home');
const catsRoutes = require('./routes/cats');
const addRoutes = require('./routes/addCat');
const cartRoutes = require('./routes/cart');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const path = require('path');
const PORT = 3000;

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname:'.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});

app.engine('hbs',hbs.engine);
app.set('view engine','hbs');
app.set('views','views');


app.use(async (req, res, next) => {
    try{
        const user = await User.findById('5fdee5c1d1b1322b3024ce9c');
        req.user = user;
        next();
    } catch (e) {
        console.log(e);
    }
});
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}))
app.use('/',homeRoutes);
app.use('/cats',catsRoutes);
app.use('/addCat',addRoutes);
app.use('/cart',cartRoutes);

async function start(){
    try{
        const mongoURL = 'mongodb+srv://rustam:Ygj9yVCdhmYwHRWa@cluster0.qp5cg.mongodb.net/cats-shop?retryWrites=true&w=majority';
        await mongoose.connect(mongoURL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify:false
        });
        const candidate = await User.findOne();
        if(!candidate){
            const user = new User({
                email:'rustam.rzayev@outlook.com',
                name:'Rustam',
                cart: {item: []}
            });
            await user.save();
        }

        app.listen(PORT,()=>{
            console.log(`Server started on port: ${PORT}`);
        });
    }catch (e) {
        console.log(e);
    }
}
start();

