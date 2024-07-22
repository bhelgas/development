/*
        upgradeButton1.addEventListener('click', (Upgrade) => {
            if (amount < upgrades[0][1]) {
                insufficientBalance();
                clearMessage();
            } else {
                multiplierValue = multiplierValue + upgrades[0][0];
                amount = amount - upgrades[0][1];
                updateAll();   
            }
        });

        upgradeButton2.addEventListener('click', (Upgrade) => {
            if (amount < upgrades[1][1]) {
                insufficientBalance();
                clearMessage();
            } else {
                multiplierValue = multiplierValue +upgrades[1][0];
                amount = amount - upgrades[1][1];
                updateAll();   
            }
        });
        if (amount > 1000) {
            upgradeButton5.style.display = "flex";
        }
        upgradeButton3.addEventListener('click', (Upgrade) => {
            if (amount < upgrades[2][1]) {
                insufficientBalance();
                clearMessage();
            } else {
                multiplierValue = multiplierValue + upgrades[2][0];
                amount = amount - upgrades[2][1];
                updateAll();   
            }
        });

        upgradeButton5.addEventListener('click', (Upgrade) => {
            if (amount < upgrades[3][1]) {
                insufficientBalance();
                clearMessage();
            } else {
                multiplierValue = multiplierValue + upgrades[3][0];
                amount = amount - upgrades[3][1];
                updateAll();   
            }
        });

        upgradeButton4.addEventListener('click', (Upgrade) => {
            if (amount < upgrades[4][1]) {
                insufficientBalance();
                clearMessage();
            } else {
                multiplierValue = multiplierValue * 2;
                amount = amount - upgrades[4][1];
                updateAll();   
                upgradeButton4.style.display = "none";
                ewfiu.textContent = "ON COOLDOWN";
                    setTimeout((reDisplay) => { 
                        ewfiu.textContent = "";
                        upgradeButton4.style.display = "flex";
                    }, 0)
            }
        });
        */
        




        /*
        function updateMultiplierText() {
            multiplier.textContent = multiplierValue;
        }
        function updateAmountText() {
            balance.textContent = amount;
        }
        function warningMessage() {
            warningMessage.textContent = "Not enough money";
            warningMessage.style.color = "var(--test)";
        }
        function successMessage() {
            warningMessage.textContent = "Successfully purchased upgrade";
            warningMessage.style.color = "#00ff00";
        }
        function clearWarningMessage() {
            setTimeout(func => {
                warningMessage.textContent = " ";
                warningMessage.style.color = "red";
                }, 1000)
        }
        function update() {
                updateAmountText();
                updateMultiplierText();
                successMessage();
                clearWarningMessage();
        }
        function updateBalance() {
            balance.textContent = amount;
        }
        function verifyBalance() {
            if (balance < 0) {
                amount = 0;
                updateBalance();
            }
        }


        upgradeButton1.addEventListener('click', (upgrade) => {
            if (balance <= upgrade1[1]) {
                warningMessage();
                clearWarningMessage();
            } else {
                amount = amount - upgrade1[1];
                multiplierValue = multiplierValue + upgrade1[0];
                update();
            }
        })
        upgradeButton2.addEventListener('click', (upgrade) => {
            if (balance <= upgrade2[1]) {
                warningMessage();
                clearWarningMessage();
            } else {
                amount = amount - upgrade2[1];
                multiplierValue = multiplierValue + upgrade2[0];
                update();
            }
        })
        upgradeButton3.addEventListener('click', (upgrade) => {
            if (balance <= upgrade3[1]) {
                warningMessage();
                clearWarningMessage();
            } else {
                amount = amount - upgrade3[1];
                multiplierValue = multiplierValue + upgrade3[0];
                update();
            }
        })
        mainButton.addEventListener('click', (money) => {
            amount = amount + multiplierValue;
            balance.textContent = amount;
        })

        */