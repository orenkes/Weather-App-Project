import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
// import weatherData from '../weatherfor5days.data.json'
import SearchBox from "./SearchBox";
import { CitysContext } from "./CitysContext";
import { async } from "q";

const WeatherBox = () => {



  const {
    CityToDisplay,
    showBox,
    setShowBox,
    daysArray,
    getData,
    currentDay,
    loading,
    cityNameToDisplay,
    typeOfTemp,
    setCityNameToDisplay,
    CityKeyToDisplay,
    changeunixTimestamp,
    cityNameForFavorites,
    displayMood,
    cityIsInFavorites,
    setCityIsInFavorites
  } = useContext(CitysContext);

  // useEffect(()=>{
  //     getData()
  // },[CityToDisplay])

  const closeBox = () => {
    if (showBox === true) {
      setShowBox(false);
      setCityNameToDisplay("");
    }
  };

  const saveDataToServer = () => {
    setCityIsInFavorites(true)
    console.log(cityNameToDisplay)
    const data = {
      key: CityKeyToDisplay,
      savedName: String(cityNameForFavorites)
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };

    fetch("https://favoritescitys-d7z15dcek.now.sh", options);
    alert("The City Is Been Add To Your Favorites");
  };


  return (
    <WeatherShowPage>
      <InputSection>
        <SearchBox />
      </InputSection>
      <BigCloudwithSunOrMoon
        open={showBox}
        src="./images/cloud.svg"
        alt="cloud"
      ></BigCloudwithSunOrMoon>
      {displayMood === 'day'? <SmallCloud
        open={showBox}
        src="./images/cloudWithSun.svg"
        alt="cloudWithSun"
      ></SmallCloud> :<SmallCloud
      open={showBox}
      src="./images/moonImg.png"
      alt="moonImg"
    ></SmallCloud> }
      <WeatherForFiveDays open={showBox}>
        <WeatherBoxHeader>
          <TitleOfCurrentCityName>
            {!loading ? <h3>{cityNameToDisplay}</h3> : <h3>Loading</h3>}
          </TitleOfCurrentCityName>
          <WeatherBoxButtons>
           {cityIsInFavorites?  <ButtonForAddToFavorite src='./images/isInFavoriteButton.png' ></ButtonForAddToFavorite> :<ButtonForAddToFavorite
            isFavorite= {cityIsInFavorites}
              onClick={() => {
                saveDataToServer();
              }}
              src="./images/addToFavoriteButton2.png"
            ></ButtonForAddToFavorite>} 
            <CloseBoxButton
              src="./images/closeButton.svg"
              onClick={() => closeBox()}
            ></CloseBoxButton>
          </WeatherBoxButtons>
          <WeatherText>
            {!loading ? (
              <div>
                {typeOfTemp === "Metric" ? (
                  <span>
                    { currentDay.Temperature[typeOfTemp].Value}  &#x2103; -
                    { currentDay.WeatherText}
                  </span>
                ) : (
                  <span>
                    {currentDay.Temperature[typeOfTemp].Value}  &#8457; -
                    { currentDay.WeatherText}
                  </span>
                )}
              </div>
            ) : (
              <h3>Loading...</h3>
            )}
          </WeatherText>
        </WeatherBoxHeader>
        <WeatherByDay>
          <ul>
            {!loading ? (
              daysArray.map(day => {
                return (
                  <Daybox>
                    <h1>{changeunixTimestamp(day.EpochDate)}</h1>
                    {typeOfTemp === "Metric" ? (
                      <h3>
                        {"Min: " +
                          Math.round(
                            ((day.Temperature.Minimum.Value - 32) * 5) / 9
                          )}
                        <span> &#x2103;</span>
                      </h3>
                    ) : (
                      <h3>
                        {"Min: " + day.Temperature.Minimum.Value}
                        <span> &#8457;</span>
                      </h3>
                    )}
                    {typeOfTemp === "Metric" ? (
                      <h3>
                        {"Max: " +
                          Math.round(
                            ((day.Temperature.Maximum.Value - 32) * 5) / 9
                          )}
                        <span> &#x2103;</span>
                      </h3>
                    ) : (
                      <h3>
                        {"Max: " + day.Temperature.Maximum.Value}
                        <span> &#8457;</span>
                      </h3>
                    )}
                  </Daybox>
                );
              })
            ) : (
              <h1>loading</h1>
            )}
          </ul>
        </WeatherByDay>
      </WeatherForFiveDays>
    </WeatherShowPage>
  );
};

export default WeatherBox;

// ---------------Styled-Components-----------------///

const WeatherShowPage = styled.div`
  /* border: 1px solid black; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  font-family: Arial, Helvetica, sans-serif;
  overflow: hidden;
  height: 130vh;
`;

// -------------Weather Box Header-------------//

const WeatherBoxHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  height: 13vw ;
  /* border: 1px solid black; */
`;
const WeatherBoxButtons = styled.div`
  display: flex;
  /* border: 1px solid black; */
  flex-basis: 20%;
  align-items: center;
  padding-top: 5px;
  justify-content: space-around;
`;
const TitleOfCurrentCityName = styled.div`
  /* border: 1px solid blue; */
  flex-basis: 60%;
  display: flex;
  align-items: center;
  color: lightsalmon;
  font-size: 2.5vw;
  padding-left: 20px;
`;
const WeatherText = styled.div`
  /* border: 1px solid red; */
  flex-basis: 100%;
  text-align: center;
  font-size: 3vw;
  color: lightcoral;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  font-family: Microsoft YaHei;

  /* span {
    font-size: 30px;
  } */
`;
// -------------Weather Box Header Buttons-------------//

const ButtonForAddToFavorite = styled.img`
  height: 3vw;
  width: 3vw;
    display: ${props => (props.isFavorite === true ? "none" : "block")};
  /* transition: 0.3s; */
  &:hover {
    cursor: pointer;
    /* transform: scale(1.2); */
  }

  /* &:active{
    transform: translateY(-80px);
  } */
`;

const CloseBoxButton = styled.img`
  height: 3vw;
  width: 3vw;
  transition: 0.1s;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const BigCloudwithSunOrMoon = styled.img`
  display: ${props => (props.open === true ? "none" : "block")};
  width: 350px;
  height: 350px;
  /* animation : one 12s ease-in infinite alternate;  */
  opacity: 0.9;
  animation: one 20s linear infinite alternate;
  position: relative;
  transition: 1s;
  top: -70px;

  &:hover {
    transform: translateY(30px);
  }

  @keyframes one {
    from {
      left: -65vw;
    }
    to {
      left: 80vw;
    }
  }
`;
const SmallCloud = styled.img`
  display: ${props => (props.open === true ? "none" : "block")};
  width: 400px;
  height: 400px;
  /* animation: shimmytwo 10s infinite linear ; */
  opacity: 0.95;
  position: absolute;
  /* top:210px; */
  top: -15px;
  animation: two 20s linear infinite alternate;
  z-index: 0;
  transition: 1s;

  &:hover {
    transform: translateY(30px);
  }

  @keyframes two {
    from {
      right: -40vw;
    }
    to {
      right: 110vw;
    }
  }
`;

const InputSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
  position: relative;
  margin: 80px auto;
  z-index: 3;
`;

const WeatherForFiveDays = styled.div`
  /* border: 1px solid purple; */
  background: seashell;
  opacity: 0.9;
  width: 80%;
  height: 50%;
  border-radius: 5%;
  display: flex;
  display: ${props => (props.open === true ? "flex" : "none")};
  flex-wrap: wrap;
  z-index: 0;

  /* margin: 30px auto; */
`;

const WeatherByDay = styled.div`
  display: flex;
  /* border: 1px solid black; */
  width: 100%;
  justify-content: center;
  height: 35vh;

  ul {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 1000px) {
      flex-direction: column;
      /* overflow: scroll; */
      width: 100%;
    }
  }
`;

const Daybox = styled.div`

  background: white;
  /* border: 1px solid black; */
  height: 60%;
  width: 20%;
  margin: 20px 20px 0px 20px;
  border-radius: 10%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  font-family: Microsoft YaHei;
  span {
    font-size: 1.5vw;
  }

  h1 {
    width: 100%;
    text-align: center;
    color: lightsalmon;
    font-size: 2vw;
  }
  h3 {
    width: 100%;
    text-align: center;
    font-size: 1.5vw;
  }

  @media (max-width: 1000px) {
    width: 90%;
    margin: 5px;
    /* padding: 10px; */
  }
`;
