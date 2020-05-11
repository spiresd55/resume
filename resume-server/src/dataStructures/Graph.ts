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

        // Create initial vertex details table
        Object.keys(this.graph.vertices).forEach((vertex: string, index: number) => {
            if (vertex === start) {
                this.vertexDistanceTable[vertex] = new VertexDetails(vertex, index, true);
            } else {
                this.vertexDistanceTable[vertex] = new VertexDetails(vertex, index, false);
            }
        });

        // Create a min priority queue
        const priorityQueue: BinaryHeap<VertexDetails> = new BinaryHeap(BinaryHeapType.MIN, "shortestDistance");
        priorityQueue.insert(this.vertexDistanceTable[start]);


        while(!priorityQueue.isEmpty()) {
            // Delete the node from the priority queue
            const node = priorityQueue.del();

            // If the node is not visited
            if(!visted[node.vertex]) {
                // Visit the edges
                this.graph.getVertice(node.vertex).edges.forEach((edge) => {
                    const currentDistance = node.shortestDistance + edge.weight;

                    // If the new distance is less than the distance in the table, update it and insert that node in the queue
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

        // Now the shortest path can calculated
        let nodePointer = this.vertexDistanceTable[end];
        const pathInfo = {shortestDistance: nodePointer.shortestDistance, shortestPath: [], pathTable: this.vertexDistanceTable};

        while(nodePointer && nodePointer.vertex !== start) {
            pathInfo.shortestPath.unshift(nodePointer.vertex);
            nodePointer = this.vertexDistanceTable[nodePointer.previous];
        }

        return pathInfo;
    }
}

