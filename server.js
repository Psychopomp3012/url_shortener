const express = require("express");
const mongoose = require("mongoose");
const shortURL = require("./models/url");
const app = express();

mongoose.connect("mongodb+srv://Psychopomp3012:iamgroot@cluster0.v5td1i8.mongodb.net/url2")
.then(() => {console.log("Database Connected");})

app.set('view engine', 'ejs');
app.use(express.urlencoded( { extended: false }));

app.get("/", async (req, res) => {
    const shortUrls = await shortURL.find();
    res.render('index.ejs', { shortUrls: shortUrls });
});

app.post("/shortURL", async (req, res) => {
    // model.create()
    await shortURL.create({ full: req.body.fullURL });
    console.log("saved in database");
    res.redirect('/');
});

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await shortURL.findOne({ short: req.params.shortUrl });
    if (shortUrl == null) return res.sendStatus(404);

    shortUrl.clicks++;
    shortUrl.save();

    res.redirect(shortUrl.full);
});

app.listen(process.env.PORT || 3000);
