import React, { useEffect, useState } from "react";
import classes from "./Location.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams} from "react-router-dom";
import { episodesActions } from "../../store/episodes-slice.js";
import axios from "axios";
import Pagination from "../Pagination/Pagination.js";
import LoopThroughSameItems from "../AllEpisodes/LookThroughSameItems/LoopThroughSameItems";


const Location = (props) => {
  useEffect(() => {
    let updatedResidents = [];
    const fetchLocationHandler = async (url) => {
      const response = await axios.get(url);

      const fetchedLocations = await response.data;
      const fetchLocationsHandler = async (url) => {
        const response = await axios.get(url);

        const fetchedLocationResidents = await response.data;
        updatedResidents.push(fetchedLocationResidents);
        updatedResidents.sort();
        dispatch(
          episodesActions.saveLocationResidents({
            locationResidents: [...updatedResidents],
          })
        );
      };

      try {
        fetchedLocations.residents.map((el) => {
          fetchLocationsHandler(el);
        });
      } catch (error) {
        console.log(error);
      }
    };
    try {
      fetchLocationHandler(urlLocation);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const stateCharactersForEpisode = useSelector(
    (state) => state.episodes.charactersForEpisode
  );
  
  const stateLocationResidents = useSelector(
    (state) => state.episodes.locationResidents
  );

  const [currentPage, setCurrentPage] = useState("1");
  const [postsPerPage, setPostsPerPage] = useState("10");
  const dispatch = useDispatch();

  // const match = useRouteMatch();
  // console.log(match.path);
  // console.log(match.url);

  const params = useParams();

  dispatch(
    episodesActions.selectCharacterId({
      selectedCharacterId: params.charId,
    })
  );

  const selectedCharacter = stateCharactersForEpisode.filter((el) => {
    return el.id === parseInt(params.charId);
  });

  const urlLocation = selectedCharacter[0].location.url;

  const indexOfFirstNextPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfFirstNextPost - postsPerPage;
  let currentPosts = stateLocationResidents.slice(
    indexOfFirstPost,
    indexOfFirstNextPost
  );
  const paginateHandler = (number) => {
    setCurrentPage(number);
  };

  return (
    <div className={classes.Location}>
      <p className = {classes.Text}>
        All residents in {selectedCharacter[0].location.name} are{" "}
        {stateLocationResidents.length}. They are:
      </p>

      <LoopThroughSameItems
        characters={currentPosts}
        toOrigin={`/${parseInt(params.charId)}/origin/`}
        toLocation={``}
      />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={stateLocationResidents.length}
        paginateHandler={paginateHandler}
        shouldNavigate = {false}
      />
    </div>
  );
};

export default Location;
