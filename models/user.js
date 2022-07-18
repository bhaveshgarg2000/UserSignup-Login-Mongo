const mongoose = require('mongoose')
const validator = require('validator')



const UserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        unique:true,
        required : true,
    },
    lastname :{
        type:String,
        unique:true,
        required : true,
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email already exists"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(`Invalid Email ${value}`)
            }
        }

    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    }

});


// Model 
const User  = new mongoose.model('User',UserSchema);


module.exports = User;



// UserSchema.pre("save", function (next) {
//     const user = this
  
//     if (this.isModified("password") || this.isNew) {
//       bcrypt.genSalt(10, function (saltError, salt) {
//         if (saltError) {
//           return next(saltError)
//         } else {
//           bcrypt.hash(user.password, salt, function(hashError, hash) {
//             if (hashError) {
//               return next(hashError)
//             }
  
//             user.password = hash
//             next()
//           })
//         }
//       })
//     } else {
//       return next()
//     }
//   })