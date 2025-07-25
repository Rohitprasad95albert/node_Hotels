const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// define the Person schema
const personSchema =new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    work:{
        type:String,
        enum: ['chef','waiter','manager'],
        required:true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,

    },

    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

personSchema.pre('save',async function(next){
    const person = this;

    //Hash the password only if it has been modified(or is new)
    if(!person.isModified('password')) return next();

    try{
        //hash password generation
        const salt = await bcrypt.genSalt(10);

        // hash password
        const hashedPassword = await bcrypt.hash(person.password,salt);

        // Override the plain passwoord with the hashed one
        person.password = hashedPassword;
        next();
    }catch(err){
        return next(err);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        // Use bcrypt to comapre the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword,this.password);
        return isMatch;

    }catch(err){
        throw err;
    }
    
}
// Create person Model

const Person = mongoose.model('Person', personSchema);
module.exports = Person;