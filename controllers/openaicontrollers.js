const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);



const generateImage = async (req, res) => {

    const {prompt, imageSize} = req.body;

    if (imageSize == 'small') {
        size = '256x256'
    }
    else if (imageSize == 'medium') {
        size = '512x512'
    }
    else {
        size = '1024x1024'
    }

    //n = parseInt(num);
    try {
        const response = await openai.createImage({
            prompt,
            n : 1,
            size
        });
    
        const imageURL = response.data.data[0].url;
    
        res.status(200).json({
            msg : "The POST module works fine",
            data : imageURL
        })
    }
    catch(err) {

        if (err.response) {
            console.log(err.response.status);
            console.log(err.response.data);
        } 
        else {
            console.log(err.message);
        }

        res.status(500).json({
            msg : "The Image Could not be generated"
        })
    }
}

module.exports = {generateImage}