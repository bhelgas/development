#include <iostream>
#include <string>
#include <cstdlib> 
#include <stdlib.h>
#include <sstream>
#include <fstream>
#include <algorithm>
#include <thread>
#include <chrono>
#include <vector>


class itemData {
public:
	int id;
	std::string name;
	std::string description;
	int size;

	itemData(const int itemId, std::string& itemName, std::string& itemDescription, int itemSize) 
	: id(itemId), name(itemName), description(itemDescription), size(itemSize) {}
};
// Inventory





// Ext variables  /config

std::string Line = std::string(80, '-');
int jobReward_money;
int jobReward_xp;
const int MAX_RANK = 80;
const int MAX_SHOP = 10;
const int MAX_JOBS = 10;
const int MAX_INVENTORY = 10;

// Default game data
std::string userData_playerName;
std::string userData_activeJob;
int userData_balance = 4000;
int userData_goldenCoins = 0;
int userData_rank = 1;
int sum = (100 * userData_rank);
int userData_XPToRankUp = sum;
int userData_totalXP = 1;
int userData_finishedQuests = 0;
bool userData_hasActiveJob = false;
bool userData_hasActiveQuests = false;
bool userData_SHOP_firstVisit = true;

// Struct for for shop, jobs, items, maybe?

std::vector<itemData> userData_inventory;

void addItemToInventory(const itemData& newItem) {
    userData_inventory.push_back(newItem);
}

struct Jobs {
	std::string jobName;
	int requiredRank;
	std::string jobHelp;
};
struct shop {
	std::string itemName;
	int itemPrice;
	std::string itemDescription;
};
class Items {
	public: 
		std::string name;
		std::string description;
};
// Arrays for shop, inventory, jobs
shop shopItems[MAX_SHOP] = {
	{"Map", 100, "Get access to Explorer job"},
	{"Pickaxe", 200, "Get access to the Miner job"},
	{"Fishing Rod", 250, "Get access to the Fisher job"},
	{"Blacksmith Hammer", 600, "Get access to the Blacksmith job"},
	{"Health Potion", 50, "Reshop health during adventures"},
	{"Energy Drink", 75, "Regain energy for more activities"},
	{"Mage Staff", 800, "Unlock mystical abilities"},
	{"Spyglass", 500, "Enhance exploration capabilities"}
};

Jobs jobList[MAX_JOBS] = {
	{"Miner", 1, "Start mining by typing \"mine\""},
	{"Explorer", 1, "Start exploring by typing \"explore\""},
	{"Fisher", 2, "Start fishing by typing \"fish\""},
	{"Blacksmith", 5, "Coming soon. Quit job"},
	{"Merchant", 5, "Coming soon. Quit job."},
	{"Chef", 3, "Cook food"},
	{"Guard", 4, "Guard the king \x1B[31mHight Pay: Available every 20 minutes\033[0m\t\t"},
	{"Mage", 6, "Unleash magical powers"},
	{"Spy", 1, "Gather intel and explore discreetly"}
};

void saveGame() {
	std::ofstream saveFile("gamedata.txt");

	if (saveFile.is_open()) {
		saveFile << userData_playerName << "\n"
			<< userData_activeJob << "\n"
			<< userData_balance << "\n"
			<< userData_goldenCoins << "\n"
			<< userData_rank << "\n"
			<< userData_XPToRankUp << "\n"
			<< userData_totalXP << "\n"
			<< userData_goldenCoins << "\n"
			<< userData_finishedQuests << "\n"
			<< userData_hasActiveJob << "\n"
			<< userData_hasActiveQuests << "\n"
			<< userData_SHOP_firstVisit << "\n";

		for (const std::string& item : userData_inventory) {
			saveFile << item << "\n";
		}

		saveFile.close();
		std::cout << "\x1B[32mThe game has been saved to gamedata.txt!\n\033[0m";
	}
	else {
		std::cout << "\x1B[31mFailed to save game\033[0m\n";
	}
}
void LoadGame() {
    std::ifstream loadFile("gamedata.txt");

    if (loadFile.is_open()) {
        // Load other game data...
        
        userData_inventory.clear();

        std::string itemName, itemDescription;
        int itemId, itemSize;

        while (loadFile >> itemId >> itemName >> itemDescription >> itemSize) {
            itemData newItem(itemId, itemName, itemDescription, itemSize);
            userData_inventory.push_back(newItem);
        }

        std::cout << "Inventory loaded!" << std::endl;
        
        loadFile.close();
    } else {
        std::cout << "No savegame found!" << std::endl;
    }
}


void _background_saveGame() {
	std::ofstream saveFile("gamedata.txt");

	if (saveFile.is_open()) {
		saveFile << userData_playerName << "\n"
			<< userData_activeJob << "\n"
			<< userData_balance << "\n"
			<< userData_goldenCoins << "\n"
			<< userData_rank << "\n"
			<< userData_XPToRankUp << "\n"
			<< userData_totalXP << "\n"
			<< userData_goldenCoins << "\n"
			<< userData_finishedQuests << "\n"
			<< userData_hasActiveJob << "\n"
			<< userData_hasActiveQuests << "\n"
			<< userData_SHOP_firstVisit << "\n";

		for (const std::string& item : userData_inventory) {
			saveFile << item << "\n";
		}
		std::cout << "Autosaved progress (background save)" << std::endl;
		saveFile.close();
	}
	else {
		std::cout << "\x1B[31mFailed to save game (background save)\033[0m\n";
	}
}
void eraseData() {
	std::string Confirmation;
	std::cout << "\x1B[31mAre you sure you want to delete your game save?\nEnter your username to delete or enter to exit: \033[0m";
	std::cin >> Confirmation;

	if (Confirmation == userData_playerName) {
		if (remove("gamedata.txt") == 0) {
			std::cout << "\x1B[31mGame data has been reset.\033[0m\n";
			std::cout << "playername" << userData_playerName << std::endl;
			exit(0);
		}
		else {
			std::cout << "Error. Data not saved (eraseData()) ";
		}
	}
	else {
		std::cout << "Data not erased" << std::endl;
	}
	
}

void autoSave() {
	std::cout << std::endl;
	std::cout << "\x1B[32m Autosaving game...\033[0m!" << std::endl;
	saveGame();
	std::cout << "Press enter to continue the game" << std::endl;
}
void Exit() {
	std::cout << "Exiting game.." << std::endl;
	std::cout << "Saving.." << std::endl;
	saveGame();
}
void showHelp() {
	std::cout << "\x1B[33mHelp menu \033[0m" << std::endl;
	std::cout << "\nAvailable commands" << std::endl;
	std::cout << "game/save: Saves the current session" << std::endl;
	std::cout << "stats: Check your statistics (profile)" << std::endl;
	std::cout << "game/exit: Exits the game and saves your progress" << std::endl;
}
void viewJobs() {
	std::cout << "Available jobs" << std::endl;
	for (int i = 1; i < MAX_JOBS; i++) {
		if (jobList[i - 1].requiredRank > userData_rank && userData_hasActiveJob == false) {
			std::cout << i << ": " << jobList[i - 1].jobName << "\x1B[31m [Not available]\033[0m Rank requirement: " << jobList[i - 1].requiredRank << std::endl;
		}
		else if (userData_hasActiveJob == true) {
			std::cout << i << ": " << jobList[i - 1].jobName << "\x1B[31m [Not available, you already have a job]\033[0m" << std::endl;
		}
		else {
			std::cout << i << ": " << jobList[i - 1].jobName << "\x1B[32m [Available]\033[0m!" << std::endl;
		}

	}
}
void viewShop() {
	std::cout << "\x1B[31mWelcome to the shop\033[0m \x1B[33mYou have " << userData_balance  << " cash\033[0m" << std::endl;

	if (userData_SHOP_firstVisit == true) {
		std::cout << "\x1B[31mIt seems like you are new here. Your purchase of a pickaxe will be free on us this one time.\nOffer expires next time you play\033[0m\t\t" << std::endl;
		shopItems[1].itemPrice = 0;
		userData_SHOP_firstVisit = false;
	}
	for (int i = 1; i < MAX_SHOP; i++) {
		if (userData_balance < shopItems[i - 1].itemPrice) {
			std::cout << "| " << shopItems[i - 1].itemName << "\n| \x1B[31mPrice: " << shopItems[i - 1].itemPrice << " cash. \033[0m\n| About the product: " << shopItems[i - 1].itemDescription << std::endl;
			std::cout << Line << std::endl;
		}
		else {
			std::cout << "| " << shopItems[i - 1].itemName << "\n| \x1B[32mPrice: " << shopItems[i - 1].itemPrice << " cash. \033[0m\n| About the product: " << shopItems[i - 1].itemDescription << std::endl;
			std::cout << Line << std::endl;
		}
		
	}
}
void viewInventory() {
	std::cout << "\x1B[33mYour inventory\033[0m\t\t" << std::endl;

	if (userData_inventory.size() == 10) {
		std::cout << "\x1B[31mInventory is full\033[0m\t\t" << std::endl;
	}
	else {
		std::cout << "You have " << userData_inventory.size() << " items in your inventory" << std::endl;
	}

	bool isEmpty = true;

	for (int i = 0; i < userData_inventory.size(); i++) {
		if (!userData_inventory.empty()) {
			std::cout << i + 1 << ". " << userData_inventory[i] << std::endl;
			isEmpty = false;
		}
		else {
			std::cout << "Inventory is empty" << std::endl;
		}
	}
}
void itemPush() {
	std::string pushItem;
	std::cout << "Item to push: ";
	std::cin >> pushItem;

	userData_inventory.push_back(pushItem);
	std::cout << "\x1B[32mItem pushed!\n\033[0m" << std::endl;
}
void buyItem(int itemIndex) {
	if (itemIndex >= 1 && itemIndex <= MAX_SHOP) {
		if (userData_balance >= shopItems[itemIndex - 1].itemPrice) {
			userData_balance -= shopItems[itemIndex - 1].itemPrice;

				if (userData_inventory.size() <= 10) {
						userData_inventory.push_back(shopItems[itemIndex - 1].itemName);
						std::cout << "\x1B[32m Item successfully purchased. \033[0m";
					return;
				}
				else {
					std::cout << "\x1B[31mInventory is full. Cannot purchase more items.\033[0m" << std::endl;
				}
			
		}
		else {
			std::cout << "\x1B[31mInsufficient cash\033[0m" << std::endl;
		}
	}
}
void applyForJob(int jobIndex) {
	if (jobIndex >= 1 && jobIndex <= MAX_JOBS) {
		if (userData_rank >= jobList[jobIndex - 1].requiredRank && userData_hasActiveJob == false) {
			std::cout << "You have now joined " << jobList[jobIndex - 1].jobName << std::endl;
			if (jobList[jobIndex - 1].jobName == "Miner") {
				userData_inventory.push_back("Miner's Pickaxe");
			}
			std::cout << "Help: " << jobList[jobIndex - 1].jobHelp << std::endl;
			userData_activeJob = jobList[jobIndex - 1].jobName;
			userData_hasActiveJob = true;
		}
		else if (userData_hasActiveJob == true) {
			std::cout << "\x1B[31mYou already have a job\033[0m" << std::endl;
		}
		else {
			std::cout << "\x1B[31mYou do not qualify for this job. Rank too low.\033[0m" << std::endl;
		}
	}
}
void quitJob() {
	if (userData_hasActiveJob == true) {
		std::cout << "You are no longer working as " << userData_activeJob << std::endl;
		userData_hasActiveJob = false;
		userData_activeJob = "not_in_job";
	}
	else {
		std::cout << "You do not have a job you can quit.";
	}
}
void showStats() {
	std::cout << "\x1B[33mStatistics for \033[0m" << userData_playerName << std::endl;

	std::cout << "Balance: " << userData_balance << std::endl;
	std::cout << "Rank: " << userData_rank << ". You need " << userData_XPToRankUp - userData_totalXP << " XP to rankup" << std::endl;
	std::cout << "\x1B[33mGolden coins: \033[0m" << userData_goldenCoins << std::endl;

	if (userData_hasActiveJob == true) {
		std::cout << "Your job: " << userData_activeJob << std::endl;
	}
	else {
		std::cout << "\x1B[31mYou do not have a job!\033[0m" << " Start working by finding a job now with \"jobs\"" << std::endl;
	}
}
void rareReward() {
	jobReward_money = rand() % 200 + 20;
	jobReward_xp = rand() % 100 + 10;
	int GoldenCoin = rand() % 10 + 1;
	if (GoldenCoin == 1) {
		std::cout << "\x1B[33mYou found a golden coin! You can use this to purchase temporary power-ups in the shop!\n \033[0m";
		userData_goldenCoins = userData_goldenCoins + 1;
	}
}
void commonReward() {
	jobReward_money = rand() % 20 + 1;
	jobReward_xp = rand() % 10 + 1;
	int GoldenCoin = rand() % 40 + 1;
	if (GoldenCoin == 1) {
		std::cout << "\x1B[33mYou found a golden coin! You can use this to purchase temporary power-ups in the shop!\n \033[0m";
		userData_goldenCoins = userData_goldenCoins + 1;
	}
}
void completeJob() {
	userData_balance = userData_balance + jobReward_money;
	userData_totalXP = userData_totalXP + jobReward_xp;
}
void checkRankUp() {
	if (userData_totalXP >= userData_XPToRankUp) {
		userData_rank = userData_rank + 1;
		userData_totalXP = 0;
		std::cout << "\x1B[33mYou ranked up! \033[0m\t\t" << std::endl;
	}
}
void mine() {
		std::cout << "You started mining... " << std::endl;
		int Rarity = rand() % 20 + 1;

		if (Rarity == 1) {
			rareReward();
			std::cout << "Congratulations, you found a very rare ore and sold it for " << jobReward_money << " cash and " << jobReward_xp << "XP!" << std::endl;
		}
		else {
			commonReward();
			std::cout << "You found some rock and sold it for " << jobReward_money << " cash and " << jobReward_xp << "XP!" << std::endl;
		}
		completeJob();
}
void explore() {
	if (userData_activeJob != "Explorer") {
		std::cout << "You are not an explorer" << std::endl;
	}
	else {

	}
}
void fish() {
	if (userData_activeJob != "Fisher") {
		std::cout << "You are not a fisher" << std::endl;
	}
	else {

	}
}
void mainMenu() {
	std::string Command;

	std::thread autoSave([] {
		while (true)
		{
			std::this_thread::sleep_for(std::chrono::minutes(1));
			_background_saveGame();
		}
	});

	while (true) {
		checkRankUp();
		std::cout << std::endl;
		std::cout << "Enter your command: ";
		std::getline(std::cin, Command);
		transform(Command.begin(), Command.end(), Command.begin(), ::tolower);
		std::cout << std::endl;


		std::cout << Line << std::endl;

		if (Command == "help") {
			showHelp();
		}
		else if (Command == "game/save") {
			saveGame();
		}
		else if (Command == "game/exit") {
			Exit();
			return;
		}
		else if (Command == "stats") {
			showStats();
		}
		else if (Command == "mine") {
			if (hasItemInInventory("Pickaxe")) {
				mine();
				completeJob();
			}
			else if (userData_activeJob == "Miner") {
				mine();
				completeJob();
			}
			else  {
				std::cout << "You are not a miner, buy a pickaxe or join the miner job to start mining\n";
			}

		}
		else if (Command == "explore") {
			explore();
		}
		else if (Command == "pushitem") {
			itemPush();
		}
		else if (Command == "fish") {
			fish();
		}
		else if (Command == "inventory") {
			viewInventory();
		}
		else if (Command == "game/erase") {
			eraseData();
		}
		else if (Command == "shop") {
			std::cout << "\x1B[33mSHOP_MENU_01\033[0m\n" << std::endl;
			viewShop();
			std::cout << Line << "\n\n";
			std::cout << "\x1B[33mIndexes\033[0m\n";
			std::cout << "1. Buy item" << std::endl;
			std::cout << "2. Exit" << std::endl;

			while (true)
			{
				int choice;
				std::cout << "\n\x1B[33m[SHOP MENU]\033[0m SELECT INDEX: ";
				std::cin >> choice;

				switch (choice) {
				case 1: 
					int itemNumber;
					std::cout << "Buy item with item index: ";
					std::cin >> itemNumber;
					buyItem(itemNumber);
					break;
				case 2: 
					mainMenu();
					shopItems[1].itemPrice = 400;
					break;
				}

			}
		}
		else if (Command == "jobs") {
			std::cout << "\x1B[33mJOB_MENU_02\033[0m\n" << std::endl;
			std::cout << "\x1B[33mIndexes\033[0m\n";
			std::cout << "1. View Jobs" << std::endl;
			std::cout << "2. Apply for Job" << std::endl;
			std::cout << "3. Quit Job" << std::endl;
			std::cout << "4. Exit" << std::endl;
			int JobMenu = 0;
			while (JobMenu == 0) {
				int choice;
				std::cout << "\n\x1B[33m[JOB MENU]\033[0m SELECT INDEX: ";
				std::cin >> choice;
				switch (choice) {
					case 1:
						std::cout << Line << std::endl;
						viewJobs();
						std::cout << Line << std::endl;
						break;
					case 2:
						int jobNumber;
						std::cout << Line << std::endl;
						std::cout << "Enter the index for the job you wish to apply for ";
						std::cin >> jobNumber;
						applyForJob(jobNumber);
						std::cout << Line << std::endl;
						break;
					case 3:
						std::cout << Line << std::endl;
						quitJob();
						std::cout << Line << std::endl;
						break;
					case 4:
						mainMenu();
						break;
					default:
						JobMenu = 1;
						if (JobMenu == 1) {
							std::cout << "\x1B[31mError. Game has quit. Progress saved. Expected\033[0m" << std::endl;
							_background_saveGame();
							return;
						}
						break;
				}
			}
		}
		else {
			std::cout << "Command not found. Type \"help\" to view a list of available commands." << std::endl;
		}
		std::cout << Line << std::endl;
	}

}
void welcomeMessage() {
	std::cout << "Welcome " + userData_playerName << std::endl;
	std::cout << "To get started view the list of commands by typing \"help\"" << std::endl;
	mainMenu();
}
int main() {
	
	itemData sd(1, "Pickaxe", "Use this to mine ores and stone for cash and XP", 2);

	addItemToInventory(sd, 0);
	LoadGame();
	if (userData_playerName == "") {
		std::cout << "Write a username: ";
		getline(std::cin, userData_playerName);
		if (userData_playerName.length() <= 4) {
			std::cout << "\x1B[31mUsername too short. Minimum 4 characters.\033[0m" << std::endl;
			userData_playerName = "";
			main();
		}
		else if (userData_playerName != "") {
			welcomeMessage();
		}
		else {
			std::cout << "Error";
			return 0;
		}
	}	
	else if (userData_playerName == "DEFAULT_USER") {
		std::cout << "\x1B[31mYou recently deleted your game save.\033[0m Please write a new username: ";
		getline(std::cin, userData_playerName);

		if (userData_playerName != "DEFAULT_USER" && userData_playerName.length() >= 4) {
			_background_saveGame();
			welcomeMessage();
		} if (userData_playerName.length() <= 4) {
			std::cout << "\x1B[31mUsername too short. Minimum 4 characters.\033[0m" << std::endl;
		}
		else {
			std::cout << "Error";
			return 0;
		}
	}
	else {
		std::cout << "Welcome back, " << userData_playerName << "!" << std::endl;
		mainMenu();
	}
	return 0;
}