import React, { useEffect, useState } from "react";
import "./Recommended.css";
import thumbnail1 from "../../assets/thumbnail1.png";
import thumbnail2 from "../../assets/thumbnail2.png";
import thumbnail3 from "../../assets/thumbnail3.png";
import thumbnail4 from "../../assets/thumbnail4.png";
import thumbnail5 from "../../assets/thumbnail5.png";
import thumbnail6 from "../../assets/thumbnail6.png";
import thumbnail7 from "../../assets/thumbnail7.png";
import thumbnail8 from "../../assets/thumbnail8.png";
import { API_KEY, valueConverter } from "../../data";
import { Link } from "react-router-dom";
function Recommended({ categoryId }) {
  let [apiData, setApiData] = useState([]);

  async function fetchData() {
    let api_url = ` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
    try {
      let res = await fetch(api_url);
      let result = await res.json();

      setApiData(result.items);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, [apiData]);

  return (
    <div className="recommended">
      {apiData &&
        apiData.map((item, index) => (
          <Link to={`/video/${categoryId}/${item.id}`} key={index} className="side-video-list">
            <img src={item.snippet.thumbnails.standard.url} alt="" />
            <div className="vid-info">
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>{valueConverter(item.statistics.viewCount)} views</p>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default Recommended;
