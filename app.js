require("dotenv").config();

const express = require("express");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");
const connectDB = require("./server/config/db");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(session({
    secret: 'Notes D4C',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// STATIC FILES
app.use(express.static("public"));

// CONNECT TO DATABASE
connectDB();

// TEMPLATING ENGINE
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// ROUTES
app.use("/", require("./server/routes/auth"));
app.use("/", require("./server/routes/index"));
app.use("/", require("./server/routes/dashboard"));

// HANDLE 404
app.get('*', function (req, res) {
    res.status(404).render("404");
});

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
});
