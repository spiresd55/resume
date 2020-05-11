import {balanceBots} from "./BalanceBots";

it("balanceBots() should return a valid bot, default case", () => {
   expect(balanceBots(5, 2, 5)).toBe(2);
});

it("balanceBots() should return a valid bot", () => {
   expect(balanceBots(61, 17, 61)).toBe(8);
});

it("balanceBots() should not return a valid bot", () => {
   expect(balanceBots(61, 7, 61)).toBe(-1);
});