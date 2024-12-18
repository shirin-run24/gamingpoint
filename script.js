const flags = [
    {country: "India", info: "India: World's largest democracy", image: "https://flagcdn.com/in.svg"},
    {country: "USA", info: "USA: 50 states and 13 stripes", image: "https://flagcdn.com/us.svg"},
    {country: "United Kingdom", info: "United Kingdom: Union Jack represents multiple kingdoms", image: "https://flagcdn.com/gb.svg"},
    // Add other flags here...
];

let timerInterval, lives = 3, score = 0, highScore = 0;

function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
    resetGame();
    loadFlag();
}

function resetGame() {
    lives = 3;
    score = 0;
    updateDisplay();
}

function loadFlag() {
    const randomFlag = flags[Math.floor(Math.random() * flags.length)];
    document.getElementById('flagImage').src = randomFlag.image;

    const options = [...flags]
        .sort(() => Math.random() - 0.5)
        .slice(0, 4)
        .map(flag => flag.country);

    if (!options.includes(randomFlag.country)) {
        options[Math.floor(Math.random() * 4)] = randomFlag.country;
    }

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.innerText = option;
        button.onclick = () => checkAnswer(option, randomFlag);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selected, correctFlag) {
    if (selected === correctFlag.country) {
        score++;
        document.getElementById('result').innerText = "Correct!";
    } else {
        lives--;
        document.getElementById('result').innerText = `Wrong! It's ${correctFlag.country}`;
    }

    if (lives === 0) {
        gameOver();
    } else {
        loadFlag();
        updateDisplay();
    }
}

function updateDisplay() {
    document.getElementById('lives').innerText =` Lives: ${lives}`;
    document.getElementById('highScore').innerText = High `Score: ${highScore}`;
}

function gameOver() {
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('gameOverScreen').style.display = 'block';
    document.getElementById('finalScore').innerText = `Score: ${score}`;
    highScore = Math.max(highScore, score);
}