import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { propEq, filter, has, find } from "ramda";
import pointFreeUpperCase from "../../utils/pointFreeUpperCase";
import Vinyle from "../../utils/vinyle";
import "./styles/MusicStyleSubDetailsComponent.css";

// Import fetch color util
import fetchColor from "../../utils/fetch";

// Import break Words
import breakWords from "../../utils/breakWords";

// import header Component
import HeaderComponent from "../../utils/headerComponent";
import AudioComponent from "./components/AudioComponent";

type Props = {
  params: {
    musicStyle: string,
    musicStyleDetail: string,
    musicStyleSubDetail: string
  },
  translateFunction: {
    translate: string => string
  }
};

type State = {
  musicStyleState: any
};

class MusicStyleSubDetailsComponent extends Component<Props, State> {
  state = {
    musicStyleState: null,
    navBarState: [],
    indexDescription: 0
  };

  /**
   *  Function to create the musician links
   * @param {Array} musicians - The array of musicians
   * @param {string} musicStyleDetail
   * @returns {Array<any>}
   */

  renderArtistsLinks = (
    musicians: Array<any>,
    authorName,
    musicStyle,
    musicDetail
  ): Array<any> =>
    musicians.map(
      musician =>
        authorName !== musician.name && (
          <div key={musician.name}>
            <Link
              onClick={() => {
                this.fetchData(musicStyle, musicDetail, musician.name);
              }}
              to={`/${musicStyle}/${musicDetail}/${musician.name}`}
            >
              {musicDetail === "artists" ? (
                <Vinyle
                  img={musician.img}
                  alt={`${musician.name} musician logo`}
                />
              ) : (
                <img src={musician.img} alt={`${musician.name} logo`} />
              )}
            </Link>
          </div>
        )
    );

  renderNavigationSubDetails = (arrayElement): Array<any> => {
    const { indexDescription } = this.state;
    return arrayElement.map((element, index) => (
      <li key={Math.random()}>
        <Link
          className={indexDescription === index ? "active" : ""}
          to=""
          onClick={e => {
            e.preventDefault();
            this.setState({ indexDescription: index });
          }}
        />
      </li>
    ));
  };

  componentWillMount = () => {
    const {
      params: { musicStyle, musicStyleDetail, musicStyleSubDetail }
    } = this.props;
    this.fetchData(musicStyle, musicStyleDetail, musicStyleSubDetail);
    fetchColor(musicStyle, this);
  };

  playerAudio = anecdoteState =>
    anecdoteState.map(element => (
      <AudioComponent
        videoId={
          element.src.match(
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i
          )[1]
        }
        music={element.name}
        artist={element.author}
      />
    ));

  fetchData = (musicStyle, musicStyleDetail, musicStyleSubDetail) => {
    const hasSong = has("songs");

    fetch(
      `${process.env.REACT_APP_DB_URL}/api/${musicStyleDetail}/${musicStyle}`
    )
      .then(res => res.json())
      .then(musicStyleState => {
        this.setState({
          navBarState: musicStyleState,
          musicStyleState: find(propEq("name", musicStyleSubDetail))(
            musicStyleState
          ),
          indexDescription: 0
        });
        if (musicStyleState.map(e => hasSong(e))) {
          fetch(`${process.env.REACT_APP_DB_URL}/api/song/${musicStyle}`)
            .then(res => res.json())
            .then(songs => {
              this.setState({
                songs
              });
            });
        }
      });
  };

  toggleAudio = () => {};

  render() {
    const { params } = this.props;
    const { color } = this.state;

    const styleColor = color;

    const css = `
      #header a.headerLink:before{
          background: ${styleColor};
      }
      #header a.headerLink:after{
          background: ${styleColor};
      }
      .playMusic i {
          color: ${styleColor};
      }
      .playMusic button {
          border: 1px solid ${styleColor};
      }
      .playMusic div:before {
          background: ${styleColor};
      }
      .navSubDetails a.active:before{
          background: ${styleColor};
      }
    `;

    const {
      musicStyleState,
      songs,
      navBarState,
      indexDescription
    } = this.state;
    const authorName = musicStyleState && musicStyleState.name;
    const anecdoteState = songs && filter(propEq("author", authorName))(songs);

    return (
      <section>
        <style>{css}</style>
        <HeaderComponent params={params} />
        <div id="wrap">
          <div className="flex">
            <h1>
              <span>{pointFreeUpperCase(params.musicStyleSubDetail)}</span>
            </h1>

            <section id="artistDetails">
              <div className="content">
                <Link
                  className="back"
                  to={`/${params.musicStyle}/${params.musicStyleDetail}`}
                >
                  <i className="fas fa-long-arrow-alt-left" />
                </Link>
                <h2>{musicStyleState && musicStyleState.title}</h2>
                <p className="text">
                  {musicStyleState &&
                    breakWords(musicStyleState.description)[indexDescription]}
                </p>
                <div>{songs && this.playerAudio(anecdoteState)}</div>
                <ul className="navSubDetails">
                  {musicStyleState &&
                    this.renderNavigationSubDetails(
                      breakWords(musicStyleState.description)
                    )}
                </ul>
              </div>
              <div className="nav">
                {this.renderArtistsLinks(
                  navBarState,
                  authorName,
                  params.musicStyle,
                  params.musicStyleDetail
                )}
              </div>
            </section>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(MusicStyleSubDetailsComponent);
