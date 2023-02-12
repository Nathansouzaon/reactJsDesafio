import React from "react";
import { DndProvider } from "react-dnd";
import  {HTML5Backend}  from "react-dnd-html5-backend";


import GlobalStyle from "../styles/global";


import Header from "../components/Header";
import Board from "../components/Board";
import Banner from "components/Banner";
import Rodape from "components/Rodape";

function Inicio(){
    return(
          <DndProvider backend={HTML5Backend}>
             <Header/>
             <Banner imagem="home"/>
             <Board/>       
             <Rodape/>  
             <GlobalStyle/>

          </DndProvider>
    )
}

export default Inicio;