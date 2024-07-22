document.addEventListener("DOMContentLoaded", () => {
    class Player {
        constructor() {
            this.cash = 0,
            this.rank = "Novice",
            this.experience = 0,
            this.event_currency = 0
            this.rank_thresholds = [
                { rank: "Novice ", threshold: 0 },
                { rank: 'Explorer', threshold: 100 },
                { rank: 'Adventurer', threshold: 250 },
                { rank: 'Master Treasure Hunter', threshold: 500 }
            ];
        }

        earn_cash(amount) {
            this.cash += amount;
            this.update_rank();
        }

        spend_cash() {
            if(this.cash >= amount) {
                this.cash -= amount;
                return true;
            }
            return false;
        }

        update_rank() {
            for(const { rank, threshold } of this.rank_thresholds) {
                if(this.cash >= threshold) {
                    this.rank = rank;
                }
            }
        }
    }

    class Item {
        constructor(name, price) {
            this.name = name,
            this.price = price
        }
    }

    class Shop {
        constructor() {
            this.items = [
                new Item("Sword", 35),
                new Item("Pickaxe", 35),
                new Item("Axe", 35),
                new Item("Shovel", 35)
            ]
        }
    }




    class Game {
        constructor(player, shop) {
            this.player = player;
            this.shop = shop;
            this.init_user_inteface();
        }


        init_user_inteface() {
            this.cash_element = document.getElementById('gold');
            this.rank_element = document.getElementById('rank');
            this.expedition_button = document.getElementById('expeditionBtn');
            this.buy_map_button = document.getElementById('buyMap');
            this.buy_b = document.getElementById('buyCompass');

            this.expeditionBtn.addEventListener('click', () => this.goOnExpedition());
            this.buyMapBtn.addEventListener('click', () => this.shop.buyItem(this.player, 'Map'));
            this.buyCompassBtn.addEventListener('click', () => this.shop.buyItem(this.player, 'Compass'));

            this.update_user_interface();
        }

        go_on_expedition() {
            const earnings = Math.floor(Math.random() * 20) + 1; // Earn between 1 and 20 gold
            this.player.earnGold(earnings);
            this.update_user_interface();
        }

        update_user_interface() {
            this.goldElement.textContent = this.player.gold;
            this.rankElement.textContent = this.player.rank;
        }
    }

    const player = new Player();
    const shop = new Shop();
    new Game(player, shop);

    console.log(...shop.items)
})