// import express, { Request, Response } from "express";

import { UserModel } from "./mongoose/UserSchema";
import { Session } from "./class/Session";
import mongoose from "mongoose";
import { ActivityModel } from "./mongoose/ActivitiesSchema";
import connectToMongoDB from "./mongoose/Connection_MongoDB";
import validator from "validator";
import { VALID_TOKENS, REFRESH_TOKENS } from "./guards/Authenticate";

require("dotenv").config();
const expirationTime = Number(process.env.SESSION_EXPIRATION_IN_HOURS);
const port = process.env.PORT;
const { authMiddleware } = require("./guards/Authenticate");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const express = require("express");
const admin = require('firebase-admin')
const unless = (path: any, middleware: any) => {
  return (req: any, res: any, next: any) => {
    if (path === req.path) {
      return next();
    } else {
      return middleware(req, res, next);
    }
  };
};

const serviceAccount = require('./serviceAccount.json');
const dbUrl = "https://int-final-project-default-rtdb.asia-southeast1.firebasedatabase.app/";

  admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: dbUrl,
  });
const messaging = admin.messaging();
console.info("Initialized Firebase SDK");

const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
    maxAge: 2592000,
  })
);
app.use(express.json());
app.use("/images", express.static("Images"));
app.use("/getUserAccount", authMiddleware);

connectToMongoDB();

const storage = multer.diskStorage({
  destination: (req: any, file: any, callback: any) => {
    callback(null, "./Images");
  },
  filename: (req: any, file: any, callback: any) => {
    callback(null, `${file.originalname}_${Date.now()}`);
  },
});

const upload = multer({ storage: storage });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "oritjan32@gmail.com",
    pass: process.env.TRANSPORST_GMAIL_PASSWORD,
  },
});

app.put("/register", async (req: any, res: any) => {
  const saltRounds = 10;
  try {
    const { firstName, lastName, username } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const user = await UserModel.findOne({
      userName: username,
    });
    if (user) {
      res.json({ user });
    } else {
      const actualUser = new UserModel({
        firstName,
        lastName,
        userName: username,
        password: hashedPassword,
      });
      await actualUser.save();
      res.send("sign up successfully");
    }
  } catch {
    res.status(409).send("The user exists, Enter with another email");
  }
});

app.post("/find-user-email", async (req: any, res: any) => {
  const { username } = req.body;
  const user = await UserModel.findOne({
    userName: username,
  });
  res.send({ user });
});

app.post("/login", async (req: any, res: any) => {
  const { username, password } = req.body;
  const user: any = await UserModel.findOne({
    userName: username,
  });
  const match = await bcrypt.compare(password, user?.password);
  if (!match) {
    res.json(user);
  } else {
    if (process.env.AUTHENTICATION_MGMT_METHOD == "token") {
      const payload = { name: username };
      const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET || "",
        { expiresIn: "15s" }
      );
      console.log("accessToken:" + accessToken);
      const refreshToken = jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET || ""
      );
      VALID_TOKENS[username] = accessToken;
      console.log("valid token:" + VALID_TOKENS[username]);
      REFRESH_TOKENS[username] = refreshToken;
      res.status(200).json({ accessToken, refreshToken, user });
    } else {
      const session = new Session(username, expirationTime, mongoose);
      const sessionId = await session.getSessionId();
      res.cookie("sessionId", sessionId, {
        maxAge: 432500,
        httpOnly: true,
      });
      res.cookie("username", username, {
        maxAge: 432500,
        httpOnly: true,
      });
      res.status(200).send("Login succesfully!");
    }
  }
});

app.post('/send-fcm', (req:any, res:any) => {
  const message = {
    notification: {
      title: 'Your Notification Title',
      body: 'Your Notification Body',
    },
    token: 'Your_FCM_Token',
  };

  messaging
    .send(message)
    .then((response:any) => {
      console.log('Successfully sent message:', response);
      res.status(200).json({ success: true });
    })
    .catch((error:any) => {
      console.error('Error sending message:', error);
      res.status(500).json({ success: false, error: error.message });
    });
});

app.post("/logout", async function (req: any, res: any) {
  if (process.env.AUTHENTICATION_MGMT_METHOD == "token") {
    const userDetails = req.body.userDetails;
    const username = userDetails.userName;
    delete VALID_TOKENS[username];
    delete REFRESH_TOKENS[username];
  } else {
    const sessionId = req.cookies?.sessionId;
    const session = new Session(null, expirationTime, mongoose, sessionId);
    const actSession = await session.getSession();
    await session.deactivateSession(actSession);
  }
  return res.send("200");
});

app.get("/getActivities", async function (req: any, res: any) {
  const activities = await ActivityModel.find();
  res.send(activities);
});

app.post("/getUserAccount", async function (req: any, res: any) {
  const userId = req.body.userId;
  console.log(userId);
  const user = await UserModel.findOne({
    _id: userId,
  });
  res.json(user);
});

app.post(
  "/update-user/:id",
  upload.single("image"),
  async function (req: any, res: any) {
    const image = req.file;
    const id = req.params.id;
    const { firstName, lastName, address, email } = req.body;
    console.log(id, firstName);
    const updateUser = await UserModel.findOneAndUpdate(
      {
        _id: id,
      },
      { image: image?.filename, firstName, lastName, address, email }
    );
    await updateUser?.save()
    console.log(updateUser);
    res.json(updateUser);
  }
);

app.post("/delete-user-image", async function (req: any, res: any) {
  const userId = req.body.userId;
  const updateUser = await UserModel.findOneAndUpdate(
    {
      _id: userId,
    },
    { $set: { image: null } },
    { new: true }
  );
  res.send(updateUser);
});

app.post("/get-activity", async function (req: any, res: any) {
  const userId = req.body.userId;
  const user = await UserModel.findOne({ _id: userId });
  res.send(user);
});

app.post("/add-activity", async function (req: any, res: any) {
  const { activityName, userDetails } = req.body;
  console.log(activityName);
  console.log(userDetails);
  const username = userDetails.userName;
  console.log(username);
  const result = await UserModel.updateOne(
    { userName: username },
    { $push: { activities: activityName } }
  );
  res.json(result);
});

app.post("/delete-activity", async function (req: any, res: any) {
  const { userId, activityName } = req.body;
  console.log(userId);
  console.log(activityName);
  try {
    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { activities: activityName } }
    );
    res.send(user);
  } catch (error) {
    console.error("Error updating document");
  }
});

app.post("/add-event", async function (req: any, res: any) {
  const { date, className, hour, instructorName } = req.body.eventData;
  const userId = req.body.userId;
  console.log(
    "events detailes: " + date,
    className,
    hour,
    instructorName,
    userId
  );
  const user = await UserModel.findOneAndUpdate(
    { _id: userId },
    { $push: { events: { date, hour, className, instructorName } } }
  );
  res.json(user);
});

app.delete('/delete-event/:userId/:eventId', async (req:any, res:any) => {
  const userId = req.params.userId;
  console.log(userId)
  const eventId = req.params.eventId;
  console.log(eventId)
  try {
    const user = await UserModel.findById(userId) as any;
    user.events= user?.events.filter((event:any) => event._id != eventId)
    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

 

app.post("/add-weight/:id", async function (req: any, res: any) {
  const { weighingDate, weight, fatPercentage } = req.body;
  const id = req.params.id;
  console.log("id is :" + id);
  console.log(weight);
  try {
    const userUpdate = await UserModel.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $push: { weighings: { weighingDate, weight, fatPercentage } },
      }
    );
    res.status(200).json(userUpdate);
  } catch (error) {
    console.log("error updatind the user");
    res.status(401).send();
  }
});

app.post("/forgot-password", async function (req: any, res: any) {
  const email: string = req.body.email;
  if (process.env.AUTHENTICATION_MGMT_METHOD == "token") {
    const payload = { userName: email };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET || ""
    );
    const resetToken = accessToken;
    console.log(resetToken);
    const user = await UserModel.findOneAndUpdate(
      { userName: email },
      {
        $set: {
          resetToken: resetToken,
          resetTokenExpiry: new Date(Date.now() + 3600000),
        },
      }
    );
    const emailContent = `
  Hello ${user?.firstName},

  You've requested to reset your password. Click the link below to reset it:

  http://localhost:3001/reset-password/${resetToken}

  If you didn't request this, please ignore this email.
`;
    const mailOptions = {
      from: "wealth world",
      to: email,
      subject: "Password Reset Request",
      text: emailContent,
    };
    transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });
    res.status(200).send(resetToken);
  }
});

app.post("/reset-password", async function (req: any, res: any) {
  const saltRounds = 10;
  try {
    const token = req.body.token;
    console.log("token:" + token);
    const newPassword = req.body.newPassword;
    console.log("Newpassword: " + newPassword);
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
    await UserModel.findOneAndUpdate(
      { resetToken: token },
      {
        $set: {
          password: hashedNewPassword,
        },
      }
    );
    res.send("success");
  } catch (error) {
    console.log("error");
  }
});

app.listen(port, function () {
  console.log(`server is running on port ${port}`);
});
