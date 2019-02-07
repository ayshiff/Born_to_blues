const fetchColor = (musicStyle: string, ctx: any) => {
  fetch(`${process.env.REACT_APP_DB_URL}/api/music-style/${musicStyle}`)
    .then(res => res.json())
    .then(musicStyleState => {
      ctx.setState({ color: musicStyleState[0].color });
    });
};

export default fetchColor;
