function makegraph_lines(json) {
    jsons = []
    names = []
    console.log(Object.keys(json['armée']))
    for (name in json)
    {
        jsons[name] = json[name];
        names.push(name)
    }
    var svg = d3.select("svg"),
        margin = {top: 10, right: 150, bottom: 50, left: 50},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;


    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear()
        .range([height,0]);

    var valueline = d3.line()
        .curve(d3.curveBasis)
        .x(function(d) {
            return x(d.key); })
        .y(function(d) {
            return y(d.value); });
    var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    for(var i = 0; i<names.length;i++) {
        data = json[names[i]]
        x.domain(d3.extent(d3.entries(data), function(d) {return d.key; }));
        y.domain([0, d3.max(d3.entries(data), function (d) {
            return d.value;
        })]);
        var path = g.append("path")
            .data([d3.entries(data)])
            .attr("class", "line")
            .attr("d", valueline)
            .attr("stroke", stringToColour(names[i]))
            .attr("id", 'tag'+i);
        var totalLength = path.node().getTotalLength();

        path
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(2000)
            .attr("stroke-dashoffset", 0);
        var onClick = function (i) {
            return function () {
                console.log(data.active)
                var active   = data.active ? false : true,
                    newOpacity = active ? 0.1 : 1;
                // Hide or show the elements based on the ID
                d3.select("#tag"+i)
                    .transition().duration(10)
                    .style("opacity", newOpacity);
                // Update whether or not the elements are active
                data.active = active;
            }
};

        g.append("text")
            .attr("x", width+5)  // space legend
            .attr("y", margin.top + 20 + (i * 20))
            .attr("class", "legend")    // style the legend
            .attr("stroke", stringToColour(names[i]))
            .on("click",onClick(i))
            .text(names[i]);
       // data.active = false;

    };

        // Add the X Axis
console.log(Object.keys(json['armée']))
    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickValues(Object.keys(json['armée']).map(String)))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");


        // Add the Y Axis
        d3.selectAll(".y.axis").remove()
        g.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y));

}

function removegraphe(name){
    d3.selectAll("#"+name).remove();

}

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
}/**
 * Created by Barry on 16/12/2016.
 */
