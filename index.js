const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

const users = [];

// home
app.get("/", (req, res) => {
  res.send("Auth server is running");
});

// signup
app.post("/signup", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // validation
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  // duplicate check
  const alreadyExists = users.some(u => u.email === email);

  if (alreadyExists) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  const newUser = {
    email: email,
    password: password,
  };

  users.push(newUser);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      email: newUser.email,
    },
  });
});

// login
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // validation
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const existingUser = users.find(u => {
    return u.email === email && u.password === password;
  });

  if (!existingUser) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  const fakeToken = "token-" + Date.now();

  res.json({
    message: "Login successful",
    token: fakeToken,
  });
});
app.get("/page", (req, res) => {
  res.sendFile(path.join(__dirname, "page.html"));
});


// server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
