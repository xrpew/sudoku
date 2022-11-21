var numSelected = null;
var tileSelected = null;
let board = null;
var errors = 0;

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9a728c70acmsh13b5d3b50d9af2dp1c73cbjsn498e328370be',
		'X-RapidAPI-Host': 'mega-sudoku-generator.p.rapidapi.com'
	}
};

fetch('https://mega-sudoku-generator.p.rapidapi.com/standard', options)
	.then(res => res.json())
    .then((data) => {
        setGame(data)
    } )
	.catch(err => console.error(err));

document.getElementById('newGame').addEventListener('click',()=>location.reload())
    
    function setGame(data){
    solution = data.sudokuSolved.split(';')
    board = data.sudokuMedium.split(';')
    // Digits 1-9
    for(let i=1; i<=9; i++){
        //<div id="1" class="number">1</div>
        let number = document.createElement("div")
        number.id = i;
        number.innerText= i;
        number.addEventListener('click', selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    for (let r=0;r<9;r++){
        for(let c=0;c<9;c++){
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if(board[r][c] != 0){

                tile.innerText = board[r][c]
                tile.classList.add('tile-start')
            }
            if(r==2 || r==5){
                tile.classList.add("horizontal-line")
            }
            if(c==2 || c ==5){
                tile.classList.add('vertical-line')
            }

            tile.addEventListener('click', selectTile)
            tile.classList.add("tile");
            document.getElementById("board").append(tile)

        }
    }
}
 
function selectNumber(){
    if(numSelected!= null)
    {
        numSelected.classList.remove('number-selected')
    }
    numSelected = this;
    numSelected.classList.add("number-selected")
}

function selectTile(){
    if(numSelected){
        if(this.innerText != ''){
            return
        }
        let coords = this.id.split('-');
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if(solution[r][c] == numSelected.id){
            this.innerText = numSelected.id
        }
        else{
            errors +=1;
            document.getElementById("errors").innerText = 'Errores: ' + errors
        }
    }
}