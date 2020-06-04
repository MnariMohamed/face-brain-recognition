const profiles= (req, res, db) =>{
 var {id}=req.params;
 db.select('*').from('users').where({id}).then(data=>{
   console.log(data);
   res.send(data);
 });
}

module.exports={
  profiles:profiles
}
