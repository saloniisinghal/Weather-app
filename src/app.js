const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// define path to express directory config
const pathdirectory = path.join(__dirname, "../public");
const hbsdirectory = path.join(__dirname, "../templates/views");
const partialsdirectory = path.join(__dirname, "../templates/partials");

//setup handlebars integrated with express and views
app.set("view engine", "hbs");
app.set("views", hbsdirectory);
hbs.registerPartials(partialsdirectory);

//setup static directory to serve
app.use(express.static(pathdirectory));

//app.com
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Saloni Singhal",
  });
});

//about
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Saloni Singhal",
  });
});

//help
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Anything you need",
    name: "Saloni Singhal",
  });
});

//app.com/weather  html
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must state an Address",
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, place } = {}) => {
    if (error) return res.send({ error });

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) return res.send({ error });

      res.send({
        forecast: forecastData,
        location: place,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return {
      error: "You must provide a search here",
    };
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});
//404 page
app.get("help/*", (req, res) => {
  res.render("404error", {
    title: "404 Error",
    name: "Saloni Singhal",
    errormsg: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404error", {
    title: "404 Error",
    name: "Saloni Singhal",
    errormsg: "Page not found!",
  });
});

app.listen(3000, () => {
  console.log("This is running on port 3000");
});
