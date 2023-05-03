import type { Request, Response } from "express"
import express from 'express'
import { createServer } from "http"
import { Server, Socket } from "socket.io"
import handlePost from "./api/new_message.js"
import { MessageData } from "./types.js"

//express app
const app = express()
const port = 8080
const httpServer = createServer(app)

app.get('/', (req: Request, res: Response) => {
  res.send('socket connected')
})

httpServer.listen(port, () => {
  console.log(`listening on port ${port}`)
})


//socket app
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  }
})

io.on('connection', (socket: Socket) => {
  console.log('user connected')

  //recieves new messages and sends to database
  socket.on("chat message", (msg) => {
    handlePost(msg)
    console.log(msg)
  })

  //this code runs on disconnect
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})



//initialize firestore app
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore'

import serviceAccount from './serviceAccountKey.json' assert { type: "json"}

const params = {
//keys go here
}

initializeApp({
    credential: cert(params)
});

export const db = getFirestore();

