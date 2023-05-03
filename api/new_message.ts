import { db } from "../index.js"
import { MessageData } from '../types.js'

//post message to database
const handlePost = async (msg: any) => {
  //creates message id. irrelevant until now so its done here
    let messageId: string = Math.random().toString(36).substring(2,7)
    const data: MessageData = {
        message: msg.message,
        conv_id: msg.conversationId, //from front-end
        message_id: messageId
    }

    //firestore automatically creates the collecitons and documents specified in write 
    const write = db.collection('conversations').doc(`${data.conv_id}`).collection('message').doc(`${data.message_id}`)
    await write.set(data)
}

export default handlePost