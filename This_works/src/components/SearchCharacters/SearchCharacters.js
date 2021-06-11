import React, {useState, Fragment} from "react";
import classes from "./SearchCharacters.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LoopThroughSameItems from "../AllEpisodes/LookThroughSameItems/LoopThroughSameItems";
import Pagination from "../Pagination/Pagination";

const SearchCharacters = (props) => {
  const [currentPage, setCurrentPage] = useState("1");
  const [postsPerPage, setPostsPerPage] = useState("10");
  let searchResultArray = [];
  const params = useParams().searchValue;
  const stateAllCharacters = useSelector(
    (state) => state.episodes.allCharacters
  );
  const stateSelectedCharacterId = useSelector(
    (state) => state.episodes.selectedCharacterId
  );
  stateAllCharacters.map((el) => {
    if (el.name.toLowerCase().includes(params.toLowerCase())) {
      searchResultArray.push(el);
    }
  });
  console.log(searchResultArray);

  const indexOfFirstNextPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfFirstNextPost - postsPerPage;
  let currentPosts = searchResultArray.slice(
    indexOfFirstPost,
    indexOfFirstNextPost
  );

  const paginateHandler = (number) => {
    setCurrentPage(number);
  };

  return (
    <Fragment>
      <LoopThroughSameItems
        characters={currentPosts}
        toOrigin={`/origin/`}
        toLocation={`/location/`}
        shouldNavigate={true}
      />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={searchResultArray.length}
        paginateHandler={paginateHandler}
      />
    </Fragment>
  );
};

export default SearchCharacters;
