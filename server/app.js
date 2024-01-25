if (process.env.NODE_ENV !== "production") {
  require('dotenv').config()
}

const express = require('express')
const { createServer } = require('node:http')
const { Server } = require('socket.io')
const cors = require('cors')
const app = express()
const server = createServer(app);
const io = new Server(server, {
  cors: {
      origin: "http://localhost:5173"
  }
})

const routes = require('./routes')
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const extractToken = require('./helpers/extractToken')
const setCurrency = require('./helpers/setCurrency')
const { Product } = require("./models/index");

app.use(routes)

io.on('connection', (socket) => {
  socket.on("bid:new", async (newInputBid) => {
      let currencyFormatted = setCurrency(newInputBid)
      let whoIsSend = await extractToken(socket.handshake.auth.access_token)
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
          updatedAt: new Date()
      }
      io.emit("bid:update", getNewBid)
  })

  socket.on("currentBid:new", async (compareBid) => {
      const data = await Product.findOne({
          where: {
              id: compareBid.productId
          }
      })
      let newCurrentBid = Number(compareBid.newInputBid)
      if(newCurrentBid > data.currentBid){
          await data.update({ currentBid: newCurrentBid })
          io.emit("currentBid:update", newCurrentBid)
      }
  })
})


server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})