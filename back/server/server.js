const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const key = require("./secret").MONGO_URL;
const { linkUrlSchema } = require("./models/LinkUrl");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

async function conn() {
  try {
    return await mongoose.connect(`${key}`);
  } catch (error) {
    console.log(error);
  }
}

async function checkExists(LinkUrl, userName) {
  return await LinkUrl.find({ name: userName });
}

app.post("/", (req, res) => {
  const arr = req.body;
  try {
    async function setNew(arr) {
      const connection = await conn();
      const LinkUrl = connection.model("LinkUrl", linkUrlSchema);
      arr.forEach(async (user) => {
        const kitty = new LinkUrl({
          from: user.Url,
          name: user.Name,
          role: user.Role,
        });
        const alreadyCreated = await checkExists(LinkUrl, user.Name);
        console.log(alreadyCreated[0]);
        if (!alreadyCreated[0]) {
          kitty.save().then(console.log("People saved"));
        }
      });
      // connection.disconnect();
      res.send("OK");
    }
    setNew(arr);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () =>
  console.log(`Example app listening on http://localhost:${port}`)
);
