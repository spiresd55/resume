import {getSumOfSectorIds} from "./ChecksumService";

it("getSumOfSectorIds should return", () => {
    expect(getSumOfSectorIds([
        "aaaaa-bbb-z-y-x-123[abxyz]",
        "aaaaa-bbb-z-y-x-123-123[abxyz]", // Invalid: two sector ids
        "a-b-c-d-e-f-g-h-987[abcde]",
        "not-a-real-room-404[oarel]",
        "totally-real-room-200[decoy]", // Provided bad example
        "11111-bad-encryption", // Just a bad encryption
        "aaaaa-bbb-z-y-x-123[baxyz]", // Not in desc order
        "a-b-c-d-e-f-g-h-987[abced]", // Tied: Not in Alphabetical Order
    ])).toBe(1514);
});