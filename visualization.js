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

nodes.forEach(n => {
    graph[n.id] = [];
});
edges.forEach(e => {
    graph[e.from].push({ node: e.to, weight: e.weight });
    graph[e.to].push({ node: e.from, weight: e.weight });
});


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
        const middleX = (a.x + b.x)/2;
        const middleY = (a.y + b.y)/2;
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

//Call the function - which is shown as we call the script in the index.html
drawGraph();

//Calling the graph to highlight the appropriate node
export function highlightNode(id) {
    drawGraph({ node: id });
}


//Calling the graph to highlight the appropriate edge
export function highlightEdge(edge) {
    drawGraph({ edge });
}

//We also need to make sure that this visualization is not over before our eyes can register it, so we need a sleep function
export function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
} 