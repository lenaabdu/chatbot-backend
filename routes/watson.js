// Import dependencies
const express = require("express");
const router = express.Router();
const AssistantV2 = require("ibm-watson/assistant/v2");
const { IamAuthenticator } = require("ibm-watson/auth");

//Create Instance of Assistant

// First authenticate
// IBM Cloud Identity and Access Management(IAM)
const authenticator = new IamAuthenticator({
    apikey: process.env.WATSON_ASSISTANT_APIKEY,
});

//  Connect to assistant
const assistant = new AssistantV2({
    version: "2020-09-24",
    authenticator: authenticator,
    url: process.env.WATSON_ASSISTANT_URL,
});

//  Route to Handle Session Tokens
// GET watson/session
router.get("/session", async(req, res) => {
    // If successs
    try {
        const session = await assistant.createSession({
            assistantId: process.env.WATSON_ASSISTANT_ID,
        });
        res.json(session["result"]);

        // If fail
    } catch (err) {
        res.send("There was an error processing your request.");
        console.log(err);
    }
});

// 4. Handle Messages
// POST watson/message
router.post("/message", async(req, res) => {
    // Construct payload
    payload = {
        assistantId: process.env.WATSON_ASSISTANT_ID,
        sessionId: req.headers.session_id,
        input: {
            message_type: "text",
            text: req.body.input,
        },
    };

    // If successs
    try {
        const message = await assistant.message(payload);
        res.json(message["result"]);

        // If fail
    } catch (err) {
        res.send("There was an error processing your request.");
        console.log(err);
    }
});

// Export routes
module.exports = router;