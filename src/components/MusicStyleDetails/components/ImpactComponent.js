import React from "react";
import { NavigationSubDetails } from "../../NavigationBar";

// const MUSIC_STYLES: Array<string> = ["rap", "jazz", "country", "rock"];

type Props = {
  musicStyle: string,
  musicStyleDetail: string,
  musicStyleState: any
};

const ImpactComponent = (props: Props) => {
  const { musicStyle, musicStyleDetail, musicStyleState } = props;
  const arrayElement = musicStyleState.map(e => e.description.name);
  return (
    <section id="impact">
      <NavigationSubDetails
        musicStyle={musicStyle}
        musicDetail={musicStyleDetail}
        arrayElement={arrayElement}
      />
    </section>
  );
};

export default ImpactComponent;
