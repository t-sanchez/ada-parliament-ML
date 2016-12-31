function makehistogram(data) {

    var values  = prepare_data(data)
    var nbr_be =values[0],
        test=values[1],
        keys=values[2];
    var data = test;

    var formatCount = d3.format(",.0f");

    var svg = d3.select("svg"),
        margin = {top: 10, right: 30, bottom: 50, left: 30},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    range_ = []
    for (var i=0; i<keys.length;++i){

        range_.push(i/keys.length*width);
    }

    var x = d3.scaleOrdinal()
            .domain(keys)
            .range(range_)
        ;
    var bins = d3.histogram()
        .domain(x.domain())
        (range_);
    var y = d3.scaleLinear()
        .domain([0,Math.max.apply(Math, test)])
        .range([height,0]);

    var bar = g.selectAll(".bar")
        .data(d3.entries(data))
        .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function(d) {
            return "translate(" + x(d.key)+ "," + y(d.value)  + ")"; });
    bar.append("rect")
        .attr("x", 1)
        .attr("width", x(bins[bins.length-1].x1) - x(bins[0].x0) -1 )
        .attr("height", function(d) {
            return height -y(d.value);});

    bar.append("text")
        .attr("dy", ".75em")
        .attr("y", 6)
        .attr("x", (x(bins[bins.length-1].x1) - x(bins[0].x0)) / 2)
        .attr("text-anchor", "middle")
        .text(function(d) {
            return formatCount(d.value); });

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickValues(keys))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)")
};