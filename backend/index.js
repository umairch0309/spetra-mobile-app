const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
// const helmet = require("helmet");
const fetch = require("node-fetch");
var morgan = require("morgan");
const authRouter = require("./api/controllers/auth/router");
const docProfileRouter = require("./api/controllers/docProfile/router");
const patProfileRouter = require("./api/controllers/patProfile/router");
const adminRouter = require("./api/controllers/admin/router");
const paymentRouter = require("./api/controllers/payment/router");
const videoChatRouter = require("./api/controllers/videoChat/router");
const chatRouter = require("./api/controllers/chat/router");
const bookingRouter = require("./api/controllers/booking/router");
const notificationRouter = require("./api/controllers/notification/router");
const questionRouter = require("./api/controllers/question/router");
const insuranceRouter = require("./api/controllers/insurance/router");
const errorMiddlware = require("./api/middlewares/errors");
const cron = require("node-cron");
const chalk = require("chalk");

const removeTimeSlots = require("./helpers/removeTimeSlots");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { saveMessage } = require("./api/services/chat.service");
const { saveFile } = require("./api/services/chat.service");

const { writeFile, promises } = require("fs");

//@initializing App
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
  maxHttpBufferSize: 1e8,
});

app.use(morgan("dev"));
/* Sockets */
io.on("connection", async (socket) => {
  /* When a user joins chat room */
  socket.on("join", (data) => {
    socket.join(data.chatRoomId);
  });

  /* On Sending a message */
  socket.on("chat", async (payload) => {
    const message = await saveMessage(payload);
    console.log("payload :", payload);
    io.sockets.in(payload.chatRoomId).emit("chat", message);
  });

  socket.on(
    "upload",
    async (
      file,
      fileName,
      fileType,
      senderId,
      bookingId,
      receiver,
      callback
    ) => {
      try {
        const replaceBlank = fileName.replace(/\s/g, "_");
        const currentDate = new Date().getTime();
        const path = `api/data/pictures/${currentDate}_${replaceBlank}`;
        await promises.writeFile(`./${path}`, file);
        const data = await saveFile({
          file: {
            fileName: replaceBlank,
            fileType,
            file: `api/data/pictures/${currentDate}_${replaceBlank}`,
          },
          sender: senderId,
          chatRoomId: bookingId,
          receiver,
        });

        io.sockets.in(bookingId).emit("chat", data);
        if (typeof callback === "function") callback(true, "Sent");
      } catch (error) {
        if (typeof callback === "function") callback(false, error.message);
      }
    }
  );
  socket.on(
    "mob-upload",
    async (
      file,
      fileName,
      fileType,
      senderId,
      bookingId,
      receiver,
      callback
    ) => {
      try {
        const replaceBlank = fileName.split(".").slice(0, -1).join(".");
        const currentDate = new Date().getTime();

        const path = `api/data/pictures/${currentDate}_${replaceBlank}`;
        fs.writeFile(
          `./${path}`,
          file,
          {
            encoding: "base64",
            flag: "w",
            mode: 0o666,
          },
          (err) => {
            if (err) {
              console.log(err);
              return;
            }
            return;
          }
        );
        const data = await saveFile({
          ...file,
          file: {
            fileName: replaceBlank,
            fileType,
            file: `api/data/pictures/${currentDate}_${replaceBlank}`,
          },
          sender: senderId,
          chatRoomId: bookingId,
          receiver,
        });
        console.log(data);
        io.sockets.in(bookingId).emit("chat", data);

        if (typeof callback === "function") callback(true, "Sent");
        console.log("fileName :", fileType);
      } catch (error) {
        if (typeof callback === "function") callback(false, error.message);
      }
    }
  );
});

cron.schedule("0 0 * * *", () => {
  removeTimeSlots();
});

app.use(cors());
// app.use(helmet());

require("dotenv").config({ path: ".env" });
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// Body parser
app.use(express.json());
app.use(cors());

app.use(errorMiddlware);

app.use("/api/v1/docprofile", docProfileRouter);
app.use("/api/v1/patprofile", patProfileRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/videoChat", videoChatRouter);
app.use("/api/v1/booking", bookingRouter);
app.use("/api/v1/notification", notificationRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/insurance", insuranceRouter);
app.use("/api/v1/question", questionRouter);

app.use(
  "api/data/pictures",
  express.static(path.resolve(__dirname, "api/data/pictures"))
);

app.use("/admin", express.static(path.join(__dirname, "../admin/build")));

app.get("/admin/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../admin/build/index.html"));
});

app.use("/", express.static(path.join(__dirname, "../frontend/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});
// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(
    chalk.bold.red(`ERROR MESSAGE: `),
    chalk.bold.blue(`${err.message}`)
  );
  // console.log(chalk.bold.red(`ERROR STACK: `), `${err.stack}`);
  console.log(chalk.red("Shutting Down Server due to Uncaught Exception"));
  process.exit(1);
});

// Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(
    chalk.bold.red(`ERROR MESSAGE: `),
    chalk.bold.blue(`${err.message}`)
  );
  console.log(chalk.bold.red(`ERROR STACK: `), `${err.stack}`);
  console.log(
    chalk.bold.red(
      "Shutting down the server due to Unhandled Promise rejection"
    )
  );
  process.exit(1);
});

mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB Database Connected");
  })
  .catch((error) => {
    console.log("MongoDB Connection ERROR :", error);
  });
server.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT : ${process.env.PORT} .`);
});
