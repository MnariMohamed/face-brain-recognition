const handleSignin= (req, res, db, bcrypt) =>{

 const {email, password}=req.body;
 if(!email || !password){
 return  res.status(400),json("not valid");
 }
 const hash=bcrypt.hashSync(password);
db.select("email", "hash").from("login").where("email","=", email)
.then(data=>{
 const isValid=bcrypt.compareSync(req.body.password, data[0].hash);
 console.log(isValid);
 if(isValid){
   return db.select("*").from("users")
   .where("email", "=", email).then(user=>{
     console.log(user);
     res.json(user[0]);
   }).catch(console.log("wrong"));
 }
 else {
   res.json("worng");
 }
})

}

module.exports={
  handleSignin:handleSignin
}
