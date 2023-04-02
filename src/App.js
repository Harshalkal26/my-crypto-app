// import React from 'react'

// const App = (props) => {
//   return (
//     <h2>{props.name}</h2>
//   )
// }

// export default App;
import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import Coin from './Coin'


function App() {
  const [coins,setCoins] = useState([])
  const [search,setSearch] = useState('')
  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en')
    
    .then(res=>{
       setCoins(res.data)
       console.log(res.data)
    }).catch(error=>console.log(error))
  }, [])
  const handleChange = e =>{
    setSearch(e.target.value)
  }
  const filteredCoins = coins.filter(coin=>
    coin.name.toLowerCase().includes(search.toLowerCase())
    )
  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">SEARCH YOUR DESIRED <img class="coin-logo" src="https://cdn-icons-png.flaticon.com/512/600/600282.png" alt="alternatetext"></img> COIN</h1>
        
        <form action="">
          <input type="text" className="coin-input" placeholder="Provide the coin name" onChange={handleChange}/>

        </form>

      </div>
      {filteredCoins.map(coin=>{
        return(
          <Coin 
          key={coin.id} 
          name={coin.name} 
          image={coin.image} 
          symbol={coin.symbol}
          marketcap={coin.market_cap}
          price={coin.current_price}
          pricechange={coin.price_change_percentage_24h}
          volume={coin.total_volume}
          />
        );
      })}


    </div>
  );
}

export default App;
