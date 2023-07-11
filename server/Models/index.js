const mongoose = require("mongoose");
const Products = mongoose.Schema({
  name: { type: String, require: true },
  category: {
    type: String,
    requir: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  imageLink: {
    type: String,
    require: true,
  },
});
//User Schema
const User = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  phone: { type: String, require: true },
  carts: [Object],
  orders: [Object],
  addressList: [Object],
});

//Featured
const FeaturedSchema = mongoose.Schema({
  smallTitle: { type: String, require: true },
  title: { type: String, require: true },
  imageLink: { type: String, require: true },
});
//Models
const PrModel = mongoose.model("products", Products);
const UserModel = mongoose.model("users", User);
const FeaturedModel = mongoose.model("featured", FeaturedSchema);
module.exports = { PrModel, UserModel, FeaturedModel };
