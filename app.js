// app.js
const express = require("express");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();

const { getParameter } = require("./ssm");
const getDBPool = require("./db");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["https://parthpatel.academy"], // production origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

(async () => {
  // Fetch session secret from SSM
  const sessionSecret = await getParameter("/myapp/session/secret", true);

  app.use(
    session({
      key: "user",
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: { httpOnly: true, expires: 86400000 }, // 1 day
    })
  );

  // Make DB pool available to all routes
  app.locals.db = getDBPool();

  // Routes
/* Routes */
const levelRouter = require('./routes/levelRouter');
app.use('/level', levelRouter);

const userRouter = require('./routes/userRouter');
app.use('/user', userRouter);

const registerRouter = require('./routes/registerRouter');
app.use('/register', registerRouter);

const authRouter = require('./routes/authRouter');
app.use('/auth', authRouter);

const answerRouter = require('./routes/answerRouter');
app.use('/answer', answerRouter);

const profileRouter = require('./routes/profileRouter');
app.use('/profile', profileRouter);

const adminRouter = require('./routes/adminRouter');
app.use('/admin', adminRouter);

  // Main route
  app.get("/", (req, res) => res.json("Backend server"));

  // Start server
  app.listen(process.env.PORT, () => {
    console.log("🚀 Backend running on port " + process.env.PORT);
  });
})();