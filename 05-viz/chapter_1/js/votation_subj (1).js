var topics;
var pos =[];
var map = {};
d3.csv("../map_bill_ID.csv", function(mapping){

    mapping.forEach(function(element) {
        map[element.BillTitle] = element.ID_Bill;

    });
});
d3.json("../topics.json", function(list) {
    console.log(list)
    topics = list;
    dx = 1380/topics.length;
    dy = 800/topics.length;
    for (var i = 0; i < (topics.length); i++) {
        x = (i+1/2)%((topics.length)/2)*dx/12
        y = 50+10*(i>=(topics.length)/2)
        console.log(y)
    pos.push([x,y])

    }
});

var selected = null;

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");
r  = 1;
var radius = 5,
    padding = 1;
var color = d3.scaleOrdinal(d3.schemeCategory20);

var simulation = d3.forceSimulation()

    .force("charge", d3.forceManyBody().strength(-4))
    .force("collision", d3.forceCollide().radius(radius+padding).iterations(5).strength(0.5))
    .force("center", d3.forceCenter(width / 2, height / 2));

var input = document.getElementById("countries");
var awesomplete = new Awesomplete(input, {
    minChars: 1,
    maxItems: 5,
    autoFirst: true
});

var persons = []
d3.json("../datasubject.json", function(error, graph) {
    if (error) throw error;
    console.log(graph)
    for (var i= 0 ; i<graph.nodes.length;++i){
        persons.push(graph.nodes[i].id)

    }
    awesomplete.list = persons;


    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("r", 5)
        .attr('id', function(d){
            return d.id; })
        .attr("fill", function(d) {

            return color(d.group); })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))
        .on("mouseover",function(d) {
            d3.selectAll(".nodes").style("r", radius);
            d3.select(this).style("r", 2 * radius)
            document.getElementById("councilorName").innerHTML = d.id ;
            document.getElementById("councilorParty").innerHTML = d.group;

        })
        .on("mouseout",dephasis)
        .on("click",function(d) {
            console.log(map)
            id = map[d.id]
            localStorage['subject'] = id;

        })
        .on("dblclick", function(d) {
            localStorage['parl'] = d.id;
            window.location.assign("../html/viz-person.html", '_blank');
            //window.location.assign("../html/viz-person.html", '_blank');
        });


    node.append("title")
        .style("visibility", "hidden")
        .text(function(d) { return d.id; });

    var legend = svg.selectAll(".legend")
        .data(color.domain())
        .enter().append("g")
        .attr("class", "legend")
        .style("font-size","12px")
        .attr("transform", function(d, i) {
            return "translate("+ (-900+i * 30) +"," + -450 + ") rotate(40) "; })


    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) {
            return d; })



    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    //simulation.force("link")
      //  .links(graph.links);



    function ticked() {
        // link
        //     .attr("x1", function(d) {
        //         return d.source.x; })
        //     .attr("y1", function(d) { return d.source.y; })
        //     .attr("x2", function(d) {
        //         return d.target.x; })
        //     .attr("y2", function(d) { return d.target.y; });

        node
            .each(gravity())
            .attr("cx", function(d) { return d.x = Math.max(r, Math.min(width - r, d.x)); })
            .attr("cy", function(d) { return d.y= Math.max(r, Math.min(height - r, d.y)); });



    }
});

function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}
function emphasis(d) {
    d3.selectAll(".nodes").style("r", radius);
    d3.select(d).style("r", 2 * radius)
        .style("visibility", "visible")

    document.getElementById("councilorName").innerHTML = d.id ;
    document.getElementById("councilorParty").innerHTML = d.group;
}
function dephasis(d) {
    d3.selectAll(".nodes").style("r", radius);
    d3.select(this).style("r",radius);
    document.getElementById("councilorName").innerHTML = "Law" ;
    document.getElementById("councilorParty").innerHTML = "Topic";

}

function handleKeyPress(e){
    var key=e.keyCode || e.which;
    if (key==13){
        findperson();
    }

}
function findperson() {
    var input  =document.getElementById("countries");
     d  = d3.select("[id='" + input.value + "']")
        .style("r", 5 * radius)
         .attr("transform", function(d) {
             return "translate("+ (-d.x+120) +"," + (-d.y+50) + ")"; });
}
function gravity() {
    return function(d) {
        var alpha;
        place = position(d.group)
        x = (40-place[0])*20,
        y = (40-place[1])*20
        alpha = 0.05;

        var dx = -d.x+x//*(Math.abs(-d.x+x)>50);
        var dy =  -d.y+y//*(Math.abs(-d.y+y)>50);
        d.x += dx*alpha;
        d.y += dy*alpha;
    };
}
function position(string){
    a = topics.indexOf(string);
    //console.log(pos[a])
    return pos[a]
}