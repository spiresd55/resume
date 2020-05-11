import {BinaryHeap, BinaryHeapType} from "./BinaryHeap";

class Edge {
    key: string;
    weight: number;
    constructor(key, weight) {
        this.key = key;
        this.weight = weight;
    }

}

export class Vertex {
    edges: Edge[];
    key: string;

    constructor(key) {
        this.key = key;
        this.edges = [];
    }

    addEdge(edge, weight) {
        this.edges.push(new Edge(edge.key, weight));
    }
}

export class Graph {
    vertices: object;

    constructor() {
        this.vertices = {}
    }

    addVertex(key) {
        this.vertices[key] = new Vertex(key);
    }

    getVertice(key) {
        return this.vertices[key] || undefined;
    }

    contains(key) {
        return this.vertices[key] ? true: false;
    }

    addEdge(fromKey, toKey, weight){
        if (!this.vertices[fromKey]) {
            this.addVertex(fromKey);
        }
        if (!this.vertices[toKey]){
            this.addVertex(toKey)
        }

        this.vertices[fromKey].addEdge(this.vertices[toKey], weight)
    }

}


class VertexDetails {
    vertex: string;
    shortestDistance: number;
    index: number;
    previous: string;

    constructor(vertex:string, index: number, isStart = false) {
        this.vertex = vertex;
        this.index = index;
        if (isStart) {
           this.shortestDistance = 0;
        } else {
            this.shortestDistance = Infinity;
        }
    }

}

export class Dijkstra {
    graph: Graph;
    vertexDistanceTable: VertexDetails[];

    constructor(graph: Graph) {
        this.graph = graph;
        this.vertexDistanceTable = []
    }


    /**
     *
     * @param start - the start key in the graph
     * @param finish - the end key in the graph
     */
    findShortestPath(start: string, end: string) {
        const visted = {};
        const unvisited = [];

        // Create initial vertex details table
        Object.keys(this.graph.vertices).forEach((vertex: string, index: number) => {
            if (vertex === start) {
                this.vertexDistanceTable[vertex] = new VertexDetails(vertex, index, true);
            } else {
                this.vertexDistanceTable[vertex] = new VertexDetails(vertex, index, false);
            }
        });

        // Create a min priority queue
        // const priorityQueue: BinaryHeap<Vertex> = new BinaryHeap(BinaryHeapType.MIN, "weight");
        const priorityQueue: BinaryHeap<VertexDetails> = new BinaryHeap(BinaryHeapType.MIN, "shortestDistance");
        // priorityQueue.buildHeap(this.graph.vertices[start].edges);
       // priorityQueue.buildHeap(this.vertexDistanceTable);
        priorityQueue.insert(this.vertexDistanceTable[start]);

        // console.log(this.vertexDistanceTable);
        // console.log(start);
       // console.log(this.graph.vertices[start].edges);
        console.log(priorityQueue);

        while(!priorityQueue.isEmpty()) {
            // Delete the node from the priority queue
            const node = priorityQueue.del();

            // console.log(node);

            // If the node is not visited
            if(!visted[node.vertex]) {
                // Visit the edges
                this.graph.getVertice(node.vertex).edges.forEach((edge) => {
                    console.log("info", node.shortestDistance, edge.weight);
                    const currentDistance = node.shortestDistance + edge.weight;

                    console.log("currentDistance", currentDistance);
                    if (currentDistance < this.vertexDistanceTable[edge.key].shortestDistance) {
                        this.vertexDistanceTable[edge.key].shortestDistance = currentDistance;
                        this.vertexDistanceTable[edge.key].previous = node.vertex;
                        priorityQueue.insert(this.vertexDistanceTable[edge.key]);
                    }
                });
            }


            // Add it the visted nodes
            visted[node.vertex] = true;
        }


        console.log("visted");
        console.log(visted);

        console.log(this.vertexDistanceTable);

    }
}

