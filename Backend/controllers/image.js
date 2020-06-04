var Clarifai=require("clarifai");

const app = new Clarifai.App({
 apiKey: '6f48686ef9174a3d8e7b833340ce0cd0'
});
const handleApiCall= (req, res, db) =>{
app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input).then(data=> res.json(data)).catch(err=>res.json(err));
}
const addEntry= (req, res, db) =>{
 const {id}=req.body;
 db("users").where("id","=",id)
 .increment("entries",1)
 .returning("entries").
 then(entries=>res.send(entries)).catch(error=>res.status(400).json("error"));
}

module.exports={
  addEntry:addEntry,
  handleApiCall: handleApiCall
}
