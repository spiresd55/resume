const isRealRoom = (roomEncryptionName) => {
    //Write 3 regex patterns to discover each
   // const roomName = "";   //(?:(?!\[[a-zA-Z]*\]|\d).)+
    //const sectorId = "";  //(\d)
   // const checksum = ""; //\[([^)]+)\]
   // console.log(roomEncryptionName.match(/(\d+)/g));
   // console.log(roomEncryptionName.match(/\[([^)]+)\]/g));
   // console.log(roomEncryptionName.match(/(?:(?![[a-zA-Z]*]|\d).)+/g));

    const roomName = roomEncryptionName.match(/(?:(?![[a-zA-Z]*]|\d).)+/g);
    const sectorId = roomEncryptionName.match(/(\d+)/g);
    const checksum = roomEncryptionName.match(/\[([^)]+)\]/g);

    console.log(roomName, sectorId, checksum);

    if(roomName.length != 1 && sectorId.length != 1 && checksum.length != 1) {
        return false;
    }



    return true;

    for (let i in roomEncryptionName) {
        console.log(roomEncryptionName[i]);
    }
};


isRealRoom("aaaaa-bbb-z-y-x-123[abxyz]");