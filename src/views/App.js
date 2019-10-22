import React, { useContext } from "react";
import GlobalStyles from "../global-style";
import NavBar from "./nav-bar";
import styled from "styled-components";
import WeatherBox from "./weatherBox";
import Favorites from "./Favorites";
import { BrowserRouter, Route } from "react-router-dom";
import { CitysContext } from "./CitysContext";

function App() {
  const { displayMood, inPutOpen, setInputOpen } = useContext(CitysContext);

  const closeSeacrhbox = () => {
    if (inPutOpen === true) {
      setInputOpen(false);
    }
  };

  return (
    <BrowserRouter>
      <Main displayMood={displayMood} onClick={closeSeacrhbox}>
        <NavBar />
        <Route exact path="/" component={WeatherBox} />
        <Route path="/favorites" component={Favorites} />
        <GlobalStyles />
      </Main>
    </BrowserRouter>
  );
}

export default App;

const Main = styled.div`
  height: 100%;
  background-image: ${({ displayMood }) =>
    displayMood === "day"
      ? `url("./images/dayMoodbackground.jpg")`
      : `url("./images/nightMoodBackground.jpg")`};
  background-repeat: no-repeat;
  background-size: cover;
`;
