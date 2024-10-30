"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const sentiment_1 = __importDefault(require("sentiment"));
//Initializations, etc.
const app = (0, express_1.default)();
const sentiment = new sentiment_1.default;
dotenv_1.default.config();
const port = process.env.PORT;
const mongoUri = process.env.CONNECTION_URI;
const apiKey = process.env.APIKEY;
app.use(express_1.default.json());
const getComments = (videoId) => __awaiter(void 0, void 0, void 0, function* () {
    return fetch(`https://www.googleapis.com/youtube/v3/commentThreads?key=${apiKey}&part=snippet&videoId=${videoId}&textFormat=plainText`)
        .then((response) => {
        if (!response.ok) {
            console.log(`There was an error`);
        }
        return response.json();
    })
        .then((data) => {
        const commentsWithSentiment = data.items.map((item) => {
            const text = item.snippet.topLevelComment.snippet.textDisplay;
            const sentimentResult = sentiment.analyze(text);
            return Object.assign(Object.assign({}, item), { sentimentScore: sentimentResult.score });
        });
        console.log(commentsWithSentiment);
        return commentsWithSentiment;
    })
        .catch(err => {
        console.error(`There was an error${err}`);
        throw err;
    });
});
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vidId = '5mEwh4MfwB4';
    getComments(vidId)
        .then(comments => {
        res.json(comments);
    })
        .catch(err => {
        res.status(500).json({ error: 'Failed to fetch comments' });
    });
}));
app.get('/comments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vidId = req.query.videoId;
    if (!vidId) {
        return res.status(400).json({ error: 'Video ID is required' });
    }
    getComments(vidId)
        .then(comments => {
        res.json(comments);
    })
        .catch(err => {
        res.status(500).json({ error: 'Failed to fetch comments' });
    });
}));
app.listen(port, () => {
    return console.log(`Server running on http://localhost:${port}`);
});
