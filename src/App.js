import React from "react";
import "./App.css";
import Card from "./components/Card.js";
import axios from "axios";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idCount: 20,
      howBadAreYou: 0,
      clickNum: 0,
      clickedId: 0,
      clickedSrc: "",
      clickedId2: 0,
      clickedSrc2: "",
      numOfCorrectPairs: 0,
      numOfPairs: 10,
      /*cards: [{
        id: 0,
        pic: 'BlackPanther',
        imgSrc: './img/black-panther.jpg',
        flipped: false,
        trueFlip: false

      },
      {
        id: 1,
        pic: 'Iron Man',
        imgSrc: './img/iron-man.jpg',
        flipped: false,
        trueFlip: false

      },
      {
        id: 2,
        pic: 'Iron Man',
        imgSrc: './img/spider-man.jpg',
        flipped: false,
        trueFlip: false
      },
      {
        id: 3,
        pic: 'BlackPanther',
        imgSrc: './img/hulk.jpg',
        flipped: false,
        trueFlip: false

      },
      {
        id: 4,
        pic: 'BlackPanther',
        imgSrc: './img/thor.jpg',
        flipped: false,
        trueFlip: false

      },
      {
        id: 5,
        pic: 'Iron Man',
        imgSrc: './img/xmen-rogue.jpg',
        flipped: false,
        trueFlip: false

      },
      {
        id: 6,
        pic: 'Iron Man',
        imgSrc: './img/xmen-wolverine.jpg',
        flipped: false,
        trueFlip: false
      },
      {
        id: 7,
        pic: 'BlackPanther',
        imgSrc: './img/black-widow.jpg',
        flipped: false,
        trueFlip: false

      },
      {
        id: 8,
        pic: 'BlackPanther',
        imgSrc: './img/captain-america.jpg',
        flipped: false,
        trueFlip: false

      },
      {
        id: 9,
        pic: 'Iron Man',
        imgSrc: './img/captain-marvel.jpg',
        flipped: false,
        trueFlip: false

      },
      {
        id: 10,
        pic: 'Iron Man',
        imgSrc: './img/iron-man.jpg',
        flipped: false,
        trueFlip: false
      },
      {
        id: 11,
        pic: 'BlackPanther',
        imgSrc: './img/black-panther.jpg',
        flipped: false,
        trueFlip: false

      },
      {
        id: 12,
        pic: 'Thor',
        imgSrc: './img/thor.jpg',
        flipped: false,
        trueFlip: false

      },
      {
        id: 13,
        pic: 'Black Widow',
        imgSrc: './img/black-widow.jpg',
        flipped: false,
        trueFlip: false

      },
      {
        id: 14,
        pic: 'Wolverine',
        imgSrc: './img/xmen-wolverine.jpg',
        flipped: false,
        trueFlip: false
      },
      {
        id: 15,
        pic: 'Hulk',
        imgSrc: './img/hulk.jpg',
        flipped: false,
        trueFlip: false

      },
      {
        id: 16,
        pic: 'Rogue',
        imgSrc: './img/xmen-rogue.jpg',
        flipped: false,
        trueFlip: false

      },
      {
        id: 17,
        pic: 'Spider Man',
        imgSrc: './img/spider-man.jpg',
        flipped: false,
        trueFlip: false

      },
      {
        id: 18,
        pic: 'Captain America',
        imgSrc: './img/captain-america.jpg',
        flipped: false,
        trueFlip: false
      },
      {
        id: 19,
        pic: 'Captain Marvel',
        imgSrc: './img/captain-marvel.jpg',
        flipped: false,
        trueFlip: false

      }]*/
    }
  }
  componentDidUpdate() {
    if (this.state.numOfPairs <= (this.state.numOfCorrectPairs)) {
      //alert('You solved it in ' + this.state.howBadAreYou + ' tries!')
      if (window.confirm('You Solved it in ' + this.state.howBadAreYou + ' tries!\nWould you like to Replay?')) this.handleShuffle();

      console.log('Success');
    }
    if (this.state.clickNum === 2) {
      let newCards;
      let timer = 1000;
      let correctPair = 0;
      if (this.state.clickedSrc === this.state.clickedSrc2) {
        timer = 0;
        correctPair++;
        newCards = this.state.cards.map((card) => {
          if (card.id === this.state.clickedId || card.id === this.state.clickedId2) {
            return {
              ...card,
              trueFlip: (!card.trueFlip)
            }
          }
          else {
            return {
              ...card
            }
          }
        })
      }
      else {
        newCards = this.state.cards.map((card) => {
          if (card.id === this.state.clickedId || card.id === this.state.clickedId2) {
            return {
              ...card,
              flipped: (!card.flipped)
            }
          }
          else {
            return {
              ...card
            }
          }
        })
      }
      setTimeout(() => this.setState({ cards: newCards, clickNum: 0, howBadAreYou: this.state.howBadAreYou + 1, numOfCorrectPairs: this.state.numOfCorrectPairs + correctPair }), timer);
      console.log(this.state.numOfPairs + " is less than " + (this.state.numOfCorrectPairs + correctPair));
      //this.setState({ cards: newCards, clickNum: 0 })
    }
  }

  handleClick = (e, cardId, cardFlipped, trueCardFlipped) => {
    e.preventDefault();

    if (cardFlipped === false && trueCardFlipped === false) {
      //let newCards;
      if (this.state.clickNum === 0) {
        let newCards = this.state.cards.map((card) => {
          if (card.id === cardId) {
            this.setState({ clickNum: (this.state.clickNum + 1), clickedId: card.id, clickedSrc: card.imgSrc });
            return {
              ...card,
              flipped: (!card.flipped)
            }
          }
          else {
            return {
              ...card
            }
          }
        })
        this.setState({ cards: newCards });
      }
      else if (this.state.clickNum === 1) {
        let newCards = this.state.cards.map((card) => {
          if (card.id === cardId) {
            this.setState({ clickNum: 2, clickedId2: card.id, clickedSrc2: card.imgSrc });
            return {
              ...card,
              flipped: (!card.flipped)
            }
          }
          else {
            return {
              ...card
            }
          }
        });
        //take out case 2, make a delay instead
        this.setState({ cards: newCards });
      }
    }
  }

  componentDidMount() {
    //this.handleDuplicate();
    //public marvelAPI key: 2803538e776609801c76f2cee2dc30f1
    axios.get("https://gateway.marvel.com/v1/public/characters", {
      params: {
        apikey: "2803538e776609801c76f2cee2dc30f1",
        orderBy: "-modified",
        limit: 10
      }
    })
      .then((response) => {
        // handle success
        console.log(response.data.data.results);
        let characters = response.data.data.results.map((c, i) => {
          return {
            id: i,
            name: c.name,
            pic: c.name,
            imgSrc: `${c.thumbnail.path}.${c.thumbnail.extension}`,
            flipped: false,
            trueFlip: false,
          }
        })
        //this.setState({ cards: newCards, idCount: inCount, numOfPairs: (this.state.cards.length) });
        this.setState({ cards: characters });
        this.handleDuplicate();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }



  handleShuffle = () => {
    let copiedCards = this.state.cards.map(card => {
      return { ...card, flipped: false, trueFlip: false }
    })
    let randomCards = [];
    for (let i = 0; i < this.state.cards.length; i++) {
      let randomNum = Math.round(Math.random() * (copiedCards.length - 1));
      // randomCards[i] = copiedCards[randomNum];
      // copiedCards.splice(randomNum, 1);
      //console.log(copiedCards);
      randomCards.push(copiedCards.splice(randomNum, 1)[0]);
      randomCards[i] = {
        ...randomCards[i],
        id: i
      }
    }
    //console.log(randomCards);

    this.setState({ cards: randomCards, howBadAreYou: 0, numOfCorrectPairs: 0 });
  }

  handleDuplicate = () => {
    let inCount = this.state.idCount
    let newCards = this.state.cards.map(card => {
      return {
        ...card,
      }
    })
    this.state.cards.forEach(card => {
      newCards[newCards.length] = { ...card, id: inCount };
      inCount++;
    });
    //return newCards, inCount;

    this.setState({ cards: newCards, idCount: inCount, numOfPairs: (this.state.cards.length) });
  }

  render() {
    const cardGrid = ((this.state.hasOwnProperty('cards')) ? this.state.cards.map(card => {
      return (<Card key={card.id} card={card} handleClick={e =>
        this.handleClick(e, card.id, card.flipped, card.trueFlip)} />)
    }) : (<h1> Gathering Card Images </h1>))

    return (
      <div className="App">
        <header><h2>Magnificent Marmot Marvel Memory Match</h2></header>
        <div className='gridContainer'>
          {cardGrid}
        </div>
        <button onClick={(e) => this.handleShuffle()}> Shuffle</button>
      </div>
    );
  }
}

export default App;