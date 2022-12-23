const express = require("express");
const cors = require("cors");
// const axios = require("axios");
const https = require("https");
// const fetch = require("node-fetch")

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// app.use("/", (req,res)=>{
//     res.send("Server started")
// })

app.get("/fetch-user", async (req, res) => {
  https
    .get("https://randomuser.me/api", (result) => {
      let data = "";
      result.on("data", (chunk) => {
        data += chunk;
      });
      result.on("end", () => {
        data = JSON.parse(data);
        data = data.results[0];
        //   console.log(data);
        res.send(data);
      });
    })
    .on("error", (err) => {
      console.log(err.message);
    });
});

const getApi = () => {
  let dataList = [];

  for (let a = 0; a < 10; a++) {
    https
      .get("https://randomuser.me/api", (result) => {
        let data = "";
        result.on("data", (chunk) => {
          data += chunk;
        });
        result.on("end", () => {
          data = JSON.parse(data);
          data = data.results[0];
          //   console.log(data);
          dataList.push(data);
        });
      })
      .on("error", (err) => {
        console.log(err.message);
      });
  }

  console.log(dataList);
};

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
