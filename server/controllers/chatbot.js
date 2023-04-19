import {Configuration, OpenAIApi} from 'openai'

const configuration = new Configuration({
    organization: process.env.OPENAI_ORG_KEY ,
    apiKey: process.env.OPENAI_SECRET_KEY , 
})
const openai = new OpenAIApi(configuration)

export const ChatbotAPI = async (req, res) => {
    const {message} = req.body

    try{
        const response = await openai.createCompletion({ 
            model: "text-davinci-003",
            prompt: `${message}`,
            max_tokens: 100,
            temperature: 0.5 
        })
        res.json({message: response.data.choices[0].text})

    }catch(error){
        console.log(error)
        res.status(400).send(error)
    }
}