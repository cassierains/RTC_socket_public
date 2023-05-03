import { db } from "../index"
import { MessageData } from "../types"

const handleListen = async () => {
    const listen = db.collection('conversations').doc().collection('message').doc()
    //const observer = listen.onSnapshot(docSnapshot => {

    //})
}

export default handleListen