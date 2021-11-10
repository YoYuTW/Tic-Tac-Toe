const gameBoard = (() => {    
    const setNewBoard = () => {
        const board = document.getElementById('board');
        while(board.firstChild){
            board.removeChild(board.firstChild)
        }
        for(let i = 0; i < 9; i++){ //render gameboard
            const block = document.createElement('div');
            block.classList.add('block');
            block.id = i;
            block.addEventListener('click',displayController.playCheck);
            board.appendChild(block);
        }        
    };

    (() => {
        const buttonX = document.getElementById("X");
        buttonX.addEventListener('click',()=>{
            buttonX.classList.add('select');
            buttonO.classList.remove('select');
        })
        const buttonO = document.getElementById("O");
        buttonO.addEventListener('click',()=>{
            buttonO.classList.add('select');
            buttonX.classList.remove('select');
        })
    })();
    
    return {setNewBoard}
})();

const displayController = (() => {
    
    function playCheck(e){
        const output = document.querySelector('.select').textContent;
        if (!(e.target.textContent && e.target.className != "block")){                    
            e.target.textContent = output;            
            _resultCheck(output); // check if anyone win                        
        }
    }

    function _computerPlay(){
        const cp = (output === "X") ? "O" : "X";
        
    }

    function _resultCheck(output){ // 將格子拆成3個一組的陣列並判斷是否有人連線
        const blocks = Array.from(document.querySelectorAll(".block")).map(block => block.textContent);  
        const symbols = blocks.filter(s => s === "X" || s === "O");
        if (symbols.length === 9){
            console.log("tie!");
            return
        }          
            
        const _rows = (() => {
            const arr = [[],[],[]]; 
            blocks.forEach((block,idx) => {
                arr[Math.floor(idx/3)].push(block);
            })           
            return arr                
        });
            
        const _columns = (() => {
            const arr = [[],[],[]]; 
            blocks.forEach((block,idx) => {
                arr[idx%3].push(block);
            }) 
            return arr  
        });

        const _diagonals = (() => {
            const arr = [[blocks[0],blocks[4],blocks[8]],[blocks[2],blocks[4],blocks[6]]];
            return arr
        });

        const combinedArrays = _rows().concat(_columns(),_diagonals());
        const results = combinedArrays.some(littleArray => littleArray.every(v => v == output));
        results ? console.log(`${output} wins!`) : "";            
    }  
    return {playCheck};
})();

const Player = (name) => {
    const getName = () => name;
    return {getName};
}

gameBoard.setNewBoard();
const title = document.getElementById('title');
title.addEventListener('click',gameBoard.setNewBoard);