export const canvas = document.getElementById("graphCanvas");
export const ctx = canvas.getContext("2d");

//Setting the nodes value(id) and their places on the graph
export const nodes = [
    { id: "A", x: 100, y: 100 },
    { id: "B", x: 300, y: 80 },
    { id: "C", x: 500, y: 150 },
    { id: "D", x: 150, y: 300 },
    { id: "E", x: 400, y: 320 }
];

//Setting the lines between the nodes, and which nodes and the weight between them
export const edges = [
    { from: "A", to: "B", weight: 4 },
    { from: "A", to: "D", weight: 2 },
    { from: "B", to: "C", weight: 5 },
    { from: "D", to: "E", weight: 7 },
    { from: "B", to: "E", weight: 10 },
    { from: "C", to: "E", weight: 3 }
];


//Making the graph with the nodes and edges
export const graph = {};

//We want to have a list of nodes and their neighbours, we need an adjancylist. 
export function buildAdjanencylist(){
    //Because at the randomizeBtn randomize the weight and the coordinates of the edges and nodes, we need to clear the adjacency list for the previous graphs nodes and edges values
    Object.keys(graph).forEach(key => delete graph[key]);
    
    //Now we insert the new nodes and edges in it
    nodes.forEach(n => {
        graph[n.id] = [];
    });

    edges.forEach(e => {
        graph[e.from].push({ node: e.to, weight: e.weight });
        graph[e.to].push({ node: e.from, weight: e.weight });
    });
}

//Calculates a random coordination using math random, but as we do not wish it to be on the outer rim of the graph we -80 from the max. and the 40 is to make sure it is not placed on the "smallest" outer rim
function randomCoordinations(max) {
    return Math.floor(Math.random() * (max - 80)) + 40;
}

//Calculates a random weight using math random (math floor makes it so that there are no decimal numbers)
function randomWeight() {
    return Math.floor(Math.random() * 10) + 1;
}

//Randomize the nodes coordinations and edges weight when a button is pressed
export function randomizeGraph() {
    //First we want to randomize the positions, so we go through each of them in a for each loop, setting their value using the randomCoordinations function
    nodes.forEach(n => {
        n.x = randomCoordinations(canvas.width);
        n.y = randomCoordinations(canvas.height);
    });

    //Next we want to randomize the weight, so we go through each of them in a for each loop, setting their weight using the randomWeight function
    edges.forEach(e => {
        e.weight = randomWeight();
    });

    //Rebuild the adjacency list with the new weight and coordinations
    buildAdjanencylist();
    drawGraph();
    updateTable(
        Object.fromEntries(nodes.map(n => [n.id, Infinity])), 
        Object.fromEntries(nodes.map(n => [n.id, null])));
}

export function drawGraph(highlight = {}) {
    //Drawing a rectangle that starts at 0,0 on x, y and has the width and height given in index.html
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Finding where the edges in the graph is and drawing it, for each of edges
    edges.forEach(e => {
        //Find the node with the id that is equal to either the from or to e.id
        const a = nodes.find(n => n.id == e.from);
        const b = nodes.find(n => n.id == e.to); 

        //Drawing the edges, first be beginPath()
        ctx.beginPath();
        //Setting the stroke style, as we wish to highlight the edge we are currently on in our visualization
        ctx.strokeStyle = highlight.edge == e ? "red" : "black";
        //Making the line between the from and the to points. (otherwise there is just to dots coloured, which will be covered up later by nodes)
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        //Stroke draws in what we just coded
        ctx.stroke();

        //Now we draw the weight from "from" to "to", in the middle of the line
        const middleX = (a.x + b.x) / 2;
        const middleY = (a.y + b.y) / 2;
        ctx.fillStyle = "black";
        ctx.fillText(e.weight, middleX, middleY);
    });

    //We drew the edges first, so the lines do not cross OVER our drawing of nodes
    nodes.forEach(n => {
        ctx.beginPath();
        //Setting the fillstyle, as we wish to highlight the node we are currently on in our visualization
        ctx.fillStyle = highlight.node == n.id ? "yellow" : "lightyellow";
        ctx.strokeStyle = "black";
        //Making the shape a circle to indicate that this is the node
        //arc needs: x, y, radius, start angle and end angle
        ctx.arc(n.x, n.y, 20, 0, Math.PI * 2);
        //Fill colours the cirle, and stroke draws in what we just coded, on top of what else is drawn
        ctx.fill();
        ctx.stroke();

        //We want the node's id on top of the circle, written in black
        ctx.fillStyle = "black";
        //Making sure the text is not on top of the line, but in the middle
        ctx.fillText(n.id, n.x - 5, n.y + 5);
    });
}

//The table for our graph shows the distances/weights to each node from the starting node, and if there is a previous node to the end node

//So first we need to show a default distance - which is known as infinity, and therefore we use an infinity symbol
function formatDistance(d) {
    return d == Infinity ? "∞" : String(d);
}

//Next the table needs to be updated along the way. And it uses a distance (weight), a previous node and currentId/node
export function updateTable(dist, prev, currentId = null) {
    //We need to know which table in index.html we want to update, in case there are more
    const tbody = document.querySelector("#dijkstraTable tbody");
    //We need to delete the rows, in case we run it several times
    tbody.innerHTML = "";

    //Keep the nodes order consistent with nodes[] order
    for (const n of nodes) {
        //For each node we want a table row (tr), whose id is the same as the nodes id, to make it more streamlined
        const tr = document.createElement("tr");
        tr.dataset.nodeId = n.id;
        //If this id is the same as current, we want it to light up using css styling. - The reason for not using a highlight, is that the ctx/canvas part is JS determined, and this is a table for HTML
        if (n.id == currentId) tr.classList.add("current");

        //Now we set the content for the column, first the id, then distance/weight and lastly the previous node if the "route" has one between starting and end point
        const tdNode = document.createElement("td");
        tdNode.textContent = n.id;

        const tdDist = document.createElement("td");
        tdDist.textContent = formatDistance(dist[n.id]);

        const tdPrev = document.createElement("td");
        tdPrev.textContent = prev[n.id] == null ? "—" : prev[n.id];

        //Now we add each coloumn to the row
        tr.appendChild(tdNode);
        tr.appendChild(tdDist);
        tr.appendChild(tdPrev);
        //Adds the row to the table
        tbody.appendChild(tr);
    }
}

//Call the function - which is shown as we call the script in the index.html
buildAdjanencylist();
drawGraph();
updateTable(Object.fromEntries(nodes.map(n => [n.id, Infinity])), Object.fromEntries(nodes.map(n => [n.id, null])));

//Calling the graph to highlight the appropriate node
export function highlightNode(id) {
    drawGraph({ node: id });

    const rows = document.querySelectorAll("#dijkstraTable tbody tr");
    rows.forEach(r => r.classList.toggle("current", r.dataset.nodeId == id));
}


//Calling the graph to highlight the appropriate edge
export function highlightEdge(edge) {
    drawGraph({ edge });
}

//We also need to make sure that this visualization is not over before our eyes can register it, so we need a sleep function
export function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
} 