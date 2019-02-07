//
import React, { Component } from "react";
import YouTube from "react-youtube";

type Props = {
  videoId: string,
  music: string,
  artist: string
};

type State = {};

export default class AudioComponent extends Component<Props, State> {
  state = {
    button: "fa-play",
    player: null
  };

  _onReady = event => {
    // access to player in all event handlers via event.target
    // event.target.pauseVideo();
    this.setState({
      player: event.target
    });
  };

  toggleMusic = () => {
    const { player } = this.state;
    if (player) {
      if (player.getPlayerState() !== 1) {
        player.playVideo();
        this.setState({
          button: "fa-pause"
        });
      } else {
        player.pauseVideo();
        this.setState({
          button: "fa-play"
        });
      }
    }
  };

  render() {
    const { videoId, music, artist } = this.props;
    const { button } = this.state;

    return (
      <div className="playMusic">
        <button onClick={this.toggleMusic}>
          <i className={`fas ${button}`} />
        </button>
        <YouTube
          videoId={videoId}
          containerClassName="youtube"
          onReady={this._onReady}
        />
        <div>
          <p>{music}</p>
          <p>{artist}</p>
        </div>
      </div>
    );
  }
}
