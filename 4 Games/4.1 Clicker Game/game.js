        var setBalance = document.querySelector("#setBalance");
        var ewfiu = document.querySelector("#ewfiu");
        const upgradeButtons = [
            document.querySelector("#upgradeButton1"),
            document.querySelector("#upgradeButton2"),
            document.querySelector("#upgradeButton3"),
            document.querySelector("#upgradeButton4"),
            document.querySelector("#upgradeButton5")
        ];

        var multiplier = document.querySelector("#multiplier");
        var multiplierValue;
        var amount;

        var upgradeAmount1 = document.querySelector("#upgradeAmount1");
        var upgradeAmount2 = document.querySelector("#upgradeAmount2");
        var upgradeAmount3 = document.querySelector("#upgradeAmount3");
        var upgradeAmount5 = document.querySelector("#upgradeAmount5");
        var upgradeCost1 = document.querySelector("#upgradeCost1");
        var upgradeCost2 = document.querySelector("#upgradeCost2");
        var upgradeCost3 = document.querySelector("#upgradeCost3");
        var upgradeCost4 = document.querySelector("#upgradeCost4");
        var upgradeCost5 = document.querySelector("#upgradeCost5");
        var balance = document.querySelector("#balance")

        var warningMessage = document.querySelector("#warningMessage");

        var mainButton = document.querySelector("#mainButton");

        const upgrades = [
            /*clicks, price */
            [1,100],
            [2,540],
            [3,540],
            [0,3240],
            [4,532]
        ]

        function apples(valueOne, valueTwo) {
            var sum = valueOne + valueTwo;
            return sum;
        }

       apples(2,6);
        // Does soemthing cool
        const buttonsUpgrade = upgradeButtons.map((button, index) => {
            return button.addEventListener('click', () => upgradeClicker(index)), button.addEventListener('click', () => buttonID(index));
        });

        initializeStartValues();

        // Function to upgrade clicker
        function upgradeClicker(upgradeButton) {
            const price = upgrades[upgradeButton][1];
            const clicks = upgrades[upgradeButton][0];
            if (amount < price) {
                upgradeButtons[upgradeButton].innerHTML = `Insufficient balance`
                warningMessage.style.display = "block";
                upgradeButtons[upgradeButton]
                warningMessage.innerHTML = `
                debug:<br>
                values: p${price}, c${clicks} <br>
                clickedButton: ${upgradeButton+1} <br>
                <hr>
                Insufficent balance! You are missing ${price-amount+"kr"}!`;
                warningMessage.style.color = "white";
                warningMessage.style.backgroundColor = "red"
                upgradeButtons[upgradeButton].style.backgroundColor = "white";
                upgradeButtons[upgradeButton].style.color = "#D72638";
                upgradeButtons[upgradeButton].style.cursor = "default";
                
                setTimeout((clearMessage) => {
                    upgradeButtons[upgradeButton].style.backgroundColor = "unset";
                    upgradeButtons[upgradeButton].style.color = "white";
                    upgradeButtons[upgradeButton].style.cursor = "pointer";
                    warningMessage.textContent = " ";
                    warningMessage.style.display = "none";
                    upgradeButtons[upgradeButton].innerHTML = `
                    <span>+${clicks} clicks</span>
                    <span>${price+"kr"}</span>
                    `
                }, 1000)
            } else {
                multiplierValue = multiplierValue + clicks;
                amount = amount - price;
                updateAll();   
            }
        }
        // The clicker
        mainButton.addEventListener('click', (e) => {
            amount = amount + multiplierValue;
            balance.textContent = amount;
            checkPurchaseable();
        });

        /* SET BALANCE */
        function submit() {
            amount = setBalance.value;
            updateAll();
        }




        /* Warning messages */
        function insufficientBalance() {
            /* Temporarily removed */
        }
      // Initialize start values.
        function initializeBalance() {
            amount = 0;
            balance.textContent = amount;
        }
        function initializeMultiplier() {
            multiplierValue = 1;
            multiplier.textContent = multiplierValue;
        }
        function initializeButtonValues() {
            upgradeCost1.textContent = upgrades[0][1];
            upgradeCost2.textContent = upgrades[1][1];
            upgradeCost3.textContent = upgrades[2][1];
            upgradeCost4.textContent = upgrades[3][1];
            upgradeCost5.textContent = upgrades[4][1];
            upgradeAmount1.textContent = upgrades[0][0];
            upgradeAmount2.textContent = upgrades[1][0];
            upgradeAmount3.textContent = upgrades[2][0];
            upgradeAmount5.textContent = upgrades[4][0];
        }

        // Initializes all start values.
        function initializeStartValues() {
            initializeBalance();
            initializeMultiplier();
            initializeButtonValues();

        }




        // Update existing values to the correct ones on event updates.
        function updateMultiplier() {
            multiplier.textContent = multiplierValue;
        }
        function updateBalance() {
            balance.textContent = amount;
        }
        // Updates all exisiting values to the correct ones on event updates.
        function updateAll() {
            updateMultiplier();
            updateBalance();
            loadButtonValues();
        }