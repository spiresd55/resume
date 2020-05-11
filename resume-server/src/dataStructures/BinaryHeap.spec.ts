import {BinaryHeap, BinaryHeapType} from "./BinaryHeap";


class MockObject {
    value: number;
    constructor(value) {
        this.value = value;
    }
}

it("Binary Heap should act as a min priority queue", () => {
    const priorityQueue: BinaryHeap<MockObject> = new BinaryHeap(BinaryHeapType.MIN, "value");

    priorityQueue.insert(new MockObject(1));
    priorityQueue.insert(new MockObject(100));
    priorityQueue.insert(new MockObject(50));
    priorityQueue.insert(new MockObject(4));

    expect(priorityQueue.del().value).toBe(1);
    expect(priorityQueue.del().value).toBe(4);
    expect(priorityQueue.del().value).toBe(50);
    expect(priorityQueue.del().value).toBe(100);
    expect(priorityQueue.del()).toBeFalsy();
});

it("BinaryHeap.buildList() should build a min priority queue", () => {
    const priorityQueue: BinaryHeap<MockObject> = new BinaryHeap(BinaryHeapType.MIN, "value");

    priorityQueue.buildHeap([
        new MockObject(1),
        new MockObject(100),
        new MockObject(50),
        new MockObject(4)
    ]);

    expect(priorityQueue.del().value).toBe(1);
    expect(priorityQueue.del().value).toBe(4);
    expect(priorityQueue.del().value).toBe(50);
    expect(priorityQueue.del().value).toBe(100);
    expect(priorityQueue.del()).toBeFalsy();
});

it("Binary Heap should act as a max priority queue", () => {
    const priorityQueue: BinaryHeap<MockObject> = new BinaryHeap(BinaryHeapType.MAX, "value");

    priorityQueue.insert(new MockObject(1));
    priorityQueue.insert(new MockObject(100));
    priorityQueue.insert(new MockObject(50));
    priorityQueue.insert(new MockObject(4));

    expect(priorityQueue.del().value).toBe(100);
    expect(priorityQueue.del().value).toBe(50);
    expect(priorityQueue.del().value).toBe(4);
    expect(priorityQueue.del().value).toBe(1);
    expect(priorityQueue.del()).toBeFalsy();
});