import React, { Component } from "react";
import { Player } from "video-react";
import { Link } from "react-router-dom";
import { find, propEq } from "ramda";

type Props = {
  musicStyle: string,
  musicStyleDetail: string,
  musicStyleState: any
};

export default class AnecdoteComponent extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      buttonVideo: "play",
      anecdote: null
    };
  }

  componentDidMount() {
    // subscribe state change
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  AnecdoteNavigation = ({
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

  videoToggle = () => {
    const { player } = this.state;
    if (player.paused) {
      this.player.play();
      this.setState({
        buttonVideo: "pause"
      });
    } else {
      this.player.pause();
      this.setState({
        buttonVideo: "play"
      });
    }
  };

  handleStateChange(state) {
    // copy player state to this component's state
    this.setState({
      player: state
    });
    if (state.ended) {
      this.setState({
        buttonVideo: "play"
      });
    }
  }

  render() {
    const { buttonVideo, anecdote } = this.state;
    const { musicStyleState } = this.props;
    const arrayElement = musicStyleState.map(e => e.name);
    const anecdoteFirstName = anecdote || musicStyleState[0].name;
    const anecdoteState = find(propEq("name", anecdoteFirstName))(
      musicStyleState
    );

    return (
      <section id="anecdote">
        <div className="text">
          <div>
            <h2>{anecdoteState && anecdoteState.name}</h2>
            <p>{anecdoteState && anecdoteState.description}</p>
          </div>
        </div>
        <div className="videoWrap">
          <div className="video">
            <div>
              <Player
                playsInline
                poster={
                  anecdoteState &&
                  anecdoteState.songs &&
                  JSON.parse(anecdoteState.songs).image
                }
                src={
                  anecdoteState &&
                  anecdoteState.songs &&
                  JSON.parse(anecdoteState.songs).content
                }
                // eslint-disable-next-line
                ref={elm => (this.player = elm)}
              />
            </div>
          </div>
          {anecdoteState &&
          anecdoteState.songs &&
          JSON.parse(anecdoteState.songs).content && (
            <button className="buttonVideoToggle" type="button" onClick={() => this.videoToggle()}>
              <i className={`fas fa-${buttonVideo}`} />
            </button>
          )}
        </div>
        <div className="nav">
          <h3>More anecdotes</h3>
          <ul>
            <this.AnecdoteNavigation arrayElement={arrayElement} />
          </ul>
        </div>
      </section>
    );
  }
}
