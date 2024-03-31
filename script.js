// Function to fetch data from Binance API
async function fetchData() {
    const response = await fetch('https://fapi.binance.com/fapi/v1/ticker/24hr');
    const data = await response.json();
    return data;
}

// Function to display coin data on the webpage
async function displayCoins() {
    const coinList = document.getElementById('coinList');
    coinList.innerHTML = ''; // Clear previous data

    const coins = await fetchData();

    // Ordenar las monedas de mayor a menor aumento
    coins.sort((a, b) => parseFloat(b.priceChangePercent) - parseFloat(a.priceChangePercent));

    coins.forEach(coin => {
        const symbol = coin.symbol;
        const priceChangePercent = parseFloat(coin.priceChangePercent);

        const coinElement = document.createElement('div');
        coinElement.classList.add('coin');
        
        coinElement.innerHTML = `
            <span>${symbol}</span>
            <span>${priceChangePercent.toFixed(2)}%</span>
        `;

        if (priceChangePercent > 0) {
            coinElement.classList.add('green');
        }

        coinList.appendChild(coinElement);
    });
}

// Call the displayCoins function initially and every 5 seconds for real-time updates
displayCoins();
setInterval(displayCoins, 10000);
