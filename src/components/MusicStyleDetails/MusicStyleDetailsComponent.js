import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles/MusicStyleDetailsComponent.css";
import fetchColor from "../../utils/fetch";

import ArtistsComponent from "./components/ArtistsComponent";
import AnecdoteComponent from "./components/AnecdoteComponent";
import InfluenceComponent from "./components/InfluenceComponent";
import LinksComponent from "./components/LinksComponent";
import BluesIsForEveryOne from "./components/BluesIsForEveryOne";

import pointFreeUpperCase from "../../utils/pointFreeUpperCase";
import { NavigationDetails } from "../NavigationBar/index";
import { Context } from "../../App";

// import Header Component
import HeaderComponent from "../../utils/headerComponent";

type Props = {
  params: {
    musicStyle: string,
    musicStyleDetail: string
  },
  translateFunction: {
    translate: string => string
  }
};

type State = {
  musicStyleState: any,
  color: string,
  fetched: boolean
};

export default class MusicStyleDetailsComponent extends Component<
  Props,
  State
> {
  state = {
    musicStyleState: null,
    fetched: false
  };

  fetchData = (musicStyle: string, musicStyleDetail: any) => {
    if (
      (musicStyleDetail !== "impact" || musicStyleDetail !== "origine") &&
      musicStyleDetail !== "end"
    ) {
      fetch(
        `${process.env.REACT_APP_DB_URL}/api/${musicStyleDetail}/${musicStyle}`
      )
        .then(res => res.json())
        .then(musicStyleState => {
          this.setState({ musicStyleState, fetched: true });
        });
    }
  };

  getNextLink = nav => {
    const {
      params: { musicStyle, musicStyleDetail }
    } = this.props;
    let index = nav.indexOf(musicStyleDetail);
    index++;
    let link = `/${musicStyle}/${nav[index]}`;
    if (index === undefined) {
      link = `/${musicStyle}`;
    }
    if (musicStyle !== "blues" && index >= nav.length - 1) {
      link = "/blues";
      return (
        <Link className="NextButton" to={link}>
          Discover the Blues
        </Link>
      );
    }
    return (
      <Link className="NextButton" to={link}>
        Next
      </Link>
    );
  };

  componentDidMount = () => {
    const {
      params: { musicStyle, musicStyleDetail }
    } = this.props;
    this.fetchData(musicStyle, musicStyleDetail);
    fetchColor(musicStyle, this);
  };

  componentWillReceiveProps = (nextProps: any) => {
    this.setState({ fetched: false });
    this.fetchData(
      nextProps.params.musicStyle,
      nextProps.params.musicStyleDetail
    );
  };

  renderContent = () => {
    const {
      params: { musicStyle, musicStyleDetail }
    } = this.props;
    const { musicStyleState } = this.state;

    switch (musicStyleDetail) {
      case "artists":
        return (
          <ArtistsComponent
            musicStyle={musicStyle}
            musicStyleDetail={musicStyleDetail}
            musicStyleState={musicStyleState}
          />
        );
      case "anecdotes":
        return (
          <AnecdoteComponent
            musicStyle={musicStyle}
            musicStyleDetail={musicStyleDetail}
            musicStyleState={musicStyleState}
          />
        );
      case "influence":
        return (
          <InfluenceComponent
            musicStyle={musicStyle}
            musicStyleDetail={musicStyleDetail}
            musicStyleState={musicStyleState}
          />
        );
      case "links":
      case "origin":
        return (
          <LinksComponent
            musicStyle={musicStyle}
            musicStyleDetail={musicStyleDetail}
            musicStyleState={musicStyleState}
          />
        );
      default:
    }
  };

  render() {
    const {
      params: { musicStyle, musicStyleDetail },
      params
    } = this.props;
    const { musicStyleState, color, fetched } = this.state;

    const styleColor = color;

    const css = `
      .flex {
        display: ${fetched ? "flex" : "none"}!important;
      }
      #header a.headerLink:before{
          background: ${styleColor};
      }
      #header a.headerLink:after{
          background: ${styleColor};
      }
      #anecdote .buttonVideoToggle {
          background: ${styleColor};
      }
      #anecdote .nav a{
          color: ${styleColor};
      }
      #anecdote .nav li:before{
          background: ${styleColor};
      }
      .navDetails a.active:before{
          background: ${styleColor};
      }
      #links a{
          color: ${styleColor};
      }
      #links a:before{
          background: ${styleColor};
      }
      .NextButton {
      border: 3px solid ${styleColor}
      }
    `;

    return (
      <div>
        {musicStyleDetail === "end" ? (
          <BluesIsForEveryOne />
        ) : (
          <div>
            <style>{css}</style>
            <HeaderComponent params={params} />
            <Context.Consumer>
              {({ MUSIC_DETAILS, BLUES_DETAILS }) => (
                <div id="wrap">
                  <div className="flex">
                    <h1>
                      <span>{pointFreeUpperCase(musicStyleDetail)}</span>
                    </h1>
                    {musicStyleState && this.renderContent()}
                  </div>
                  <ul className="navDetails">
                    <NavigationDetails
                      arrayElement={
                        musicStyle === "blues" ? BLUES_DETAILS : MUSIC_DETAILS
                      }
                      musicStyle={musicStyle}
                      currentDetail={musicStyleDetail}
                    />
                  </ul>
                  {musicStyle === "blues"
                    ? this.getNextLink(BLUES_DETAILS)
                    : this.getNextLink(MUSIC_DETAILS)}
                </div>
              )}
            </Context.Consumer>
          </div>
        )}
      </div>
    );
  }
}
