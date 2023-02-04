import { create, CreateOptions } from "venom-bot";

import { start } from "../controllers/venom";

export async function init(options: CreateOptions) {
    return await create(options)
        .then(
            client => {
                start(client);
                return client;
            }
        )
        .catch(
            err => console.log("Erro ao criar sessão: ", err)
        )
}