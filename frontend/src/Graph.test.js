import {Graph, Node} from './Graph'

const alphaNodes = ['A','B','C','D','E','F'].map((e,_) => {return new Node(e)})
const a = alphaNodes[0];
const b = alphaNodes[1];
const c = alphaNodes[2];
const d = alphaNodes[3];
const e = alphaNodes[4];
const f = alphaNodes[5];

test('Setup test', () => {})

test('Empty Graph instanciation', () => {
    const graph = new Graph();
    expect(graph.nodes).toHaveLength(0);
    expect(Object.keys(graph.edges)).toHaveLength(0);
});

test('Correct graph initialization with 6 nodes 0 edges', () => {
    const graph = new Graph(alphaNodes);
    expect(graph.nodes).toHaveLength(alphaNodes.length);
    expect(graph.edges.size).toBe(alphaNodes.length);
    for(var key in graph.edges){
        expect(graph.edges.get(key).size).toBe(0);
    }
    expect(graph.getNumberOfEdges()).toBe(0);
});

test('Shortest path with same origin and destination should be a length 1 path', () => {
    const graph = new Graph(alphaNodes);
    expect(graph.shortestPath(alphaNodes[0], alphaNodes[0])).toHaveLength(1);
});

test('Shortest path between non-connected nodes should be null', () => {
    const graph = new Graph(alphaNodes);
    expect(graph.shortestPath(alphaNodes[0], alphaNodes[1])).toBeNull();
});

test('Graph .link method should have no effect if origin === destination', () => {
    const graph = new Graph(alphaNodes);
    const node = alphaNodes[0];
    graph.link(node, node);
    expect(graph.getNumberOfEdges()).toBe(0);
})

test('Graph .link method should update origin node edges', () => {
    const graph = new Graph(alphaNodes);
    graph.link(a, b);
    expect(graph.getNumberOfEdges()).toBe(1);
    expect(graph.edges.get(a).size).toBe(1);
    expect(graph.edges.get(a).has(b)).toBe(true);
});

test('Bidirectionnal link', () => {
    const graph = new Graph(alphaNodes);
    graph.link(a, b);
    graph.link(b, a);
    expect(graph.getNumberOfEdges()).toBe(2);
    expect(graph.edges.get(a).size).toBe(1);
    expect(graph.edges.get(a).has(b)).toBe(true);
    expect(graph.edges.get(b).size).toBe(1);
    expect(graph.edges.get(b).has(a)).toBe(true);
});

test('Shortest path between adjacent nodes should have length 2', () => {
    const graph = new Graph(alphaNodes);
    graph.link(a, b);
    expect(graph.shortestPath(a,b)).toHaveLength(2);
});

test('Shortest path between linked non-adjacent nodes should have length > 0', () => {
    const graph = new Graph(alphaNodes);
    graph.link(a,b);
    graph.link(b,c);
    expect(graph.shortestPath(a,c)).toHaveLength(3);
});

test('Graph .shortestPath should return shortest path even when multiple paths are possible', () => {
    const graph = new Graph(alphaNodes);
    graph.link(a,b);
    graph.link(b,c);
    graph.link(a,c);
    expect(graph.shortestPath(a,c)).toHaveLength(2);
});