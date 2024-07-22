document.addEventListener('DOMContentLoaded', () => {
    let gold = 0;
    let rank = 'Novice';
    const rankThresholds = [
        { rank: 'Novice', threshold: 0 },
        { rank: 'Explorer', threshold: 100 },
        { rank: 'Adventurer', threshold: 250 },
        { rank: 'Master Treasure Hunter', threshold: 500 },
    ];
    
    const goldElement = document.getElementById('gold');
    const rankElement = document.getElementById('rank');
    const expeditionBtn = document.getElementById('expeditionBtn');
    const buyMapBtn = document.getElementById('buyMap');
    const buyCompassBtn = document.getElementById('buyCompass');
    
    expeditionBtn.addEventListener('click', goOnExpedition);
    buyMapBtn.addEventListener('click', () => buyItem('map', 50));
    buyCompassBtn.addEventListener('click', () => buyItem('compass', 100));

    function goOnExpedition() {
        const earnings = Math.floor(Math.random() * 20) + 1; // Earn between 1 and 20 gold
        gold += earnings;
        updateGold();
        updateRank();
    }
    
    function updateGold() {
        goldElement.textContent = gold;
    }
    
    function updateRank() {
        for (const { rank: r, threshold } of rankThresholds) {
            if (gold >= threshold) {
                rank = r;
            }
        }
        rankElement.textContent = rank;
    }
    
    function buyItem(item, cost) {
        if (gold >= cost) {
            gold -= cost;
            updateGold();
            alert(`You bought a ${item}!`);
        } else {
            alert('Not enough gold!');
        }
    }
});
