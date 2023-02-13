import React, {useContext} from "react";

import Card from "components/Card"; 
import BoardContext from '../Board/context';

import { Container } from "./styles";



export default function List({ data, index:listIndex }){
    const { totalOz } = useContext(BoardContext);
    return(
        <Container done={data.done}>
            <header>      
                <h2>{data.title}</h2>
                {data.creatable && (
                    <img src="../assets/backpack.jpg" alt="backpack"></img> 
                )}
            </header>
            <br/> <br/>          <br/> <br/>
            <p>Peso Maximo De itens é: {totalOz} Oz, peso atual é {data.cards.map(cards => cards).reduce((a,b) => a+b.oz, 0)}</p>
 
            <ul>
                
                {data.cards.map((card, index) => <Card key={card.id} listIndex={listIndex} index={index} data={card}/>)}
            </ul>
        </Container> 
    );
}