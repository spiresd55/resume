class Chip {
    constructor(value) {
        this.value = value;
    }
}

class Bot {
    constructor(botNumber, isFirstBot) {
        this.botNumber = botNumber;

        if (isFirstBot) {
            this.chips = [new Chip(botNumber)];
        } else {
            this.chips = [];
        }
    }

    sortChips() {
        this.chips.sort((a, b) => {
            if(a.value > b.value) {
                return 1;
            }

            if(a.value < b.value) {
                return -1;
            }

            return 0;
        });
    }

    getChip(chip) {
        this.chips.push(chip);
        this.sortChips();
    }

    receiveChipFromInput() {
        const chipVal = this.botNumber + (this.botNumber + 1);

        this.chips.push(new Chip(chipVal)); //Note I could use a max priority queue here

        //Sort the chips
        this.sortChips();
    }

    isFull() {
        return this.chips.length === 2;
    }

    giveChips(bot1,bot2) {
        const [lowChip, highChip] = this.chips;

        console.log(`Bot${this.botNumber} has chips ${lowChip.value} ${highChip.value}`);

        if(bot1 && bot1.isFull()) {
            this.chips.shift();
            bot2.getChip(this.chips.shift());
            console.log(`Bot${this.botNumber} giving chip-${lowChip.value} to output`);
            console.log(`Bot${this.botNumber} giving chip-${highChip.value} to bot${bot1.botNumber}`);
        } else {
            bot1.getChip(this.chips.shift());
            console.log(`Bot${this.botNumber} giving chip-${lowChip.value} to bot${bot1.botNumber}`);

            bot2.getChip(this.chips.shift());
            console.log(`Bot${this.botNumber} giving chip-${highChip.value} to bot${bot2.botNumber}`);
        }
    }
}

const balanceBots = (startingChip, lowChip, highChip) => {
    //Rule #1 The highest value bot starts with their own chip number
    //Rule #2 When bots receive chips, its (current bot number + 1) + currentBotNumber eg(2 would receive 2 + (2 + 1) )
    //Rule #2.1 All bots receive chips but 0
    //Rule #3 Bots gives low chip to (botNumber - 1) and high chip to (botNumber - 2)
    //Rule #3.1 If the (botNumber -1 ) is full, then lowChip goes to output and highChip goes to (botNumber - 2)
    //Rule #5 If a bot can not give to the next bot it will place the lowest chip in its own output bin
    //Rule #6 If a bot has to place both chips in output, it will place largest in its own bin, and lowest in the greatest output bin

    //Create the first bot based on the starting chip
    const startingBotNumber = Math.floor(startingChip / 2 );
    const botQueue = [], botDictionary = {};

    //Create a bot queue
    for (let i = startingBotNumber; i>=0; i--) {
        const bot = new Bot(i, i === startingBotNumber ? true: false);
        if(i !== 0) {
            bot.receiveChipFromInput()
        }
        botQueue.push(bot); //Note: this can be done with one data structure, but I decided to use a queue and a map
        botDictionary[i] = bot; //Need to keep reference of the bots
    }

    while (botQueue.length > 0) {
        const bot = botQueue.shift();

        if(bot.chips[0].value === lowChip && bot.chips[1].value === highChip) {
            return bot.botNumber; //Robot found
        }

        bot.giveChips(botDictionary[bot.botNumber - 1], botDictionary[bot.botNumber - 2])

    }

    //Robot not found, returning -1
    return -1;
};

console.log(balanceBots(61, 17, 61));
console.log(balanceBots(5, 2, 5));


