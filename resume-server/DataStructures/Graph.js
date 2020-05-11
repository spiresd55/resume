class Vertex {
    constructor(key) {
        this.key = key;
        this.edges = {};
    }

    addEdge(edge, weight) {
        this.edges[edge.key] = {edge, weight};
    }

    getWeight(edge) {
        return this.edges[edge].weight;
    }

    getEdges() {
        return this.edges;
    }
}

class Graph {
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