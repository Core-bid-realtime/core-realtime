const express = require("express");
const app = express();
const routes = require("./routes");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const cors = require("cors");
app.use(cors());

const { createServer } = require("node:http");
const { Server } = require("socket.io");
const { Product } = require("./models/index");

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  socket.on("bid:new", async (newInputBid) => {
    let currencyFormatted = setCurrency(newInputBid);
    let whoIsSend = await extractToken(socket.handshake.auth.access_token);
    let getNewBid = {
      User: {
        id: whoIsSend.id,
        fullname: whoIsSend.fullname,
        email: whoIsSend.email,
        createdAt: whoIsSend.createdAt,
        updatedAt: whoIsSend.updatedAt,
      },
      UserId: whoIsSend.id,
      bidAmount: currencyFormatted,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    io.emit("bid:update", getNewBid);
  });

  socket.on("currentBid:new", async (compareBid) => {
    const data = await Product.findOne({
      where: {
        id: compareBid.productId,
      },
    });
    let newCurrentBid = Number(compareBid.newInputBid);
    if (newCurrentBid > data.currentBid) {
      await data.update({ currentBid: newCurrentBid });
      io.emit("currentBid:update", newCurrentBid);
    }
  });
});

app.use(routes);

module.exports = app;
