import { drawGraph, highlightNode, highlightEdge, graph, nodes, edges, sleep } from "./visualization.js"

//The function for the algorithm will first run when the button is pressed, and our start node is "A"
document.getElementById("runBtn").addEventListener("click", () => {
    dijkstra("A");
});

async function dijkstra(start){
    //First we set the variables, distance (dist), previous node(prev) and the array for shortest route (shortRoute). The shortRoute array is to keep track of the order of nodes that are shortest 
    const dist = {};
    const prev = {};
    const shortRoute = [];

    //As we are in the beginning of the algorithm, we do not know the distances or what node is after which, for therefor each node's distance is infinite and the prev is null
    nodes.forEach(n => {
        dist[n.id] = Infinity;
        prev[n.id] = null;
    });

    //We do know that the starting distance is 0 - because we have not moved from the starting point
    dist[start] = 0;
    //We add the starting point to the shortRoute
    shortRoute.push({ id: start, dist: 0 });

    //Now we need to check each node and its belonging edges, to check if it is shorter than its alternative routes
    //As long as the length (amount of objects) in shortRoute is more than 0 we stay in the while loop
    while(shortRoute.length > 0) {
        shortRoute.sort((a, b) => a.dist - b.dist);
        //Shift removes the first item in the array, but in order to look at the item, we store it in u
        const u = shortRoute.shift();
        //Because we just looked/is looking at u, we want to highlight it
        highlightNode(u.id);
        //And now we need to wait a bit, so our human eyes can register what is happening
        await sleep(700);

        //Now we need to check each of the neighbors at the current node we are looking at, u
        for(const neighbor of graph[u.id]) {
            //As our next move maybe will be to that neighboring node, we need to know the distance 
            const newDist = dist[u.id] + neighbor.weight;
            //Now in case that the distance to the neighboring node we are looking at is SMALLER that what is currently sat at the neighboring node's distance we want to the change primary neighbor
            if (newDist < dist[neighbor.node]) {
                dist[neighbor.node] = newDist;
                //The previous node for the node we will look at next, is the node we are currently looking at
                prev[neighbor.node] = u.id;
                //As this route is found to be shorter than already was put in as the u.ids neighbor, we need to push this neighboring node to our route
                shortRoute.push({ id: neighbor.node, dist: newDist });

                //And now we need to find the edges that we want to highlight, which is from the u.id to the neighboring node
                const edge = edges.find(e =>
                    (e.from == u.id && e.to == neighbor.node) ||
                    (e.to == u.id && e.from == neighbor.node)
                );

                highlightEdge(edge);
                //As we want the users to be able to register the highlights, we wait 700 ms
                await sleep(700);
            }
        //If the newDist is NOT smaller than the current dist+weight, we will just go to the next node in our for each loop
        }
    }

    return { dist, prev };
}