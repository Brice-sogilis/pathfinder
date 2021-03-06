/**
 * Container class which can be used as graph vertex
 */
class Node<T> {
    value : T;
    constructor(value : T) {
        this.value = value
    }
}

/**
 * QoL extension for vertex associated with 2D coordinates
 */
class LocatedNode<T> extends Node<T> {
    i : number;
    j : number;
    constructor(value : T, i : number, j : number) {
        super(value);
        this.i = i;
        this.j = j;
    }
}

/**
 * An item representing a node in a path, with the link to the previous item or null if this is the first node of the path
 */
class ShortestPathItem<T, N extends Node<T>> {
    node : N
    prev : ShortestPathItem<T, N> | null
    constructor(node: N, prev: ShortestPathItem<T, N> | null) {
        this.node = node;
        this.prev = prev;
    }
}

/**
 * A directed graph with equally weighted edges
 */
class Graph<T, N extends Node<T>> {
    nodes : Array<N>
    edges : Map<N, Set<N>>
    constructor(nodes = []) {
        this.nodes = nodes
        this.edges = new Map()
        for(let n of nodes) {
            this.edges.set(n,new Set())
        }
    }

    //Total number of edges in the graph
    getNumberOfEdges() {
        var res : number = 0;
        for(let nodeSet of this.edges.values()){
            res += nodeSet.size;
        }
        return res;
    }

    /*     
        Return an array of node representing a shortest path from the last item of the path
        Backtrack using items'link to their parent, building the path array along the way 
    */
    buildPath(item : ShortestPathItem<T, N>) : Array<N> {
        const res: Array<N> = [item.node]
        var aux : ShortestPathItem<T, N> | null = item.prev;
        while(aux != null){
            res.push(aux.node);
            aux = aux.prev;
        }
        return res.reverse();
    }

    /*
        Return an array representing the shortest path between two nodes
        Use the flood algoirtmh(equivalent to dijkstra beacause the edges are equally weighted)
    */
    shortestPath(origin : N, destination : N) {
        if(origin === destination)return [origin];
        const checked : Set<N> = new Set([origin]);
        const queue : Array<ShortestPathItem<T, N>> = [new ShortestPathItem(origin, null)];
        while(queue.length > 0) {
            const item = queue.shift()!;
            if(item.node === destination){
                return this.buildPath(item);
            }
            else {
                for(let n of this.edges.get(item.node)!.values()){
                    if(!checked.has(n)){
                        checked.add(n);
                        queue.push(new ShortestPathItem(n,item));
                    }
                }
            }
        }
        return null;
    }

    /*
        Add an edge between two nodes in the graph
        If the two nodes are already linked, do nothing
        If one of the node is not in the graph, do nothing
    */
    link(origin : N, destination : N) {
        if(!this.edges.has(origin) || !this.edges.has(destination))return;
        if(origin !== destination){
            this.edges.get(origin)!.add(destination)
        }
    }
}

export {Node, LocatedNode,  Graph}