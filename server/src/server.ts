import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Sentiment from 'sentiment'
import { extractVideoId } from './services/services'

//Initializations, etc.
const app = express();
const sentiment = new Sentiment;
dotenv.config();
const port = process.env.PORT;
const mongoUri:any = process.env.CONNECTION_URI;
const apiKey:any = process.env.APIKEY;
app.use(express.json());

const getComments = async (videoId:string) =>{
      
      return fetch(`https://www.googleapis.com/youtube/v3/commentThreads?key=${apiKey}&part=snippet&videoId=${videoId}&textFormat=plainText`)
      .then((response)=>{
         if(!response.ok){
            console.log(`There was an error`)
         }
         return response.json()
      })
      .then((data)=>{
         const commentsWithSentiment = data.items.map((item:any)=>{
            const text = item.snippet.topLevelComment.snippet.textDisplay;
            const sentimentResult = sentiment.analyze(text);
            return{
               ...item,
               sentimentScore:sentimentResult.score
            };
         });
         console.log(commentsWithSentiment)
         return commentsWithSentiment
      })
       .catch(err =>{
         console.error(`There was an error${err}`)
         throw err
      })
   }

// app.get('/', async(req:any , res:any)=>{
//    const vidId:string = '5mEwh4MfwB4'
//    getComments(vidId)
//    .then(comments => {
//       res.json(comments)
//    })
//    .catch(err => {
//       res.status(500).json({ error: 'Failed to fetch comments' }); 
//    })
// })
app.get('/comments', async(req:any , res:any)=>{
   const vidId = req.query.videoId as string;
   if(!vidId){
      return res.status(400).json({error: 'Video ID is required'})
   }
   getComments(vidId)
   .then(comments => {
      res.json(comments)
   })
   .catch(err => {
      res.status(500).json({ error: 'Failed to fetch comments' }); 
   })
})

app.listen(port, ()=>{
   return console.log(`Server running on http://localhost:${port}`)
})