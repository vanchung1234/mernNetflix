import React from 'react'
import Featured from '../component/featured/featured'
import List from '../component/list/List'
import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from '../contexts/constants';

const Dashboard = ({ type }) => {

  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `${apiUrl}/lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`
        );
        setLists(res.data);
        return () => {
          setLists({}); 
        };
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);
    return (
        <div className='Home'>
         <Featured type={type} setGenre={setGenre} />
      {lists.map((list) => (
        <List list={list} key={list._id} />
      ))}
        </div>  
    )
}

export default Dashboard
