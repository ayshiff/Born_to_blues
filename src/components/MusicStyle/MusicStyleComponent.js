import React, { Component } from "react";
import pointFreeUpperCase from "../../utils/pointFreeUpperCase";
import { NavigationDetails } from "../NavigationBar/index";
import fetchColor from "../../utils/fetch";
import "./styles/MusicStyleComponent.css";
import { Context } from "../../App";
import vinyle from "../../assets/img/vinyle-rock.png";

// import header Component
import HeaderComponent from "../../utils/headerComponent";
import { Link } from "react-router-dom";

type Props = {
  params: string,
  translateFunction: {
    translate: string => string
  }
};

type State = {
  musicStyle: {
    description: string,
    pitch: string,
    img: string
  }
};

/**
 *  Music Style Component
 */

export default class MusicStyleComponent extends Component<Props, State> {
  state = {
    musicStyle: { description: "", pitch: "" }
  };

  /**
   *  Function to create the detail list
   * @param {Array<string>} arrayElement - The array of blues categories
   * @param {string} musicStyle - The music style param in the url.
   */

  componentDidMount = () => {
    const { params } = this.props;
    fetch(`${process.env.REACT_APP_DB_URL}/api/music-style/${params}`)
      .then(res => res.json())
      .then(musicStyle => {
        this.setState({ musicStyle: musicStyle[0] });
        fetchColor(params, this);
      });
  };

  render() {
    const { params } = this.props;
    const { musicStyle, color } = this.state;

    const styleColor = color;

    const css = `
      #header a.headerLink:before{
          background: ${styleColor};
      }
      #header a.headerLink:after{
          background: ${styleColor};
      }
      #anecdote .text button {
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
    `;

    return (
      <div>
        <style>{css}</style>
        <Context.Consumer>
          {({ MUSIC_DETAILS, BLUES_DETAILS }) => (
            <div>
              <HeaderComponent params={params} />
              <div id="musicWrap">
                <div className="flex">
                  <h1>{pointFreeUpperCase(params)}</h1>
                  <div className="vinyle">
                    <img src={musicStyle.img} alt="vinyle" />
                  </div>
                  <p>{musicStyle.pitch}</p>
                </div>
                <ul className="navDetails">
                  {params === "blues" ? (
                    <NavigationDetails
                      arrayElement={BLUES_DETAILS}
                      musicStyle={params}
                    />
                  ) : (
                    <NavigationDetails
                      arrayElement={MUSIC_DETAILS}
                      musicStyle={params}
                    />
                  )}
                </ul>
              </div>
              <ul className="navDetails">
                {params === "blues" ? (
                  <NavigationDetails
                    arrayElement={BLUES_DETAILS}
                    musicStyle={params}
                  />
                ) : (
                  <NavigationDetails
                    arrayElement={MUSIC_DETAILS}
                    musicStyle={params}
                  />
                )}
              </ul>
              <Link
                style={{ border: `3px solid ${musicStyle.color}` }}
                className="NextButton"
                to={`/${params}/${
                  params === "blues" ? BLUES_DETAILS[1] : MUSIC_DETAILS[1]
                }`}
              >
                Next
              </Link>
            </div>
          )}
        </Context.Consumer>
      </div>
    );
  }
}
