const {Schema,model} = require('mongoose');

const catsSchema = new Schema({
    age:{
        type:Number,
        require: true
    },
    price:{
        type:Number,
        require: true
    },
    weight:{
        type:Number,
        require: true
    },
    breed:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
});

module.exports = model('Cats',catsSchema);