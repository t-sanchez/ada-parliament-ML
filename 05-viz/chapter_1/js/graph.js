function makegraph(data,name) {
    var values  = prepare_data(data)
    var nbr_be =values[0],
        test=values[1],
        keys=values[2];
// set the dimensions and margins of the graph
    var svg = d3.select("svg"),
        margin = {top: 10, right: 30, bottom: 50, left: 50},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// set the ranges
    //var x = d3.scaleTime().range([0, width]);
    range_ = []
    for (var i=0; i<keys.length;++i){

        range_.push(i/keys.length*width);
    }
    console.log(keys)
    var x = d3.scaleOrdinal()
        .domain(keys)
        .range(range_)
    var y = d3.scaleLinear().range([height,0]);

    //x.domain(d3.extent(d3.entries(nbr_be), function(d) {return d.key; }));
    y.domain([0, d3.max(d3.entries(nbr_be), function(d) { return d.value; })]);
// define the line
    var valueline = d3.line()
        .curve(d3.curveBasis)
        .x(function(d) {
            return x(d.key); })
        .y(function(d) {
            return y(d.value); });

    // Add the valueline path.
    var path = g.append("path")
        .data([d3.entries(test)])
        .attr("class", "line")
        .attr("d", valueline)
        .attr("stroke", stringToColour(name))
        .attr("id", name);
    var totalLength = path.node().getTotalLength();

    path
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(2000)
        .attr("stroke-dashoffset", 0);



    svg.append('text')
        .attr('x', width + 5) // space the legend
        .attr('y', margin.top + 20 + (i * 20))
        .attr('class', 'legend') // style the legend
        .text(name);

    // Add the X Axis
    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickValues(keys))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

    // Add the Y Axis
    d3.selectAll(".y.axis").remove()
    console.log(g.selectAll(".y.axis"))
        g.append("g")
            .attr("class","y axis")
            .call(d3.axisLeft(y));




}

function removegraphe(name){
    console.log(d3.select(name))
    d3.selectAll("#"+name).remove();

}
function prepare_data(data)
{
    var nbr_be = [];
    var keys = []
    for(var  key in data) {

            nbr_be[key] = data[key];

    }
    console.log(nbr_be)
    var test = []
    for( key in nbr_be) {

        keys.push(key)
    }
    keys.sort();
    for( key in keys) {
        test.push(nbr_be[keys[key]])
    }
// Set the dimensions of the canvas / graph

    return [nbr_be,test,keys];

};

function stringToColour (str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}