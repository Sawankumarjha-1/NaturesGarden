const express = require("express");
const app = express.Router();
const { isValidObjectId } = require("mongoose");
const { PrModel, UserModel, FeaturedModel } = require("../Models");
const nodemailer = require("nodemailer");
let serverOTP = "";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

//********************Routes********************* */
//fetched user details
app.get("/user/:email", async (req, res) => {
  let email = req.params.email;
  let data = await UserModel.find({
    email: email,
  });
  if (data.length === 0) {
    return res.send({ status: 401, message: "No data found !" });
  }
  res.send({ status: 200, data: data });
});
//Fetched products by category
app.get("/products_category/:catg", async (req, res) => {
  let category = req.params.catg;
  category[0].toUpperCase();

  let data = await PrModel.find({
    category: category,
  });
  if (data.length === 0) {
    return res.send({ status: 401, message: "No data found !" });
  }
  res.send({ status: 200, data: data });
});
//Fetched products by category
app.get("/allProducts", async (req, res) => {
  let data = await PrModel.find();
  if (data.length === 0) {
    return res.send({ status: 401, message: "No data found !" });
  }
  res.send({ status: 200, data: data });
});
//Fetched products by an id
app.get("/products_id/:id", async (req, res) => {
  let id = req.params.id;
  if (!isValidObjectId(id)) {
    return res.send({ status: 401, message: "Invalid Request !" });
  }
  let data = await PrModel.findById(id);
  if (data === null) {
    return res.send({ status: 401, message: "No data found !" });
  }
  res.send({ status: 200, data: data });
});
//Fetched products by limit
app.get("/products/:limit", async (req, res) => {
  let data = await PrModel.find().limit(req.params.limit);
  console.log(data.length);
  if (data === null) {
    return res.send({ status: 401, message: "No data found !" });
  }
  res.send({ status: 200, data: data });
});
//Fetched Featured
app.get("/featured/:limit", async (req, res) => {
  let data = await FeaturedModel.find().limit(req.params.limit);
  console.log(data.length);
  if (data === null) {
    return res.send({ status: 401, message: "No data found !" });
  }
  res.send({ status: 200, data: data });
});
//Signup User
app.post(
  "/add_user",
  //Middleware to validate the data
  (req, res, next) => {
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    // "Password must contain 6 letters and alteast one special character and one numeric value",
    const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (name == "" || name == undefined) {
      return res.json({
        status: 400,
        message:
          "😅 Please enter your name so that we can proceed futher more !",
      });
    } else if (email == "" || email == undefined) {
      return res.json({
        status: 400,
        message:
          "😅 Please enter your email so that we can proceed futher more !",
      });
    } else if (phone == "" || phone == undefined) {
      return res.json({
        status: 400,
        message:
          "😅 Please enter phone number so that we can proceed futher more !",
      });
    } else if (password == "" || password == undefined) {
      return res.json({
        status: 400,
        message:
          "😅 Please enter your password so that we can proceed futher more !",
      });
    } else if (phone.length != 10) {
      return res.json({
        status: 400,
        message: "😅 Please enter valid phone no !",
      });
    } else if (!(email.includes("@") && email.includes("."))) {
      return res.json({
        status: 400,
        message: "😅 Please enter a valid email address !",
      });
    } else if (!(password.length >= 6 && password.match(passRegex))) {
      return res.json({
        status: 400,
        message:
          "😅 Password must contain 6 letters and alteast one special character and one numeric value",
      });
    } else {
      next();
    }
  },
  //if validate successfully then we can send to database
  async (req, res) => {
    const name = req.body.name;
    const email = req.body.email.trim().toLowerCase();
    const phone = req.body.phone;
    const password = req.body.password.trim();

    const alreadyExist = await UserModel.find({
      email: email.trim().toLowerCase(),
    });

    if (alreadyExist.length != 0) {
      return res.json({
        status: 403,
        message:
          " 🥲 User with this email is already exist please login or try to use another email id!",
      });
    } else {
      const newEmployer = await new UserModel({
        name,
        email,
        phone,
        password,
      });
      newEmployer.save();
      res.json({
        status: 200,
        message: "😍 Thanks for sending data....",
        data: newEmployer,
      });
    }
  }
);
//Login User
app.post("/login", async (req, res) => {
  const email = req.body.email.toLowerCase();
  const pass = req.body.password;
  // console.log(email, pass);
  if (email == "" || email == undefined) {
    return res.json({ status: 401, message: "Invalid Credentials...." });
  } else if (pass == "" || pass == undefined) {
    return res.json({ status: 401, message: "Invalid Credentials...." });
  }
  const result = await UserModel.findOne({ email: email, password: pass });
  if (result == null) {
    return res.json({ status: 401, message: "Invalid Credentials...." });
  } else {
    res.json({ status: 200, message: "Successfully...", data: result });
  }
});
//Update Cart Item
app.route("/carts_update/:id").patch(async (req, res) => {
  const id = req.params.id.toLowerCase();
  if (id.includes("@") && id.includes(".com")) {
    const data = await UserModel.findOneAndUpdate(
      { email: id },
      {
        $push: {
          carts: req.body,
        },
      }
    );
    if (data != null) {
      res.status(200).json({
        status: 200,

        message: "😍 Thanks for submitting cart details....",
      });
    } else {
      res.json({
        status: 401,
        message: "🥲 Invalid Request !",
      });
    }
  } else {
    res.json({
      status: 400,
      message: "🥲 Invalid Request !",
    });
  }
});

//Delete individual Cart Items
app.delete("/delete_cart/:email/:id", async (req, res) => {
  const email = req.params.email;
  const id = req.params.id;
  if (email.includes("@") && email.includes(".com")) {
    await UserModel.findOneAndUpdate(
      { email: email },
      {
        $pull: {
          carts: { _id: id },
        },
      },
      { new: true }
    );

    return res.status(200).json({
      status: 200,
      message: "Cart Item Delete Successfully !",
    });
  } else {
    return res.status(401).json({ status: 401, message: "😅 Invalid Id !" });
  }
});
//Earse All cart items
app.delete("/erase/:email/", async (req, res) => {
  const email = req.params.email;
  if (email.includes("@") && email.includes(".com")) {
    await UserModel.findOneAndUpdate(
      { email: email },
      {
        $set: {
          carts: [],
        },
      },
      { new: true }
    );

    return res.status(200).json({
      status: 200,
      message: "Erase Delete Successfully !",
    });
  } else {
    return res.status(401).json({ status: 401, message: "😅 Invalid Id !" });
  }
});
//Update Order Details
app.route("/orders_update/:id").patch(async (req, res) => {
  const id = req.params.id.toLowerCase();
  if (id.includes("@") && id.includes(".com")) {
    const data = await UserModel.findOneAndUpdate(
      { email: id },
      {
        $push: {
          orders: req.body,
        },
      }
    );
    if (data != null) {
      res.status(200).json({
        status: 200,

        message: "😍 Thanks for submitting order details....",
      });
    } else {
      res.json({
        status: 401,
        message: "🥲 Invalid Request !",
      });
    }
  } else {
    res.json({
      status: 400,
      message: "🥲 Invalid Request !",
    });
  }
});
//Update Order Status
app.route("/update_status/:email/:index/:objI").patch(async (req, res) => {
  const email = req.params.email.toLowerCase();
  const index = parseInt(req.params.index);
  const objI = parseInt(req.params.objI);
  if (email.includes("@") && email.includes(".com")) {
    const data = await UserModel.find({ email: email });
    console.log(data);
    if (data != null) {
      data[0].orders[index][objI].status = req.body.status;
      await UserModel.findOneAndUpdate(
        { email: email },
        {
          $set: {
            orders: data[0].orders,
          },
        },
        { new: true }
      );
      res.status(200).json({
        status: 200,

        message: "😍 Thanks for submitting address details....",
      });
    } else {
      res.json({
        status: 401,
        message: "🥲 Invalid Request !",
      });
    }
  } else {
    res.json({
      status: 400,
      message: "🥲 Invalid Request !",
    });
  }
});
//Update Address Details
app.route("/address_update/:id").patch(async (req, res) => {
  const id = req.params.id.toLowerCase();
  if (id.includes("@") && id.includes(".com")) {
    const data = await UserModel.findOneAndUpdate(
      { email: id },
      {
        $push: {
          addressList: req.body,
        },
      }
    );
    if (data != null) {
      res.status(200).json({
        status: 200,

        message: "😍 Thanks for submitting address details....",
      });
    } else {
      res.json({
        status: 401,
        message: "🥲 Invalid Request !",
      });
    }
  } else {
    res.json({
      status: 400,
      message: "🥲 Invalid Request !",
    });
  }
});
//Delete Address Details
app.delete("/delete_address/:email/:index", async (req, res) => {
  const email = req.params.email;
  const index = parseInt(req.params.index);
  if (email.includes("@") && email.includes(".com")) {
    let result = await UserModel.find({ email: email });
    const newArr = result[0].addressList.filter((data, i) => {
      return i !== index;
    });
    await UserModel.findOneAndUpdate(
      { email: email },
      {
        $set: {
          addressList: newArr,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      status: 200,
      message: "Address Delete Successfully !",
    });
  } else {
    return res.status(401).json({ status: 401, message: "😅 Invalid Id !" });
  }
});
//Sending OTP
app.route("/send_otp").post(async (req, res) => {
  const email = req.body.email.toLowerCase();
  // console.log(email);
  if (email == "" || email == undefined) {
    return res.json({
      status: 400,
      message:
        "😅 Please enter your email so that we can proceed futher more !",
    });
  } else if (!(email.includes("@") && email.includes("."))) {
    return res.json({
      status: 400,
      message: "😅 Please enter a valid email address !",
    });
  } else {
    const result = await UserModel.findOne({ email });
    if (result == null) {
      res.json({
        status: 400,
        message: "No Employer exist with this email id .",
      });
    } else {
      let OTP = "";
      for (i = 0; i < 4; i++) {
        OTP += Math.floor(Math.random() * 10);
      }

      serverOTP = OTP;
      const mailOptions = {
        from: "workrideapp@gmail.com",
        to: email,
        subject: `OTP From Work Ride`,
        text: `OTP from Work Ride: ${OTP}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.json({ status: 400, message: "Something error..." });
        } else {
          res.json({ otp: OTP, status: 200, message: "Send Successfully..." });
        }
      });
    }
  }
});
//Update Password
app.route("/update_password").patch(
  (req, res, next) => {
    const otp = req.body.otp;
    const password = req.body.password;
    // "Password must contain 6 letters and alteast one special character and one numeric value",
    const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (otp == "" || otp == undefined) {
      return res.json({
        status: 400,
        message: "😅 Please enter your 4 digit OTP !",
      });
    } else if (password == "" || password == undefined) {
      return res.json({
        status: 400,
        message:
          "😅 Please enter your password so that we can proceed futher more !",
      });
    } else if (!(password.length >= 6 && password.match(passRegex))) {
      return res.json({
        status: 400,
        message:
          "😅 Password must contain 6 letters and alteast one special character and one numeric value",
      });
    } else if (otp !== serverOTP) {
      return res.json({
        status: 400,
        message: "😅 Invalid OTP !",
      });
    } else {
      next();
    }
  },
  async (req, res) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    // console.log(email, password);
    const updated_result = await UserModel.findOneAndUpdate(
      { email: email },
      {
        $set: {
          password: password,
        },
      }
    );
    if (updated_result == null) {
      res.json({ status: 400, message: "🥲 Username does not exist !" });
    } else {
      res.json({ status: 200, message: "🙂 Password Updated Successfully..." });
    }
  }
);
module.exports = app;
