import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

//Initializations, etc.
const app = express();
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
         console.log(data)
         return data
      })
       .catch(err =>{
         console.error(`There was an error${err}`)
         throw err
      })
   }

app.get('/', async(req:any , res:any)=>{
   const vidId:string = '5mEwh4MfwB4'
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