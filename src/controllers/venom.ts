import { Whatsapp } from "venom-bot";
import { ChatRepository } from "../repositories/ChatRepository";

export function start(client: Whatsapp) {

    const chatRepository = new ChatRepository();

    client.onMessage(async (message) => {
        if (message.isGroupMsg === false) {

            if(message.body.toLowerCase() === "encerrar") {
                chatRepository.closeChat(message.from);

                return client.sendText(message.from, "Chat encerrado com o bot")
            }

            const response = await chatRepository.messageProcess(message);
            
            if(response) {
                client
                    .sendText(message.from, response)
                    .then((result) => {
                    })
                    .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                    });
            }
        }
    });
}