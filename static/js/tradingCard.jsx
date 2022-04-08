const tradingCardData = [
  {
    name: 'Balloonicorn',
    skill: 'video games',
    imgUrl: '/static/img/balloonicorn.jpg',
    cardId: 1,
  },
  {
    name: 'Float',
    skill: 'baking pretzels',
    imgUrl: '/static/img/float.jpg',
    cardId: 2,
  },
  {
    name: 'Llambda',
    skill: 'knitting scarves',
    imgUrl: '/static/img/llambda.jpg',
    cardId: 3,
  },
  {
    name: 'Off-By-One',
    skill: 'climbing mountains',
    imgUrl: '/static/img/off-by-one.jpeg',
    cardId: 4,
  },
  {
    name: 'Seed.py',
    skill: 'making curry dishes',
    imgUrl: '/static/img/seedpy.jpeg',
    cardId: 5,
  },
  {
    name: 'Polymorphism',
    skill: 'costumes',
    imgUrl: '/static/img/polymorphism.jpeg',
    cardId: 6,
  },
  {
    name: 'Short Stack Overflow',
    skill: 'ocean animal trivia',
    imgUrl: '/static/img/shortstack-overflow.jpeg',
    cardId: 7,
  },
  {
    name: 'Merge',
    skill: 'bullet journaling',
    imgUrl: '/static/img/merge.png',
    cardId: 8,
  },
];

function TradingCard(props) {
  return (
    <div className="card">
      <p>Name: {props.name}</p>
      <img src={props.imgUrl} alt="profile" />
      <p>Skill: {props.skill} </p>
    </div>
  );
}
function AddTradingCard(props) {
  const [name, setName] = React.useState('');
  const [skill, setSkill] = React.useState('');
  function AddNewCard() {
    fetch('/add-card', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({name, skill}),
    }).then(response=>{
      response.json().then(jsonResponse => {
        const {cardAdded} = jsonResponse; // same as cardAdded = jsonResponse.cardAdded
        const {cardId, name: cardName, skill: cardSkill} = cardAdded;
        props.addCard(cardId, cardName, cardSkill);
      });
    });
  }
  return (
    <React.Fragment>
      <h2>Add New Trading Card</h2>
      <label htmlFor="nameInput">
        Name
        <input
          value={name}
          onChange={event => setName(event.target.value)}
          id="nameInput"
          style={{marginLeft: '5px'}}
        />
      </label>
      <label htmlFor="skillInput" style={{marginLeft: '10px', marginRight: '5px'}}>
        Skill
        <input value={skill} onChange={event => setSkill(event.target.value)} id="skillInput" />
      </label>
      <button type="button" style={{marginLeft: '10px'}} onClick={addNewCard}>
        Add
      </button>
    </React.Fragment>
  );
}

function TradingCardContainer() {
  const [cards, setCards] = React.useState([]);

  React.useEffect(()=> {
    fetch('/cards.json')
    .then((response)=> response.json())
    .then((data)=> setCards(data.cards))
  }, [])
  const tradingCards = [];

  for (const currentCard of cards) {
    tradingCards.push(
      <TradingCard
        key={currentCard.name}
        name={currentCard.name}
        skill={currentCard.skill}
        imgUrl={currentCard.imgUrl}
      />
    );
  }

  return <div className="grid">{tradingCards}</div>;
}

ReactDOM.render(<TradingCardContainer />, document.getElementById('container'));
