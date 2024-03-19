const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser")
const cors = require("cors");
const { type } = require("os");
const { send } = require("process");
const { error } = require("console");

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.json());
app.use(cors());

// mongoose.connect(
//   "mongodb+srv://bhatth941:Hello123@cluster0.epetu3v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// )
mongoose.connect(
  "mongodb+srv://EcommercePoshak:Hello123@cluster0.zjukmwr.mongodb.net/Ecommerce"
);

// mongodb+srv://himanshu:Hello123@cluster0.jqaw0vt.mongodb.net/

// api creation
app.get("/", (req, res) => {
  res.send("express app is running");
});

// schema for creating product
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avilable: {
    type: Boolean,
    default: true,
  },
});

// Add product
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  // pahila product thio && lenth
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  // saving the product in database
  await product.save();
  return res.json({
    success: true,
    name: req.body.name,
  });
});

// creating api for deleting products
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("product removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// Creating api for getting all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("all products fetched");
  res.send(products);
});

// shema creating for usermodel

const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// creating endpoint for registering user
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({
        success: false,
        errors: "existing user found with same email id",
      });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();
  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, 'secret_ecom');
  res.json({ success: true, token });
});

// creating endpoint for userlogin
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, error: "wrong password" });
    }
  } else {
    res.json({ success: false, error: "Wrong email id" });
  }
});

// creating endpoint for new collection data
app.get('/newcollections',async(req,res)=>{
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("newCollection fetched");
  res.send(newcollection)
})

// creating endpoint for popular in women section
app.get('/popularinwomen',async(req,res)=>{
  // fetch popular products in women
  let products = await Product.find({category:"women"});
  let popular_in_women = products.slice(0,4);
  console.log("Popular in women fetched");
  res.send(popular_in_women);
})

// creating middleware to fetch user
const fetchUser = async(req,res,next)=>{
  const token = req.header('auth-token')
  if(!token){
    res.status(401).send({errors:"please athenticate using valid token"})
  }
  else{
    try {
      const data = jwt.verify(token,'secret_ecom');
      req.user = dats.user;
      next();
    } catch (error) {
      res.status(401).send({error:"please athenticate using valid token"})
    }
  }

}

// creating endpoint for adding products in  cartdata
app.post('/addtocart',fetchUser, async (req,res)=>{
  let userData = await Users.findOne({_id:req.user.id})
  userData.cartData[req.body.itemId]+=1
  await Users.findOneAndUpdate({id:req.user.id},{cartData:userData.cartData})
  res.send("added")
  console.log(req.body, res.username);
})

app.listen(port, (error) => {
  if (!error) {
    console.log("server running on port:" + port);
  } else {
    console.log("error:" + error);
  }
});

// image storage engine

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// creating upload endpoint for images
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  return res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});
