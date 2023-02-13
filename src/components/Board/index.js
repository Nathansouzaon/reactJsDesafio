import React, {useState} from "react";
import produce from 'immer';
import BoardContext from "./context";
import {loadLists} from '../Services/api';
import List from "../List";

import { Container } from "./styles";

const data = loadLists();//todos os itens da lista estão dentro de data
const totalOz = 100;


export default function Board(){   
    const [lists, SetLists] = useState(data);

    function move(fromList, toList ,from, to){
         SetLists(produce(lists, draft =>{ 
            const dragged = draft[fromList].cards[from];//acessando o item(card) que está sendo arrastado
            
             let valorOz = dragged.oz;

             const peso = lists[toList].pesoMaximo;

            let soma = lists[toList].cards.reduce((a,b) => a + b.oz, 0);

            let resultadoOz = soma + valorOz;

            if(resultadoOz <= peso){
                draft[fromList].cards.splice(from, 1);//removendo o item que está sendo arrastado da lista
                draft[toList].cards.splice(to, 0, dragged);//colocando em uma nova posição
                 //to = qual e a posição que está sendo arrastado e 0=coloca antes daquele item e movendo o card pra mesma lista ou outra
            }
            
        }))
    }

    return(
        <BoardContext.Provider value={{ lists, move, totalOz }}>
        <Container>
            {lists.map((list, index) => <List key={list.title} index={index} data={list}/>)}
        </Container> 
        </BoardContext.Provider>
    );
}

/*toda vez que minha variavel lists mudar ela vai mudar tambem o valor do contexto
todos os lugares que estão usando esse contexto para criar alguma informação vão se atualizar


dentro do metodo move preciso chamar setlists para redifinir a nossa lista com a posições ja trocadas, o estado e imutavel não posso pegar as nossas listas e trabalhar com elas dar um push ou splice 

nesse caso uso a biblioteca immer que permite trabalhar com estados do react como se fossem vetores ou objetos muteveis posso utilizar esses metodos como push e splice acessar as informações diretamente alterar diretamente e depois o react converte tudo isso numa sintaxe imutavel que o react não vai reclamar


a função produce recebe uma informação por exemplo a nossa lista e o segundo parametro, e uma função chama-se draft que e rascunho esse draft e uma copia dessa listagem toda alteração que eu fizer no draft o produce vai computar essa alteração no nosso objeto de listas no nosso objeto que e imutavel que nao poderia sofrer essas alterações diretamente

  {lists.map((list, index) => <List key={list.title} index={index} data={list}/>)} gera lista
*/