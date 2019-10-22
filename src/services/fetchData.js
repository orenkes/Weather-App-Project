
// import {useContext } from "react";
// import {CitysContext} from './CitysContext'
  
//     const {
//         setCurrentDay,
//         setDaysArray,
//         setLoading
//       } = useContext(CitysContext);
  

//   export const getData = async () => {

//     const key = "P7JrCXPWFMobkGi2MozPoPjTmM9GoUOB";


//   //----------(1)GETTING CURRENT WEATHER DATA FUNCTION---------------//

//   const daydata = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${CityKeyToDisplay}?apikey=${key}`)
//   const dayjsonData = await daydata.json();
//   setCurrentDay(dayjsonData[0])
//   console.log(dayjsonData[0].Temperature.Metric.Value)

  
//   //----------(2)GETTING FORECASTS WEATHER DATA FUNCTION---------------//

  
//   const data = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${CityKeyToDisplay}?apikey=${key}`)
//   const jsonData = await data.json();
//   setDaysArray(jsonData.DailyForecasts)
//   console.log(jsonData.DailyForecasts)
  
//   setLoading(false);
//   /////////////////////////////////////////////////////////////
  
// };