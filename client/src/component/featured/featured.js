import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import "./featured.scss"
import { useEffect, useState } from "react";
import axios from 'axios'
import { apiUrl } from "../../contexts/constants";
import { Link } from "react-router-dom";
export default function Featured({ type, setGenre }) {
  const [content, setContent ] = useState({})

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`${apiUrl}/movies/random?type=${type}`)
        setContent(res.data[0])
      } catch (error) {
        console.log(error)
      }
    }
    getRandomContent()
  }, [type])
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>Catelogy</span>
          <select name="genre" id="genre" onChange={(e) => setGenre(e.target.value)}>
            <option >Genre</option>
            <option value="music">Music</option>
            <option value="game">Game</option>
            <option value="sport">Sport</option>

          </select>
        </div>
      )}
      <img
        src={content.img}
        alt=""
      />
      <div className="info">
      <span className="desc">
        {content.title}
        </span>
        <span className="desc">
          
        {content.desc}
        </span>
        <div className="buttons">
        <Link style={{textDecoration: "none"}} className="Link-1" to="/watch" state={{ movie: content }}>
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
        </Link>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}