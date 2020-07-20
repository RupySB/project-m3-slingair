"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { flights } = require("./test-data/flightSeating");
const { customers } = require("./test-data/reservations");

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("dev"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // endpoints
  .get("/slingshotair/flights", getFlights) //there's only 2 flights available...needs to pick between them or redirect to error page
  .get("/slingshotair/flights/:flight", getFlight) //once they select flight, they need to be able to select seats
  .get("/slingshotair/flights/:flight/:seat", getSeat) //here they can check which seats are available
  .get("/slingshotair/customers/:userId", getCustomer) //here we get id from customer
  .get("/slingshotair/cusomers", getCustomers) // we get all customer info thats inputted
  .post("/slingshotair/customers", handleNewCustomer) //how a NEW customer puts in his information..post
  .put("/slingshotair/reset", handleResetData)
  // my stuff is below...expanding on the stuff from the top!!

  .post("/slingshotair/customers", (req, res) => {
    let newCustomer = true;
    console.log(req.body); //check why I need this
    for (let i = 0; i < customers.length; i++){
      if(customers[i].givenName === req.body.givenName){
        res.json({
          status: "error",
          error: "booked",
        });
        return;
      } else if (customers[i].surName === req.body.surName){
        res.json({
          status: "error",
          error: "booked",
        });
    } else if (customers[i].email === req.body.email){
      res.json({
        status: "error",
        error: "booked",
      });} //this is only if the new customer is inputting info same as an old customer

  .get("/", (req, res) => {
    res
      .status(200)
      .json({ stauts: 200, message: "This is an empty homepage..." });
  })
  .get("*", (req, res) => {
    res.status(404);
    res.send(
      "Whoops! Something went wrong! This is not the page you're looking for."
    );
  })
  .use((req, res) => res.send("Not Found"))
  .listen(8000, () => console.log(`Listening on port 8000`));
