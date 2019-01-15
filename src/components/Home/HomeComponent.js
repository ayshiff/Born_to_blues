// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles/HomeComponent.css";
import logo from "./assets/img/logo.png"
import { Player } from 'video-react';
import homeVideo from './assets/video/video_introduction.mp4';
import pointFreeUpperCase from "../../utils/pointFreeUpperCase";

// import music_styles_logo
import rap from './assets/img/vinyle-rap.png';
import jazz from './assets/img/vinyle-jazz.png';
import country from './assets/img/vinyle-country.png';
import rock from './assets/img/vinyle-rock.png';

/** List of music styles */
const MUSIC_STYLES_LOGO: Array = [
  {
    logo: rap,
    title: "rap"
  },
  {
    logo: jazz,
    title: "jazz"
  },
  {
    logo: country,
    title: "country"
  },
  {
    logo: rock,
    title: "rock"
  }
];

type Props = {
  translateFunction: {
    translate: string => string
  }
};

/**
 *  Home Component
 */

export default class HomeComponent extends Component<Props> {
  constructor(props) {
    super(props);
    this.styleOver = this.styleOver.bind(this);
    this.styleNotOver = this.styleNotOver.bind(this);
    this.skipVideo = this.skipVideo.bind(this);
  }

  state = {
    displayVideo: true
  }

  componentWillMount(): void {
    this.styleNotOver();
  }

  /**
   *  Function to create the music links
   * @param {Array} musicStylesLogo - The array of music styles logos
   * @returns {Array<any>}
   */
  renderMusicStyleLinks = (musicStylesLogo: Array): Array<any> =>
    musicStylesLogo.map((musicStyleLogo) => (
    <li key={musicStyleLogo.title}>
      <Link
        to={`/${musicStyleLogo.title}`}
        onMouseEnter={() => (this.styleOver(musicStyleLogo.title))}
        onMouseLeave={this.styleNotOver}
      >
      <img src={musicStyleLogo.logo} alt={`${musicStyleLogo.title} style logo`}/>
      </Link>
    </li>
  ));

  /**
   * function called 'onMouseEnter' on music style Link
   * change h1 content
   */
  styleOver(title){
    this.setState({
      homeTitle: pointFreeUpperCase(title)
    })
  }

  /**
   * function called 'onMouseEnter' on music style Link
   * change h1 content
   */
  styleNotOver(){
    this.setState({
      homeTitle: "Select your style"
    })
  }

  /**
   * function called 'onClick' on skip video text
   * doesn't display the video section
   */
  skipVideo(){
    this.setState({
      displayVideo: false
    })
  }

  render() {
    const {homeTitle, displayVideo} = this.state;
    // const {
    //   translateFunction: { translate }
    // } = this.props;

    return (
      <div id="home">
        <img id="logo" src={logo} alt="Born to Blues logo"/>
        {/* To access data from i18n => {translate("test")} */}
        <ul>{this.renderMusicStyleLinks(MUSIC_STYLES_LOGO)}</ul>
        <h1>{homeTitle}</h1>
        {displayVideo && (
          <section id="playerWrap">
            <div>
              <Player
                playsInline
                src={homeVideo}
              />
              <p className="skip" onClick={this.skipVideo}>Skip Video</p>
            </div>
          </section>
        )}
      </div>
    );
  }
}
