import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CitysContext } from "./CitysContext";

const NavBar = () => {
  const {
    typeOfTemp,
    setTypeOfTemp,
    displayMood,
    setDisplayMood
  } = useContext(CitysContext);



  const changeTypeOfTempType = () => {
    if (typeOfTemp === "Metric") {
      setTypeOfTemp("Imperial");
    } 
     if (typeOfTemp === "Imperial") {
      setTypeOfTemp("Metric");
    }
  };

  const changeTypeOfDisplayMood = () => {
    if (displayMood === "day") {
      setDisplayMood("night");
    } 
     if (displayMood === "night") {
      setDisplayMood("day");
    }
  };

  return (
    <Navbar>
      <ul>
        <NavLink to="/">
          <li>Home</li>
        </NavLink>
        <NavLink to="/favorites">
          <li>Favorites</li>
        </NavLink>
      </ul>
      {typeOfTemp==='Metric' ? <ButtonofChangeTempType src='./images/celsiusButton.svg' onClick={() => changeTypeOfTempType()}></ButtonofChangeTempType>: <ButtonofChangeTempType src='./images/fahrenheitLogo.svg' onClick={() => changeTypeOfTempType()}></ButtonofChangeTempType> }
      {displayMood ==='day' ? <ButtonForChangeDisplayMood src='./images/moon-button.svg' onClick={() => changeTypeOfDisplayMood()}></ButtonForChangeDisplayMood>:<ButtonForChangeDisplayMood src='./images/sun-button.svg' onClick={() => changeTypeOfDisplayMood()}></ButtonForChangeDisplayMood> }
    </Navbar>
  );    
};

export default NavBar;



// ---------------Styled-Components-----------------///
const ButtonofChangeTempType = styled.img`

        height: 40%;
        width: 40%;
        grid-column: 5/6;
        justify-self: flex-end;
        align-self:center;
        transition: 0.1s;
        cursor: pointer;
    &:hover {
      /* color: lightskyblue; */
      transform: scale(1.2)
    }
    
`

const Navbar = styled.div`
justify-content:center;
  width: 100%;
  /* background: #9966cc; */
  height: 10vh;
  display: grid;
    font-size: 25px;

  grid-template-columns: repeat(6, 1fr);
  font-family: "Comic Sans MS", cursive, sans-serif;
  justify-content: center;
  /* align-items: center; */

  ul {
    display: flex;
    list-style: none;
    grid-column: 1 / 3;
    justify-content: center;
    align-items: center;
  }

  li {
    margin-left: 70px;
    font-weight: bold;
    color: white;
    transition: 0.1s;
   
    &:hover {
      color: lightskyblue;
      transform: scale(1.2)
    }
  }

  h3 {
    grid-column-start: 6;
    justify-self: center;
    align-self: center;
    background: none;
    border-color: none;
    cursor: pointer;
    color: white;
    font-size: 22px;
    transition: 0.1s;
   &:hover{
       color: lightcyan;
       transform: scale(1.2)
   }
    /* grid-column-end: 6; */
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  &:active {
    text-decoration: none;
  }
`;

const ButtonForChangeDisplayMood = styled.img`
    height: 50%;
        width: 50%;
        /* grid-column: 6/7; */
        /* justify-self: center; */
        align-self:center;
        transition: 0.1s;
        cursor: pointer;
    &:hover {
      /* color: lightskyblue; */
      transform: scale(1.2)
    }
`
