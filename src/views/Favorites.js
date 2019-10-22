import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CitysContext } from "./CitysContext";

const Favorites = () => {
  const { favoritesKeys, setFavoritesKeys, typeOfTemp,cityNameForFavorites } = useContext(
    CitysContext
  );

  const key = "SHxN5qjChANO09Yuzz10vVtZBdPISiQG";

  const [allFavoritesCitysKeys, setAllFavoritesCitysKeys] = useState([]);
  const [fatchCityData, setFatchCityData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cityWasRemove, setCityWasRemove] = useState(false);

  useEffect(() => {
    fetchFavorites();
  }, [loading]);

  const fetchFavorites = async () => {
    // setLoading(false)
    const fetchedFavsArray = await fetch(
      "https://favoritescitys-ee76mpxs6.now.sh"
    );
    const jsonFavsArray = await fetchedFavsArray.json();
    console.log("jsonFavsArray:", jsonFavsArray);
    setAllFavoritesCitysKeys(jsonFavsArray);
    
    const FavsArray = await Promise.all(
      allFavoritesCitysKeys.map(async favorite => {

        const currentForcast = `https://dataservice.accuweather.com/currentconditions/v1/${favorite.citykey}?apikey=${key}`;

        const fetchedDetails = await fetch(currentForcast);
        const jsonDetails = await fetchedDetails.json();

        console.log(jsonDetails);
        const mutatedObject = {
          ...jsonDetails[0],
          clippedName: favorite.cityname,
          citykey: favorite.citykey
        };
        console.log(mutatedObject);
        return mutatedObject;
      })
    );
    console.log("FavsArray:",FavsArray);
    setFatchCityData(FavsArray);
    setLoading(true)
  };


  ////////////function for reamoveing city ///////////////
  const reamoveFromDb = (citykey)=>{
    // setCityWasRemove(false)
    console.log(citykey)
    const data = {
      key:citykey,
    };
    
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
    
    fetch("https://favoritescitys-ee76mpxs6.now.sh", options);
    // setCityWasRemove(true)
    alert('City Was Reamoved')
    setLoading(false)
    console.log(loading)
  }
//////////////////////////////////////////////////////////

return (
  <AllFavoritesCitys>
  <WeatherForFavoritesCities>
    {loading ? (fatchCityData.map(currentDay =>{
     return(
<Daybox>
<CloseBoxButton
              src="https://image.flaticon.com/icons/svg/151/151882.svg"
           onClick={()=>reamoveFromDb(currentDay.citykey)} ></CloseBoxButton>
         <h3>{currentDay.clippedName}</h3>
       {typeOfTemp === 'Metric' ? (
         <span>
           {currentDay.Temperature[typeOfTemp].Value}  &#x2103; -  
           {currentDay.WeatherText}
         </span>
       ) : (
         <span>
           {currentDay.Temperature[typeOfTemp].Value}  &#8457; -
           {currentDay.WeatherText}
         </span>
       )}
     </Daybox>
     )
   } )): (<h3>Loading...</h3>)}
  </WeatherForFavoritesCities>
  </AllFavoritesCitys>
)
}


export default Favorites;

const AllFavoritesCitys = styled.div`
display:flex;
justify-content:center;
align-items:center;
height: 100vh;
`

const WeatherForFavoritesCities = styled.div`
/* background: seashell; */
opacity: 0.9;
border-radius: 5%;
display: flex;
flex-wrap: wrap;
justify-content:center;
align-items:center;
width:80%;

h3{
  width: 100%;
    text-align: center;
    color: lightsalmon;
    font-size: 2vw;
    font-family: Microsoft YaHei;
}

`;


const Daybox = styled.div`
padding: 5px;
  background: white;
  border: 1px solid black;
  height: 13vw;
  width: 20%;
  margin: 5px;
  /* margin: 20px 20px 0px 20px; */
  border-radius: 10%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  font-family: Microsoft YaHei;
  span {
    /* font-size: 1vw; */
  }

  h3{
    width:100%;
   text-align:center;
  }
  `

const CloseBoxButton = styled.img`
height: 3vw;
width: 3vw;
transition: 0.1s;
&:hover {
  cursor: pointer;
  transform: scale(1.1);
}
`;