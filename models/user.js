const {Schema,model} = require('mongoose');

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    cart:{
        items:[
            {
              count:{
                  type:Number,
                  required:true,
                  default:1
              },
              catId:{
                  type:Schema.Types.ObjectId,
                  ref:'Cats',
                  required:true
              }
            },
        ]
    }
});
userSchema.methods.addToCart = function(cat){
    const items = [...this.cart.items];
    const index = items.findIndex(el => el.catId.toString()===cat._id.toString());
    if(index>=0){
        items[index].count++;
    }else {
        items.push({
            catId: cat._id,
            count: 1
        });
    }
    this.cart = {items};
    return this.save();
}
module.exports = model('User',userSchema);