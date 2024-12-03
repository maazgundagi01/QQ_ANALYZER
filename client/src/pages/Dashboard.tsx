import React from 'react';
import TitleBar from "../components/TitleBar";
import video1 from "../assets/1115063_Broadcast_Man_1280x720.mp4"
import axios from 'axios';
import { useState } from 'react';


export default function Dashboard() {
  const [videoId, setVideoId] = useState<string>('');
  const [comments, setComments] = useState<any>([]);
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoId(event.target.value);
 };

  const fetchComments = () => {
    axios.get(`http://173.255.206.46:8001/comments?videoId=${videoId}`)
      .then((response) => setComments(response.data))
      .catch((error) => console.error("Error fetching comments:", error));
  };
  

  function getSentimentColor(val: number) {
    if (val > 0) {
      return 'text-green-500'; // Tailwind CSS class for green text
    } else if (val < 0) {
      return 'text-red-500'; // Tailwind CSS class for red text
    } else {
      return 'text-gray-500'; // Tailwind CSS class for gray text
    }
  }

  function commentDisplay(){
    if(comments){return comments.map((comment: any, index: number) => (
      <div key={index} className="p-2 border-b border-gray-200">
        <p className={`text-xl ${getSentimentColor(comment.sentimentScore)}`}>
          Sentiment Score:<strong>{comment.sentimentScore}</strong>
        </p>
        <p><strong>User:</strong> {comment.snippet.topLevelComment.snippet.authorDisplayName}</p>
        <p><strong>Comment:</strong> {comment.snippet.topLevelComment.snippet.textDisplay}</p>
      </div>
    ))}else{
      return 'Search something'
    }
  }

  return (
    <>
      <TitleBar title="Dashboard " />
      <main className="h-screen"> {/* Set main to full viewport height */}
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 h-full">
          {/* Top Section */}
          <section className="relative flex flex-col items-center justify-center h-1/2 mb-0 rounded-lg overflow-hidden"> {/* Set height to 50% and remove bottom margin */}
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
            >
              <source src={video1} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20"></div> {/* Adjust opacity as needed */}
            <div className="relative z-10 text-center"> {/* Ensure text is above the video and overlay */}
              <h1 className="mx-2 text-5xl text-white font-bold text-shadow">Sentiment Analysis for YouTube Videos</h1>
              <h2 className="text-white text-xl font-medium mt-6 text-shadow">Video comment section might be full of fans or trolls, but as long as it's full it has data!</h2>
              <p className="text-white mb-6 text-shadow">Understand what your audience feels, not just what they say</p>
              <input onChange={handleInputChange}
                type="text"
                placeholder="Enter YouTube Video URL"
                className="border border-gray-300 rounded-lg p-2 mb-4 w-full max-w-md"
              />
              <div className="flex justify-center"> {/* Center the button */}
                <button onClick={fetchComments} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg mt-2">
                  Submit
                </button>
              </div>
            </div>
          </section>

          {/* Bottom Section */}
          <section className="flex flex-col md:flex-row mt-8 flex-grow space-y-4 md:space-y-0 md:space-x-4">
            {/* Comments Section (30% width) */}
            <div className="bg-white shadow-lg rounded-lg p-4 md:w-1/3 flex-grow">
              <h2 className="text-xl font-semibold mb-2">Analyze</h2>

              <div className="h-48 rounded-lg"></div> {/* Placeholder for comments */}
            </div>

            {/* Analysis Section (60% width) */}
            <div className="bg-white shadow-lg rounded-lg p-4 md:w-2/3 flex-grow  overflow-scroll">
              <h2 className="text-xl font-semibold mb-2">Comments</h2>
              {
                commentDisplay()
              }
            <div className="h-48 rounded-lg"></div> {/* Placeholder for analysis */}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}