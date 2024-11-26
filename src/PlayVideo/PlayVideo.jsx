import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import video1 from "../assets/video.mp4";
import like from "../assets/like.png";
import dislike from "../assets/dislike.png";
import share from "../assets/share.png";
import save from "../assets/save.png";
import jack from "../assets/jack.png";
import user_profile from "../assets/user_profile.jpg";
import { API_KEY, valueConverter } from "../data";
import moment from "moment";
import { useParams } from "react-router-dom";

function PlayVideo() {
  let {videoId}=useParams()
  let [apiData, setApiData] = useState(null);
  let [channelData, setChannelData] = useState(null);
  let [commentData, setCommentData] = useState(null);

  async function fetchVideoData() {
    //fetching video Data

    try {
      // let videoDetails_url=` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&&id=${videoId}&key=${API_KEY}`
      const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;

      let res = await fetch(videoDetails_url);
      let result = await res.json();

      if (result) {
        setApiData(result.items[0]);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function fetchchannelData() {
    //fetching channel Data

    try {
      // let channelDataApi = `https://youtube.googleapis.com/youtube/v3/channels&?id=${apiData.snippet.channelId}&key=${API_KEY}`;

      let channelDataApi = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;

      let res = await fetch(channelDataApi);
      let result = await res.json();

      setChannelData(result.items[0]);
    } catch (e) {
      console.log(e);
    }

  }


//fetching Comment Data
 async function fetchCommentData(){
  try{
  let comment_url = ` https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`;

  let res = await fetch(comment_url);

  let result = await res.json();

  setCommentData(result.items);
  }catch(e){
    console.log(e);
    
  }
 }



  useEffect(() => {
    fetchCommentData();
  }, [videoId]);

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchchannelData();
  }, [apiData]);

  return (
    <div className="play-video">
      {/* <video autoPlay muted controls src={video1}></video> */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
      <div className="play-video-info">
        <p>
          {valueConverter(apiData ? apiData.statistics.viewCount : "16k")} views
          &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apiData ? valueConverter(apiData.statistics.likeCount) : "22"}
          </span>
          <span>
            <img src={dislike} alt="" />
          </span>
          <span>
            <img src={share} alt="" />
            share
          </span>
          <span>
            <img src={save} alt="" />
            save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={
            channelData
              ? channelData.snippet.thumbnails.default.url
              : user_profile
          }
          alt=""
        />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : "semonStack"}</p>
          <span>
            {channelData
              ? valueConverter(channelData.statistics.subscriberCount)
              : "1M"}{" "}
            Subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="video-description">
        <p>
          {apiData
            ? apiData.snippet.description.slice(1, 250)
            : "Description Here"}
        </p>
        <hr />
        <h4>
          {apiData ? valueConverter(apiData.statistics.commentCount) : ""}{" "}
          Comments
        </h4>
        {
          commentData&&commentData.map((item,index)=>{return(
            <div key={index} className="comment">
            <img src={
                 item?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl
                 ||user_profile} alt="" />
            <div>
              <h3>
                {
                 item.snippet.topLevelComment.snippet.authorDisplayName
                }<span>{moment(item.snippet.topLevelComment.snippet.updatedAt).fromNow() }</span>
              </h3>
              <p>
              {
                item.snippet.topLevelComment.snippet.textDisplay
              }
              </p>
              <div className="comment-action">
                <img src={like} alt="" />
                <span>{item
                ? valueConverter(item.snippet.topLevelComment.snippet.likeCount) 
                : user_profile}</span>
                <img src={dislike} alt="" />
              </div>
            </div>
          </div>

          )})
        }



      </div>
    </div>
  );
}

export default PlayVideo;
