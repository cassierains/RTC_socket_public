var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { db } from "../index.js";
//post message to database
const handlePost = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    //creates message id. irrelevant until now so its done here
    let messageId = Math.random().toString(36).substring(2, 7);
    const data = {
        message: msg.message,
        conv_id: msg.conversationId,
        message_id: messageId
    };
    //firestore automatically creates the collecitons and documents specified in write 
    const write = db.collection('conversations').doc(`${data.conv_id}`).collection('message').doc(`${data.message_id}`);
    yield write.set(data);
});
export default handlePost;
