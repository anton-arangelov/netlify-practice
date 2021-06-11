import React, { useEffect, useState } from "react";
import classes from "./Origin.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { episodesActions } from "../../store/episodes-slice.js";
import axios from "axios";
import Pagination from "../Pagination/Pagination";

const Origin = (props) => {
  useEffect(() => {
    let updatedResidents = [];
    const fetchOriginHandler = async (url) => {
      const response = await axios.get(url);

      const fetchedOrigins = await response.data;
      const fetchOriginHandler = async (url) => {
        const response = await axios.get(url);

        const fetchedOriginResidents = await response.data;
        updatedResidents.push(fetchedOriginResidents);
        updatedResidents.sort();
        dispatch(
          episodesActions.saveOriginResidents({
            originResidents: [...updatedResidents],
          })
        );
      };

      try {
        fetchedOrigins.residents.map((el) => {
          fetchOriginHandler(el);
        });
      } catch (error) {
        console.log(error);
      }
    };
    try {
      fetchOriginHandler(ulrOrigin);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const stateCharacters = useSelector((state) => state.episodes.charactersForEpisode);
  const stateOriginResidents = useSelector(
    (state) => state.episodes.originResidents
  );

  const [currentPage, setCurrentPage] = useState('1')
  const [postsPerPage, setPostsPerPage] = useState('10')

  const dispatch = useDispatch();

  const params = useParams();
  dispatch(
    episodesActions.selectCharacterId({
      selectedCharacterId: params.charId,
    })
  );

  const selectedCharacter = stateCharacters.filter((el) => {
    return el.id === parseInt(params.charId);
  });

  const ulrOrigin = selectedCharacter[0].origin.url;

  const indexOfFirstNextPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfFirstNextPost - postsPerPage;
  let currentPosts = stateOriginResidents.slice(
    indexOfFirstPost,
    indexOfFirstNextPost
  );

  const paginateHandler = (number) => {
    setCurrentPage(number);
  };

  return (
    <div className={classes.Origin}>
      <p>
        All residents in {selectedCharacter[0].origin.name} are{" "}
        {stateOriginResidents.length}. They are:
      </p>
      {currentPosts.map((el) => {
        return <p key={el.id}>Name of resident - {el.name}</p>;
      })}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={stateOriginResidents.length}
        paginateHandler={paginateHandler}
      />
    </div>
  );
};

export default Origin;
