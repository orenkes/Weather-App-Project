import React, { useState, useContext } from "react";
import styled from "styled-components";
import { CitysContext } from "./CitysContext";
import autocompleteData from "../autocomplete.data.json";

const SearchBar = () => {
  const [citys, setCitys] = useState([]);

  // const [inPutOpen, setInputOpen] = useState(false);

  const [isTyping, setIsTyping] = useState("");

  const {
    setCityToDisplay,
    getData,
    CityToDisplay,
    setShowBox,
    setCityNameToDisplay,
    CityNameToDisplay,
    showBox,
    setCityKeyToDisplay,
    setCityNameForFavorites,
    inPutOpen,
    setInputOpen,
    CityKeyToDisplay,
    setCityIsInFavorites
  } = useContext(CitysContext);

  const key = "GkeE0OI7CziipAx4v6wqIB6GFFu7a3Kb";

  const setCityKey = e => {
    setShowBox(true);

    setCityToDisplay(e.target.key);

    setCitys([]);
  };

  const autocomp = async e => {
    setInputOpen(true);
    setIsTyping(e.target.value);

    // setCityNameToDisplay(e.target.value)

    if (e.target.value !== "") {
      const citysjson = await fetch(
        `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${key}&q=${e.target.value}`
      );
      const cityList = await citysjson.json();
      setCitys(cityList);
      // setCitys(autocompleteData);
    } else {
      setCitys([]);
    }
  };

  const selectLocation = (e, city) => {
    setCityKey(e);
    setCityNameToDisplay(
      `${city.LocalizedName}, ${city.Country.LocalizedName}`
      );
      console.log(city.LocalizedName, city.Country.LocalizeName);
      console.log("CityToDisplay", CityToDisplay);
      setCityNameForFavorites(city.LocalizedName);
      getData();
      setInputOpen(false);
      setCityKeyToDisplay(city.Key);
      cheakIfCityIsInFavorites()
  };

  // const displayCityNameOnInput ()



  const cheakIfCityIsInFavorites = async () => {
    const fetchedFavsArray = await fetch(
      "https://favoritescitys-ee76mpxs6.now.sh"
    );
    const jsonFavsArray = await fetchedFavsArray.json();
    console.log("jsonFavsArray:", jsonFavsArray);
   const favoritesCityArray = jsonFavsArray;
      console.log(CityKeyToDisplay)
 const res = favoritesCityArray.find(element=>
  element.citykey ===  Number(CityKeyToDisplay) 
)
console.log(res)
if(res !==undefined){
  setCityIsInFavorites(true)
}
else(
  setCityIsInFavorites(false)
)
}

  return (
    <Searchcompo city={citys}>
      {showBox ? "" : <h1>Great Weather, isn't it?</h1>}
      <SearchInput>
        <input
          value={inPutOpen ? isTyping : CityNameToDisplay}
          type="text"
          placeholder="Fill City Name..."
          onChange={autocomp}
        />
      </SearchInput>
      <ul>
        {citys.map(city => {
          return (
            <li key={city.Key} onClick={e => selectLocation(e, city)}>
              {city.LocalizedName}, {city.Country.LocalizedName}
            </li>
          );
        })}
      </ul>
    </Searchcompo>
  );
};

export default SearchBar;

// ---------------Styled-Components-----------------///

const SearchInput = styled.div`
  width: 100%;
  z-index: 2;
  input {
    width: 500px;
    /* height: 20px; */
    font-size: 24px;
  }
`;

const Searchcompo = styled.div`
h1{
    text-align:center;
    padding-bottom: 50px; 
    font-family: "Comic Sans MS", cursive, sans-serif;
    color: navajowhite;
    font-size: 40px;
    
}

ul {
    /* display: ${props => (props.city.length > 0 ? "block" : "none")}} */
    background: white;
    list-style: none;
    font-family:Arial, Helvetica, sans-serif;
    font-size:16px;
    position: absolute;
    width: 500px;
    font-size:24px;
    z-index:1;
    
    li{
        border-bottom: 0.5px dotted lightgrey;
        padding-left: 4px;
        &:hover{
            cursor: pointer;
            background:lightgrey;
        }
        
        animation: displaycitys 0.3s linear;
    }
}

@keyframes displaycitys {
  0% {font-size:0px; color:white;}
  50% {font-size:24px; color:white;}
  100% {font-size:24px; color:black; }
}
`;
