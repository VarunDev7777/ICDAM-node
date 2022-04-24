
const express = require("express");
const app = express();
//Environment Variables
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
//Connecting MongoDB
const mongoose = require("mongoose");
// mongodb://localhost:27017/icdamv_2
mongoose.connect(
  "mongodb+srv://icdam:icdam_2.0@icdamv.hiyrd.mongodb.net/icdam_2",
  {
    useNewUrlParser: !0,
    useUnifiedTopology: !0,
    useCreateIndex: 1,
  }
);

//View Engine & Static File Routing
app.set("view engine", "ejs");
app.use("/assets", express.static("assets"));
app.get("/ads.txt", function (req, res) {
  res.sendFile("./ads.txt", { root: __dirname })
})

app.post("/api/create-checkout-session", async (req, res) => {
  let amount = 1000;
  let Productname = "";
  let currencyCode = "usd";
  if (req.query.country == "India") {
    currencyCode = "inr";
  }

  switch (req.query.category) {
    case "Research Scholar/Student":
      amount = currencyCode == "inr" ? 1150000 : 150;
      Productname = "Research Scholar/Student";
      break;
    case "Academician":
      amount = currencyCode == "inr" ? 1530000 : 200;
      Productname = "Academician";
      break;
    case "Industrial Participant":
      amount = currencyCode == "inr" ? 1920000 : 250;
      Productname = "Industrial Participant";
      break;
    case "Special Membership":
      amount = req.query.amount * 100;
      Productname = "Special Membership";
    default:
      break;
  }
  if (Productname == "") {
    return Error("Bad Request");
  }
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    // customer_email: req.query.mail,
    line_items: [
      {
        price_data: {
          currency: currencyCode,
          product_data: {
            name: Productname,
          },
          unit_amount: amount + amount * 0.03,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://icdam-conf.com?payment=success",
    cancel_url: "https://icdam-conf.com?payment=cancelled",
  });

  res.json({ id: session.id, url: session.url })
});

//Parsing Body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Express-Session Config
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 },
  })
);

app.use("/", require("./routes/Home.routes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server has started at PORT ${PORT}`));
