class Sudoku {
    constructor(size) {
        this.SIZE=size
        this.BOX_SIZE=Math.floor(Math.sqrt(this.SIZE)) 
         //Empty matrix
         this.matrix=[]
         this.hiddenMatrix=[]
        
        //Fill matrix with zeroes
         for (let i=0;i<size;i++) {
            let row=[], rowHidden=[]
            for (let j=0;j<size;j++) {
                row.push(0)
                rowHidden.push(0)
            }
            this.matrix.push(row)
            this.hiddenMatrix.push(rowHidden)
        }
    }
    checkAnswer(matAnswer) {
       
        let invalid= []
        for(let i=0;i<this.SIZE*this.SIZE;i++) {
            if(this.matrix[Math.floor(i/this.SIZE)][i%this.SIZE]!=matAnswer[Math.floor(i/this.SIZE)][i%this.SIZE]) {
                invalid.push(i)
            }
        }
       return invalid
    }

    get size() {
        return this.SIZE
    }
    get hiddenMat() {
        return this.hiddenMatrix
    }
    //Check if the number is present in given row
     checkRow(mat,row, num) {
        if(mat[row].includes(num)) {
            return false  //The given number is already present in current row, so so it is invalid
        }
        return true //The given number is valid
    }
    //Check if the number is present in given column
     checkCol(mat,col, num) {
        for(let i=0;i<this.SIZE;i++) {
            if(mat[i][col]===num) {
               return false //The given number is already present in current column, so so it is invalid
            }
        }
        return true //The given number is valid
    }
    //Check if the number is present in 3*3 box that contains it (given the number coordinates)
     checkBox(mat,row, col, num) {
        
        let startRow, startCol

        //Calculate the start index of the 3*3 box
        startRow = row - row % this.BOX_SIZE
        startCol= col - col % this.BOX_SIZE
        
        //Check the box
        for(let i=startRow;i<startRow+this.BOX_SIZE;i++) {
            for(let j=startCol;j<startCol+this.BOX_SIZE;j++) {
                if(mat[i][j]===num) {
                    return false  //The given number is already inside the box, so it is invalid
                }
            }
        }
    
        return true //The given number is valid
    }
    //Try to generate and return a valid Sudoku number given the coordinates. If it's not possible, return 0 (empty cell)
    
    //Try to fill the entire Sudoku board by recursion
    generateBoard() {
       
        let isComplete=true
        let row, col
        //Check the board. If it's completely filled - return true. If not, remember the last empty space
        for(let i=0;i<this.SIZE*this.SIZE;i++) {
            if(this.matrix[Math.floor(i/this.SIZE)][i%this.SIZE]===0) {
                row=Math.floor(i/this.SIZE)
                col=i%this.SIZE
                isComplete=false
                break
            }
        }

        if(isComplete) {
            //this.listMat.push(this.matrix)
            return true 
        }
        
        //Fill the array with numbers 1-9 in random order
        
        let rndNums = []
        while (rndNums.length<this.SIZE) {
            let rndNum = Math.floor(Math.random() * this.SIZE)+1
            
            if(!rndNums.includes(rndNum)) {
                 rndNums.push(rndNum)
             } 
         }
         
          //Leave only valid numbers in the array
         rndNums=rndNums.filter((num)=>this.checkRow(this.matrix,row, num) && this.checkCol(this.matrix, col, num) && this.checkBox(this.matrix, row,col,num))
         
         //Try out all the valid numbers from array and see, if they can be placed inside a given cell (by Sudoku rules). Return that legal number
         let num
        
         while(rndNums.length!=0) {
             num = rndNums.pop()
             
                 //Put the legal number into the board
                this.matrix[row][col] = num
                 //Recursively call itself with modified board. Finish with true, when it's completely filled
                if(this.generateBoard()) {return true}
                 this.matrix[row][col] = 0
             
            }
        //When no numbers left in array, it means no number is legal to be placed in a cell
        
        return false
        
        }

    countSolutions(count) {
        
         let isComplete=true
         let row, col
         //Check the board. If it's completely filled - return true. If not, remember the last empty space
         for(let i=0;i<this.SIZE*this.SIZE;i++) {
             if(this.hiddenMatrix[Math.floor(i/this.SIZE)][i%this.SIZE]===0) {
                 row=Math.floor(i/this.SIZE)
                 col=i%this.SIZE
                 isComplete=false
                 break
             }
         }
 
         if(isComplete) {
             //this.listMat.push(this.matrix)
             return 1+count
         }
         
         //Fill the array with numbers 1-9 in random order
         
         let rndNums = []
         while (rndNums.length<this.SIZE) {
             let rndNum = Math.floor(Math.random() * this.SIZE)+1
             
             if(!rndNums.includes(rndNum)) {
                  rndNums.push(rndNum)
              } 
          }
           //Exclude the number that is already in matrix from the array
          rndNums=rndNums.filter((num)=>this.checkRow(this.hiddenMatrix,row, num) && this.checkCol(this.hiddenMatrix, col, num) && this.checkBox(this.hiddenMatrix,row,col,num))
          
          //Try out all the numbers from array and see, if they can be placed inside a given cell (by Sudoku rules). Return that legal number
          let num
         
          while(rndNums.length!=0) {
              num = rndNums.pop()
              
                  //Put the legal number into the board
                 this.hiddenMatrix[row][col] = num
                  //Recursively call itself with modified board. Finish with true, when it's completely filled
                 //if(this.generateBoard()) {return true}
                 count = this.countSolutions(count)
                  this.hiddenMatrix[row][col] = 0
              
             }
         //When no numbers left in array, it means no number is legal to be placed in a cell
         
          
          return count
         
     }
    //Hide random numbers in Sudoku board by setting their value to zero
    hideNumbers(showPercent) {
        let show = Math.floor(showPercent*this.SIZE*this.SIZE)
        
        for(let i=0;i<this.SIZE;i++) {
            for(let j=0;j<this.SIZE;j++) {
                this.hiddenMatrix[i][j]=this.matrix[i][j]
            }
        }

    let rndToHide=[]

    while(rndToHide.length<this.SIZE*this.SIZE-show) {
        let rndIndex = Math.floor(Math.random() * this.SIZE*this.SIZE)
        if(!rndToHide.includes(rndIndex)) rndToHide.push(rndIndex)
    }

    rndToHide.forEach(index => {
        this.hiddenMatrix[Math.floor(index/this.SIZE)][index%this.SIZE]=0
        
    });
    
}

    //Print the complete and solved version of the board
    printCompleteBoard() {
        console.log(`${this.name} (Solved)`)
        let strMat=''
        for(let i=0;i<this.SIZE;i++) {
            for(let j=0;j<this.SIZE;j++) {
                strMat+=this.matrix[i][j] + ' '
            }
            strMat+='\n'
        }
       console.log(strMat)
       
    }
    //Print the challenge game board (with hidden numbers)
    printHiddenBoard(showPercent) {
        console.log(`${this.name} (${showPercent*100}% shown)`)
        
        let strMat=''
        for(let i=0;i<this.SIZE;i++) {
            for(let j=0;j<this.SIZE;j++) {
                strMat+=this.hiddenMatrix[i][j] + ' '
            }
            strMat+='\n'
        }
       console.log(strMat)
    }
    
}

function printScreen(mat, size) {

    win.innerHTML='Good Luck'
    board.innerHTML = ''
   
    for(let i=0;i<size;i++) {
        let tr = document.createElement('tr')
        tr.setAttribute('class', `tr${size}`)
        for(let j=0;j<size;j++) {
            let td = document.createElement('td')
            td.setAttribute('class', `td${size}`)
            let numEl = document.createElement('input');
            numEl.setAttribute('type', 'text')
            numEl.setAttribute('maxlength', '1')
            numEl.setAttribute('class', 'dig')
            numEl.setAttribute('onfocus', `this.value=''`)
            numEl.addEventListener('keyup', function(e){
              if(!e.target.value.match(`[1-${size}]`)) e.target.value=''
            });  

            if(mat[i][j]!=0) {
                numEl.setAttribute('value',  mat[i][j])
                numEl.setAttribute('disabled','')
            }
            else {
                numEl.setAttribute('value',  '')
                }
                td.appendChild(numEl)
                tr.appendChild(td)
        }
        board.appendChild(tr)
    }  
   
}

function runGame() {
    
    //Initialize empty boards
    game = new Sudoku(size)
    let c
    do {
        game.generateBoard()
        game.hideNumbers(hintPercent)
        c = game.countSolutions(0)
        console.log(`Number of solutions: ${c}`)
    }
    while(c!=1)
    
    printScreen(game.hiddenMat,game.size)
  
}

function checkGame() {
    let matAnswer = []
    let cellArr= document.getElementsByClassName("dig")
    //Fill matrix with zeroes
    for (let i=0;i<game.size;i++) {
        let row=[]
        for (let j=0;j<game.size;j++) {
            
                 cellArr[game.size*i+j].style['background-color'] = ''
                row.push(parseInt(cellArr[game.size*i+j].value))
        }

        matAnswer.push(row)
    }
    let invalid = game.checkAnswer(matAnswer)
   
    invalid.forEach(element => {
        cellArr[element].style['background-color'] = 'red'
        
    });

  
    if(invalid.length===0){
        board.style["animation-name"] = "example"
        board.style["animation-duration"] = "1s"
        win.innerHTML='Correct!'
        setTimeout(function(){
            board.style["animation-name"] = ""
            board.style["animation-duration"] = ""
            runGame()
        }, 1000);
    } 
}
    function setBoard4x4() {
        size=4
        runGame()
    }

    function setBoard6x6() {
        size=6
        runGame()
    }

    function setBoard9x9() {
        size=9
        runGame()
    }
    
    function setGameEasy() {
        hintPercent=0.75
        runGame()

    }

    function setGameNormal() {
        hintPercent=0.5
        runGame()
    }

    function setGameHard() {
        hintPercent=0.4
        runGame()
    }

let game 
let size=9, hintPercent=0.5
let board= document.getElementById("numbers")
let win= document.getElementById("win")

runGame()





