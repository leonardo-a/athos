import { openai as OpenAI } from "../lib/openAi";

export async function generateCompletion(prompt: string){
    const response = await OpenAI.createCompletion({
        model: "text-davinci-003",
        prompt,
        temperature: 0.9,
        max_tokens: 300,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
        stop: ["Human:"]
    })

    return response.data.choices[0].text;
}