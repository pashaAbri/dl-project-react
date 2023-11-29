const PORT = 8080;
const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

const app = express();

app.use(cors());

app.get("/receipts", (req, res) => {
  console.log("~~~~~~~~~proxy server")
  console.log("called /receipts endpoint")
  const options = {
    method: "GET",
    url: "https://api.theguai.com/receipts",  // could be updated to use the localhost for dev purposes
    headers: {
      "X-CMC_PRO_API_KEY": process.env.REACT_APP_MARKET_CAP_KEY,
    },
    params: {},
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});