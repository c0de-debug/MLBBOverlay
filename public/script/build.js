function fetchData() {
    fetch('/database/postgame.json')
        .then(response => response.json())
        .then(data => {
            // Blue side (rows 1-5)
            for (let i = 0; i < 5; i++) {
                const playerDiv = document.getElementById(`blueside${i + 1}`);
                const playerData = data[i];
                for (let j = 1; j <= 6; j++) {
                    const itemDiv = playerDiv.querySelector(`#item${j}`);
                    const itemName = playerData[`ITEM ${j}`];
                    itemDiv.style.backgroundImage = `url('Assets/itemandspell/${itemName ? itemName : 'idle'}.png')`;
                }
            }
            // Red side (rows 7-11)
            for (let i = 0; i < 5; i++) {
                const playerDiv = document.getElementById(`redside${i + 1}`);
                const playerData = data[i + 6];
                for (let j = 1; j <= 6; j++) {
                    const itemDiv = playerDiv.querySelector(`#item${j}`);
                    const itemName = playerData[`ITEM ${j}`];
                    itemDiv.style.backgroundImage = `url('Assets/itemandspell/${itemName ? itemName : 'idle'}.png')`;
                }
            }
        })
        .catch(error => console.error('Error loading JSON:', error));
}

// Fetch data immediately on load
fetchData();

// Fetch data every 5 seconds for real-time updates
setInterval(fetchData, 3000);