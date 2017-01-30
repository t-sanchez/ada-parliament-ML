var input = document.getElementById("countries");

var awesomplete = new Awesomplete(input, {
    minChars: 1,
    maxItems: 5,
    autoFirst: true
});

var persons = []

d3.json("../viz_data/data.json", function(error, graph) {
    if (error) throw error;
    console.log(graph)
    for (var i = 0; i < graph.nodes.length; ++i) {
        persons.push(graph.nodes[i].id)
    }
    awesomplete.list = persons;
    console.log(persons)
});

var linksperson = [];
var parties= [];
d3.json("../viz_data/linkspersons.json", function(list) {
    linksperson = list;

});
d3.json("../viz_data/GroupId.json", function(list) {
    parties = list;

});
var margin = {top: 20, right: 20, bottom: 30, left: 140},
    width = 560 - margin.left - margin.right,
    height =250 - margin.top - margin.bottom;
var formatTime = d3.timeFormat("%B %d, %Y")
var x = d3.scaleBand()
    .rangeRound([0, width],-1)
    .paddingInner(0.1);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var color = d3.scaleOrdinal()
    .range(["#00B425", "#FF002D", "#F47D00", "#000000", "#A5AEB4", "#37009D", "#37009D"]);

// var yAxis = d3.svg.axis()
//     .scale(y)
//     .orient("left");
//
// var xAxis = d3.svg.axis()
//     .scale(x)
//     .orient("bottom")
//     .tickFormat(d3.format(".2s"));

var svg = d3.select("svg")
//.attr("width", width + margin.left + margin.right)
//.attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + (300+margin.left) + "," + (margin.top) + ")");

document.getElementById("title").innerHTML = "Description of " +localStorage['parl'];
document.getElementById("title_short").innerHTML = "Vote of "+localStorage['parl'];

string = localStorage['parl']+"_vote_session.csv"
d3.csv("../viz_data/analysis/"+string, function(error, data) {

    //document.getElementById("councilorParty").innerHTML = parties[d.group];


    if (error) throw error;
    color.domain(d3.keys(data[0]).filter(function(key) { return (key !== "SessionName" & key !=="Total" &
    key !=="Date" & key !== "IdSession"); }));

    data.forEach(function(d) {
        var x0 = 0;
        d.ages = color.domain().map(function(name) {

            return {name: name, x0: x0, x1: x0 += +d[name]}; });
        d.total = d.ages[d.ages.length - 1].x1;

         });

    //data.sort(function(a, b) { return b.total - a.total; });

    x.domain(data.map(function(d) {return d.SessionName; }));
    y.domain([0, d3.max(data, function(d) { return d.total; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(-3," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.15em")
        .attr("transform", "rotate(-65)")

    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")

    var state = svg.selectAll(".bar")
        .data(data)
        .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d) {
            return "translate("+ x(d.SessionName) +", 0)"; });

    state.selectAll("rect")
        .data(function(d) {
            return d.ages; })
        .enter().append("rect")
        .attr("width",x.bandwidth()-5)
        .attr("y", function(d) {
            return y(d.x1); })
        .attr("height", function(d) {
            return -y(d.x1) + y(d.x0); })
        .style("fill", function(d) {
            return color(d.name); })
        .style("stroke", "black")
        .style("stroke-width", 0.5);

    var legend = svg.selectAll(".legend")
        .data(color.domain().slice().reverse())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate("+ -460 +"," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .attr("rx", "3px")
        .attr("ry", "3px")
        .style("fill", color);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });

});
function handleKeyPress(e){
    console.log("coucou")
    var key=e.keyCode || e.which;
    if (key==13){
        findperson();
    }

}
function findperson() {
    var input  =document.getElementById("countries");
    console.log(input.value)
    localStorage['parl'] = input.value;
    window.location.assign("../html/viz_person.html", '_blank');
}