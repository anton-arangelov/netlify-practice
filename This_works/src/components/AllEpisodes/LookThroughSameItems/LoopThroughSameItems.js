import React, { Fragment } from "react";
import classes from "./LoopThroughSameItems.module.css";
import { Link } from "react-router-dom";

const LoopThroughSameItems = (props) => {
  const characters = props.characters;
  return (
    <Fragment>
      {characters.map((el) => {
        return (
          <div key={el.id}>
            <div className={classes.Paragraph}>
              <div className={classes.ColumnOne}>
                <p>Name - {el.name}</p>
                <div>
                  <p>Status - {el.status}</p>
                  <p>Species - {el.species}</p>
                  {props.shouldNavigate ? (
                    <Fragment>
                      <Link
                        className={classes.Link}
                        to={props.toOrigin + `${el.id}`}
                      >
                        Origin - {el.origin.name}. Click to see origin
                      </Link>
                      <Link
                        className={classes.Link}
                        to={props.toLocation + `${el.id}`}
                      >
                        Location - {el.location.name}. Click to see location
                      </Link>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <p>Origin - {el.origin.name}.</p>
                      <p>
                        Location - {el.location.name}.
                      </p>
                    </Fragment>
                  )}
                  <p>Gender - {el.gender}</p>
                </div>
              </div>
              <div className={classes.ColumnTwo}>
                <img src={el.image} alt="Image" />
              </div>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default LoopThroughSameItems;
