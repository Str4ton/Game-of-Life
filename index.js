const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const scale = 10;

canvas.width = 800;
canvas.height = 800;

const rows = canvas.width/scale;
const columns = canvas.height/scale; 

///Grid/Matrice plina cu 0 de dimensiuni/scala
function buildGrid(){
    return new Array(columns).fill(null)
        .map(() => new Array(rows).fill(null)
            .map(()=> Math.floor(Math.random() *2))); //generezi 1 la pozitii random in grid
}

let grid = buildGrid();

requestAnimationFrame(update);


function update(){
    grid = nextGen(grid);
    draw(grid);
    requestAnimationFrame(update);
}

function nextGen(grid){
    const nextGen = grid.map(arr => [...arr]);

    for(let col = 0; col< grid.length; col++){
        for(let row = 0; row< grid[col].length; row++){
            const cell = grid[col][row];
            let numNeighbours = 0;

            //Verifici vecinii cell-ului pornind de la cel din colt stanga sus (-1,-1) , gandestete la un grid 3x3 cu celula in centru
            for(let i  = -1; i<2; i++){
                for(let j = -1 ; j<2; j ++){
                    //Nu consideri celula in sine ca vecin al sau (0,0)
                    if(i === 0 && j === 0){
                        continue;
                    }
                    const x_cell = col + i;
                    const y_cell = row + j;

                    if(x_cell >= 0 && y_cell >= 0 && x_cell<columns && y_cell <rows){    
                        const currentNeighbour = grid[col + i][row + j];
                        numNeighbours += currentNeighbour;  
                    }
                }
            }

            //Reguli
            if(cell === 1 && numNeighbours <2){
                //Daca celula are mai putin de 2 vecini o omori in urmatoarea generatie
                nextGen[col][row] = 0;
            }
            else if(cell === 1 && numNeighbours >3){
                //Daca celula are mai mult de 3 vecin moare in nextGen
                nextGen[col][row] = 0;
            }
            else if(cell === 0 && numNeighbours === 3){
                nextGen[col][row] = 1; 
            }
        } 
    }
    return nextGen;
}

function draw(grid){
    for(let col = 0; col< grid.length; col++){
        for(let row = 0; row< grid[col].length; row++){
            const cell = grid[col][row];

            ctx.beginPath();
            ctx.rect(col * scale , row *scale , scale ,scale);
            ctx.fillStyle = cell ? 'black' : 'white'; //daca cell-u' contine 1(T) devine neagra daca are 0(F) devine alba
            ctx.fill();
            //ctx.stroke();
        }
    }
}