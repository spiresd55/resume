const getSectorId = (roomEncryptionName) => {
    /*
       The following regex tests the following:
       The first part of the pattern is letters and hyphens
       The second part of the string is a number
       The third part is non repeating letters surrounded by brackets
       The regex also enforces 5 characters within the brackets
     */
    const isValidEncryption = /^[a-z\-]+\d+\[(?:([A-Za-z]{5})(?!.*\1))*\]$/i.test(roomEncryptionName);

    //Check if the string is a valid encryption
    if (!isValidEncryption) {
        return -1;
    }

    //Find the room name, sector id, and checksum from the string using regex
    const roomName = roomEncryptionName.match(/(?:(?![[a-zA-Z]*]|\d).)+/g);
    const sectorId = roomEncryptionName.match(/(\d+)/g);
    const checksum = roomEncryptionName.match(/\[([a-z]*?)\]/)[1].toLowerCase();

    //If more than 1 match returns return -1
    if(roomName.length != 1 && sectorId.length != 1 && checksum) {
        return -1;
    }

    const countDictionary = {};

    for (let char of roomName[0].toLowerCase()) {
        if(char === "-") {
            continue;
        }

        if(!countDictionary[char]) {
            countDictionary[char] = 1;
        }

        countDictionary[char] += 1;
    }

    let prevCount;
    for (let i = 0 ; i < checksum.length; i++) {
        const char = checksum[i];
        const count = countDictionary[char];

        //I am assuming that the checksum requires at least 1 character
        if(!count) {
            return -1;
        }

        if (i === 0) {
            prevCount = count;
        } else if(count > prevCount) { //This indicates the checksum is not in order
            return -1;
        } else if (count === prevCount) {
            const prevCharCode = checksum[i - 1].charCodeAt(0);
            const charCode = char.charCodeAt(0);

            //https://en.wikipedia.org/wiki/List_of_Unicode_characters
            if(charCode < prevCharCode) { //A greater unicode indicates its in alphabetical order in case of tie
                return -1;
            }
        } else {
            prevCount = count;
        }
    }

    //All checks pass! Return the sectorId
    return parseInt(sectorId);
};

const getSumOfSectorIds = (roomEncryptionNames) => {
    return roomEncryptionNames.reduce((accumulator, current) => {
        const sectorId = getSectorId(current);

        if (sectorId != -1) {
           return accumulator + sectorId;
        }
        return accumulator;
    }, 0);
};


getSectorId("aaaaa-bbb-z-y-x-123[abxyz]");

const result = getSumOfSectorIds([
    "aaaaa-bbb-z-y-x-123[abxyz]",
    "a-b-c-d-e-f-g-h-987[abcde]",
    "not-a-real-room-404[oarel]",
    "totally-real-room-200[decoy]",
]);
