import './lib/dotenv'

import { CreateOptions } from "venom-bot";
import { init } from "./lib/venom";
import { ChatRepository } from "./repositories/ChatRepository";

export const chats = new ChatRepository();

const options = {
    session: "venomai-bot",
    multidevice: true
} satisfies CreateOptions

const venom = init(options)
    .then( client => {
        return client
    } )
    .catch();
