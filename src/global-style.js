import { createGlobalStyle } from "styled-components";



const GlobalStyles = createGlobalStyle`

*,*::before,*::after{
  box-sizing:border-box;
  padding:0;
  margin:0;
}
html,body{
  height:100%;	
  user-select: none;
  font-family: "Muli";
  z-index:-3;
}
html{
 font-size:10px;	
 /* all other length can be in rem on a ratio of 1/10 */
}
body{
 font-size:1.6rem;
}
`;

export default GlobalStyles;



/* http://getwallpapers.com/wallpaper/full/0/a/c/564421.jpg */