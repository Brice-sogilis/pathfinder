class Node<T> {
    value : T
    constructor(value : T) {
        this.value = value
    }
}

class ShortestPathItem<T> {
    node : Node<T>
    prev : ShortestPathItem<T> | null
    constructor(node: Node<T>, prev: ShortestPathItem<T> | null) {
        this.node = node;
        this.prev = prev;
    }
}

class Graph<T> {
    nodes : Array<Node<T>>
    edges : Map<Node<T>, Set<Node<T>>>
    constructor(nodes = []) {
        this.nodes = nodes
        this.edges = new Map()
        for(let n of nodes) {
            this.edges.set(n,new Set())
        }
    }

    getNumberOfEdges() {
        var res = 0;
        for(let nodeSet of this.edges.values()){
            res += nodeSet.size;
        }
        return res;
    }

    buildPath(item : ShortestPathItem<T>) : Array<Node<T>> {
        const res: Array<Node<T>> = [item.node]
        var aux= item.prev;
        while(aux != null){
            res.push(aux.node);
            aux = aux.prev;
        }
        return res.reverse();
    }

    shortestPath(origin : Node<T>, destination : Node<T>) {
        if(origin === destination)return [origin];
        const checked : Set<Node<T>> = new Set([origin]);
        const queue : Array<ShortestPathItem<T>> = [new ShortestPathItem(origin, null)];
        while(queue.length > 0) {
            const item = queue.pop()!;
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

    link(origin : Node<T>, destination : Node<T>) {
        if(!this.edges.has(origin) || !this.edges.has(destination))return;
        if(origin !== destination){
            this.edges.get(origin)!.add(destination)
        }
    }
}

export {Node, Graph}