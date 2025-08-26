const bcrypt = require("bcryptjs");
const emailSender = require("../mailer");

const userRegister = (req, res) => {
  const db = req.app.locals.db;

  const { name, email, password, passwordRep } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name) return res.status(401).json({ message: "Insert nick !" });
  if (name.length > 25) return res.status(401).json({ message: "Nick cannot be longer than 25 characters !" });
  if (!email) return res.status(401).json({ message: "Insert email !" });
  if (!emailRegex.test(email)) return res.status(401).json({ message: "Wrong email format !" });
  if (!password || !passwordRep) return res.status(401).json({ message: "Insert password !" });
  if (password.length < 7) return res.status(401).json({ message: "Password must have 7+ chars" });
  if (password !== passwordRep) return res.status(401).json({ message: "Passwords are not matching !" });

  db.query("SELECT email FROM users WHERE email = ?", [email], async (error, results) => {
    if (error) return res.status(500).json({ message: "Database error", error });

    if (results.length > 0) return res.status(401).json({ message: "Email is already used !" });

    const hashedPassword = await bcrypt.hash(passwordRep, 8);

    db.query(
      "INSERT INTO users (`id`, `name`, `email`, `password`, `points`) VALUES (0, ?, ?, ?, 0)",
      [name, email, hashedPassword],
      (error) => {
        if (error) return res.status(500).json({ message: "Database error", error });

        emailSender(
          email,
          "Welcome to HackTheMaturita CTF",
          `Your account was registered: ${name}.\nHave fun and learn new skills!\n\nAdmin`
        );
        return res.status(200).json({ messageGreen: "You are registered." });
      }
    );
  });
};

module.exports = { userRegister };