import React, { useState, createContext } from "react";
import forecastsforfivedays from "../weatherfor5days.data.json";
import currentdayweather from "../currentdayweather.data.json";

export const CitysContext = createContext();

export const CitysProvider = props => {
  const [CityToDisplay, setCityToDisplay] = useState({ Key: 215854 });
  const [CityKeyToDisplay, setCityKeyToDisplay] = useState(215854);
  const [CityNameToDisplay, setCityNameToDisplay] = useState("");
  const [showBox, setShowBox] = useState(false);
  const [daysArray, setDaysArray] = useState([]);
  const [currentDay, setCurrentDay] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFiveDaysWeather, setShowFiveDaysWeather] = useState(false);
  const [typeOfTemp , setTypeOfTemp] = useState('Metric')
  const [favoritesKeys , setFavorites] = useState([])
  const [cityNameForFavorites , setCityNameForFavorites] = useState([])
  const [displayMood , setDisplayMood] = useState('day')
  const [inPutOpen, setInputOpen] = useState(false);
  const [cityIsInFavorites,setCityIsInFavorites] =useState(false)

  const changeunixTimestamp = number => {
    var date = new Date(number * 1000);
    return String(date).slice(0, 3);
  };


  //-----------------GETTING WEATHER DATA FUNCTION ----------------------//

  const getData = async () => {

    const key = "SHxN5qjChANO09Yuzz10vVtZBdPISiQG";


  //----------(1)GETTING CURRENT WEATHER DATA FUNCTION---------------//

  const daydata = await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${CityKeyToDisplay}?apikey=${key}`)
  const dayjsonData = await daydata.json();
  setCurrentDay(dayjsonData[0])
  // console.log(dayjnsonData[0].Temperature.Metric.Value)


  //----------(2)GETTING FORECASTS WEATHER DATA FUNCTION---------------//

  
  const data = await fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${CityKeyToDisplay}?apikey=${key}`)
  const jsonData = await data.json();
  setDaysArray(jsonData.DailyForecasts)
  console.log(jsonData.DailyForecasts)
  
  setLoading(false);
  /////////////////////////////////////////////////////////////
  
};


  const state = {
    CityToDisplay,
    showBox,
    daysArray,
    currentDay,
    loading,
    CityNameToDisplay,
    showFiveDaysWeather,
    typeOfTemp,
    CityKeyToDisplay,
    favoritesKeys,
    cityNameForFavorites,
    displayMood,
    inPutOpen,
    cityIsInFavorites
  };
  const actions = {
    setCityToDisplay,
    setShowBox,
    setDaysArray,
    setCurrentDay,
    getData,
    setCityNameToDisplay,
    setShowFiveDaysWeather,
    setTypeOfTemp,
    setCityKeyToDisplay,
    setFavorites,
    changeunixTimestamp,
    setCityNameForFavorites,
    setDisplayMood,
    setInputOpen,
    setCityIsInFavorites
  };

  return (
    <CitysContext.Provider value={{ ...state, ...actions }}>
      {props.children}
    </CitysContext.Provider>
  );
};
