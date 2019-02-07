import React from "react";
import { Link } from "react-router-dom";
import { find, propEq } from "ramda";
import breakWord from "../../../utils/breakWords";

type Props = {
  musicStyle: string,
  musicStyleDetail: string,
  musicStyleState: any
};

class ArtistsComponent extends React.Component {
  state = { anecdote: null };

  InfluenceNavigation = ({
    arrayElement
  }: {
    arrayElement: Array<string>
  }): Array<any> =>
    arrayElement.map(detail => (
      <li key={detail}>
        <Link
          to=""
          onClick={e => {
            e.preventDefault();
            this.setState({ anecdote: detail });
          }}
        >
          {detail}
        </Link>
      </li>
    ));

  renderContent = text => text.map(element => <p>{element}</p>);

  render() {
    const { musicStyleDetail, musicStyle, musicStyleState } = this.props;
    const { anecdote } = this.state;
    const arrayElement = musicStyleState.map(e => e.name);
    const anecdoteFirstName = anecdote || musicStyleState[0].name;
    const anecdoteState = find(propEq("name", anecdoteFirstName))(
      musicStyleState
    );

    return (
      <section id="anecdote" className="influence">
        <div className="text">
          <div>
            <h2>{anecdoteState && anecdoteState.name}</h2>
            {anecdoteState &&
              this.renderContent(breakWord(anecdoteState.description))}
          </div>
        </div>
        <div className="video">
          <div>
            <img
              src={
                anecdoteState &&
                anecdoteState.songs &&
                JSON.parse(anecdoteState.songs).image
              }
              alt=""
            />
          </div>
        </div>
        <div className="nav">
          <h3>More anecdotes</h3>
          <ul>
            <this.InfluenceNavigation arrayElement={arrayElement} />
          </ul>
        </div>
      </section>
    );
  }
}

export default ArtistsComponent;
