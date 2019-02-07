// @flow
import React from "react";
import { Link } from "react-router-dom";
import "./styles/NavigationBar.css";
import pointFreeUpperCase from "../../utils/pointFreeUpperCase";

const MUSIC_STYLES: Array<string> = ["rap", "jazz", "country", "rock"];

/**
 *  Navigation Bar Component
 */
export const NavigationBar = () => (
  <div className="navigation_container">
    {MUSIC_STYLES.map(musicStyle => (
      <div className="navigation_element" key={musicStyle}>
        <Link to={`/${musicStyle}`}>{musicStyle}</Link>
      </div>
    ))}
  </div>
);

/**
 *  Navigation Details Component
 */
export const NavigationDetails = ({
  arrayElement,
  musicStyle,
  currentDetail = ""
}: {
  arrayElement: Array<string>,
  musicStyle: string,
  currentDetail: string
}): Array<any> =>
  arrayElement.map(detail => {
    let className = "";
    if (detail === currentDetail) {
      className = "active";
    }
    return (
      <li key={detail}>
        <Link
          className={className}
          to={
            detail !== "blues"
              ? `/${musicStyle}/${detail}`
              : detail === "home"
              ? `/${musicStyle}`
              : `/${detail}`
          }
        />
      </li>
    );
  });

/**
 *  Navigation Details Component
 */
export const NavigationSubDetails = ({
  arrayElement,
  musicStyle,
  musicDetail
}: {
  arrayElement: Array<string>,
  musicStyle: string,
  musicDetail: string
}): Array<any> =>
  arrayElement.map(detail => (
    <li key={detail}>
      <Link to={`/${musicStyle}/${musicDetail}/${detail}`}>{detail}</Link>
    </li>
  ));
