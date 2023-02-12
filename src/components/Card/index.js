 import React, { useRef, useContext } from "react";

 import { useDrag, useDrop } from "react-dnd"; 
 import BoardContext from '../Board/context';

import { Container, Label } from "./styles"; 
 

export default function Card({data,index, listIndex}){ 
    const ref = useRef();
    const { move } = useContext(BoardContext);


    const [{ isDragging }, dragRef ] = useDrag({
        type:'CARD', 
        item:{index, listIndex},
        collect: monitor => ({
            isDragging:monitor.isDragging(),
        }),
    });

    const [, dropRef] = useDrop({
        accept: 'CARD',
        hover(item, monitor){
            const draggedListIndex = item.listIndex;//o index da lista que esta recebendo o novo item
            const targetListIndex = listIndex;//qual lista está recebendo essa informação (index da lista)

            const draggedIndex = item.index;//qual o index do item que esta sendo arrastado
            const targetIndex = index;//qual e o alvo que estou arrastanto

            if(draggedIndex === targetIndex && draggedListIndex === targetListIndex){
                return;
            }

            const targetSize = ref.current.getBoundingClientRect();//retorna o tamanho do meu elemento
            const targetCenter = (targetSize.bottom - targetSize.top) / 2;//calculando qual e o ponto cetral do card

            const draggedOffset = monitor.getClientOffset();//retorna o quando do item eu arrastei qual a distancia dos pontos da tela que eu arrastei esse item
            const draggedTop = draggedOffset.y - targetSize.top;//retorna a distancia que eu estou arrastando esse elemento do topo da tela menos a distancia do nosso item pro topo da tela

            if(draggedIndex < targetIndex && draggedTop < targetCenter){
                //se um item vem antes de outro item e eu tentar arrastar ele pra antes desse item ele não deve fazer nada
                //enquanto estou arrastando um item pra antes do outro item não atingir o meio do item ainda ele não faz nada mas se eu arrastar pra depois do meio do item ai ele muda
                return;
            }

            if(draggedIndex > targetIndex && draggedTop > targetCenter){
                //de um item que está depois de outro item não faz nada mas se eu arrastar ele pra antes desse item ai acontece ele muda de lugar
                return;
            }
            
            move(draggedListIndex, targetListIndex ,draggedIndex, targetIndex);
    
            item.index = targetIndex;//depois do item ser movido vou pegar esse item e falar que o index dele agora e o targetIndex mudei o index dele
            item.listIndex = targetListIndex;
 
        }
    })

    dragRef(dropRef(ref));

    return(
        <Container ref={ref} isDragging={isDragging}>
        <header>
            {data.labels.map(label => <Label  key={label} color={label}/>)}
        </header>
          <p>{data.oz} oz</p>
          <p>{data.content}</p>
          {data.user && <img src={data.user} alt=""/>}
        </Container> 
    );
}