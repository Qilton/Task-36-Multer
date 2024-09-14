const express=require('express')
const port=8080
const app=express()
const cors=require('cors')
const path=require('path')
const UserModel=require('./models/user')
const multer=require('multer')
const { urlencoded } = require('body-parser')
const {uploadonCloudinary}=require('./util/cloudinary')
require('./db'); 
require('dotenv').config()
app.use(cors(
  {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,

  }
))
app.use(express.json({ limit: "16kb"}));
app.use(express.urlencoded( { extended: true, limit: "16kb"} ));
app.use(express.static("public"));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  })
// const storage = multer.memoryStorage();
 const upload = multer({ 
    storage
})

app.get('/',(req,res)=>{
    res.send('Hello World')
}
)

app.post('/upload',upload.single("aa"),async(req,res)=>{
  
    console.log("hello")
    try {
      const file=req.file?.path
      console.log(file)
      const url=await uploadonCloudinary(file)
      const user=new UserModel({
        url:url
      })
      await user.save()
      res.json(1)
    } catch (error) {
      console.log("Error in uploading file",error)
      res.json(0)
    }

   })

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
}   )