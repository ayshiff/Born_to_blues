import React from "react";
import { Link } from "react-router-dom";
import "../styles/LinksComponent.css";

type Props = {
  musicStyle: string,
  musicStyleDetail: string,
  musicStyleState: any
};

const LinksComponent = (props: Props) => {
  const { musicStyleState } = props;
  return (
    /**
     *  Function to create the links links
     * @param {Array} links - The array of links
     * @returns {Array<any>}
     */

    <section id="links">
      {musicStyleState.map(link => (
        <div key={link.name}>
          <h2>{link.name}</h2>
          <p>{link.title}</p>
          <Link
            to={`/${props.musicStyle}/${props.musicStyleDetail}/${link.name}`}
          >
            View more
          </Link>
        </div>
      ))}
    </section>
  );
};

export default LinksComponent;
