import { Component } from '@angular/core';

@Component({
  selector: 'my-board',
  template: `
  <div class="refresh-div">
    <button (click)="resetBoard()" class="button">Refresh Game</button>
  </div>
  <div class="clearfix">
  <my-cell *ngFor="let cell of cells | slice: 0: 3; let i = index" [value]="cell" (userClick)=clickHandler(i)></my-cell><br>
  </div>
  <div class="clearfix">
     <my-cell *ngFor="let cell of cells | slice: 3: 6; let i = index" [value]="cell" (userClick)=clickHandler(i+3)></my-cell><br>
  </div>
  <div class="clearfix">
     <my-cell *ngFor="let cell of cells | slice: 6; let i = index" [value]="cell" (userClick)=clickHandler(i+6)></my-cell><br>
  </div>
  <div class="winner-text" *ngIf="winner && winner != 'tie'">
    winner is {{winner}}
  </div>
  <div class="winner-text" *ngIf="winner && winner == 'tie'">
    It's  a tie!
  </div>
  `,
  styles: [
    `.clearfix::after {
    content: "";
    clear: both;
    display: table;
}
    .winner-text {
      font-size: 25px;
    }

    .refresh-div {
      margin-bottom: 40px;
    }

    .button {
      background-color: #4CAF50; /* Green */
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
    }`
  ]
})
export class BoardComponent {
  private cells: string[] = [];
  private turn: string = 'x';
  private gameover = false;
  private winner = null;
  private turns = 0;
  private turnsArr = [];

  ngOnInit() {
    this.resetBoard();
  }

  resetBoard() {
    this.turns = 0;
    this.turnsArr = [];
    this.turn = 'x';
    this.gameover = false;
    this.winner = null;

    for (let i = 0; i < 9; i++) {
      this.cells[i] = null;
    }
  }

  init() {
    for (let i = 0; i < 9; i++) {
      this.cells[i] = null;
    }
    this.turn = 'x';
    this.gameover = false;
    this.winner = null;
  }

  clickHandler(idx: number) {
    if (!this.gameover) {
      if (this.cells[idx] === null) {
        this.cells[idx] = this.turn;
        this.checkWinner();
        this.turns = this.turns + 1;
        this.turnsArr.push( idx );
        this.changeTurn();
      }
    }
  }

  changeTurn() {
    if (this.turn === 'x') {
      this.turn = 'o';
      this.defensiveAlgorithm();
    } else {
      this.turn = 'x';
    }
  }

  checkWinner() {
    let lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let line of lines) {
      if (this.cells[line[0]] === this.cells[line[1]] && this.cells[line[1]] === this.cells[line[2]] && this.cells[line[0]] !== null) {
        this.gameover = true;
        this.winner = this.cells[line[0]];
        return;
      }
    }

    let occupy = 0;
    this.cells.forEach((e) => {
      occupy += (e !== null ? 1 : 0)
    });

    if (occupy === 9) {
      this.gameover = true;
      this.winner = 'tie';
    }
  }

  generateRandom( min, max ) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomShot() {
    let random = this.generateRandom( 0, 8 );
    if( this.turnsArr.indexOf( random ) == -1 ) {
      this.clickHandler( random );
    } else {
      this.randomShot();
    }
  }

  checkIfDefenseRequired( singleWinnerLine ) {
    let first;
    let second;
    let third;

    //Case 1
    first = singleWinnerLine[0];
    second = singleWinnerLine[1];
    third = singleWinnerLine[2];

    if( this.turnsArr.indexOf( first ) == -1 && this.cells[second] == 'x' && this.cells[third] == 'x' ) {
        return first;
    }

    //Case 2
    first = singleWinnerLine[0];
    second = singleWinnerLine[1];
    third = singleWinnerLine[2];

    if( this.turnsArr.indexOf( second ) == -1 && this.cells[first] == 'x' && this.cells[third] == 'x' ) {
        return second;
    }

    //Case 3
    first = singleWinnerLine[0];
    second = singleWinnerLine[1];
    third = singleWinnerLine[2];

    if( this.turnsArr.indexOf( third ) == -1 && this.cells[first] == 'x' && this.cells[second] == 'x' ) {
        return third;
    }

    return -1;
  }

  defensiveAlgorithm() {
    if( this.turns == 1 ) {
      this.randomShot();
    } else {
      let lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];

      // console.log( this.checkIfDefenseRequired([0,1,2]) )

      let shootIndex = -1;
      lines.forEach(( singleWinnerLine ) => {
        if( shootIndex == -1 ) {
          shootIndex = this.checkIfDefenseRequired(singleWinnerLine);
        }
      });

      console.log(shootIndex)

      if( shootIndex == -1 ) {
        this.randomShot();
      } else {
        this.clickHandler( shootIndex );
      }
    }
  }
}
