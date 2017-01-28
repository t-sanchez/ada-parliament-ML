
heights = {};
pos ={}
var votes = {}
group_number = 0
groups = [];
d3.json("../viz_data/groupId2.json", function(list) {
    console.log(list)
    groups = list;
    groups.push("Parti vert-libéral")
    groups.push("Non inscrit")
    group_number = groups.length
    dx = 1380/groups.length;
    dy = 1000/groups.length;
    for (var i = 0; i < (groups.length); i++) {
        y = 260+80*i
        heights[groups[i]]=y
        for (var j = 0; j < 7; j++){
            votes[j+1]=0
        pos[groups[i]+(j+1)] =0}
    }
    votes[0]=0;

});


var color = ["#00B425", "#FF002D", "#F47D00", "#000000", "#A5AEB4", "#37009D", "#37009D"]
var votes = {}
number = 0
var bill_link= {};
string = "bill_"+localStorage['subject']+".csv";
d3.csv("../viz_data/bill_link/"+string , function(error, link) {
    if (error) throw error;
    var svgContainer = d3.select("svg")
        .attr("width", 1380)
        .attr("height", 900);

    var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");
    var y = d3.scaleBand()
        .rangeRound([0, width],-1)
        .paddingInner(0.1);

    var x = d3.scaleLinear()
        .rangeRound([height, 0]);


    bill_link = link[0];
    document.getElementById("title").innerHTML = "<b> Loi votée : "+link[0].BillTitle+"</b>";

    bill = "voting_"+bill_link.ID+".csv";
    d3.csv("../viz_data/bill_voting/"+bill , function(error, data) {
        console.log(data)
        if (error) throw error;

        data.forEach(function (person) {
            votes[person.Decision]+=1
            number+=1

        })
        console.log(votes)



        var simulation = d3.forceSimulation()
        //var color = d3.scaleOrdinal(d3.schemeCategory20);
            /*var bar = svg.append("g")
                .attr("class", "nodes")
                .selectAll("rect")
                .append("rect")
                .attr("width", 100)
                .attr("height", 100)
                .attr('id', function(d){
                    console.log(d)
                    return d.ID; })
                .attr("fill", function(d) {
                    return stringToColour("lol"); })
                .attr("transform", "translate("+50+","+50 +")")*/


        //Draw the Circle
        var trans = 500;
        var nodetext =   svgContainer
        var circle = svgContainer
        totalwidth = 0;
        for (var i = 0; i < 7; i++) {
            trans += votes[i]*width/800
            var text = svg.append("g")
                .append("text")
                .text(votes[i+1])
                .attr("transform", "translate(" + (11 * 10+(11 * 10 + 40)*i) + "," + (240) + ")");
            if (i<2) {
                totalwidth+=votes[i + 1] * width / 800
                circle.append("rect")
                    .attr("width", votes[i + 1] * width / 800)
                    .attr("height", 30)
                    .attr("transform", "translate(" + trans + "," + 20 + ")")
                    .style("fill", color[i])
                nodetext.append("text")
                    .text(Math.round((100 * votes[i+1]) / (votes[1] + votes[2]))+"%")
                    .attr("transform", "translate(" + (trans+i*((votes[i+1] * width / 800)-30)) + "," + 65 + ")")

            }
        }
        nodetext.append("text")
            .text("Results on Final Votation")
            .attr("transform", "translate(" + 530 + "," + 15 + ")")
        circle.append("rect")
            .attr("width", totalwidth)
            .attr("height", 30)
            .attr("rx", "3px")
            .attr("transform", "translate(" + 500 + "," + 20 + ")")
            .style("fill", "none")
            .style("stroke", "#000000")
        .   style("stroke-width", "1.5px")

            var node = svg.append("g")
                .attr("class", "nodes")
                .selectAll("rect")
                .data(data)
                .enter().append("rect")
                .attr("width", 10)
                .attr("height", 10)
                .attr("rx", "2px")
                .attr("ry", "2px")
                .attr('id', function(d){
                    return d.ID; })
                .attr("fill", function(d) {
                    return stringToColour(d.ParlGroupName); })
                .attr("transform", function(d) {
                    str =  "translate(" + (50 +((pos[d.ParlGroupName+d.Decision])%10)*11+ 150*(d.Decision-1))
                        + "," + (heights[d.ParlGroupName]+11*Math.floor(pos[d.ParlGroupName+d.Decision]/10)) + ")"
                    pos[d.ParlGroupName+d.Decision]+=1
                    return str })
                .on("click", function(d) {
                    localStorage['parl'] = d.Name;
                    window.location.assign("../html/viz-person.html", '_blank');
                    //window.location.assign("../html/viz-person.html", '_blank');
                })
            node.append("title")
                .style("visibility", "hidden")
                .text(function(d) {
                    return d.Name; });





        var legend = svg.selectAll(".legend")
            .data(groups)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) {
                return "translate("+ (-1100+(i%4 * 250)) +"," + (100+50*Math.floor(i/4)) + ") rotate(0) "; })
            //.attr("transform", function(d, i) {
            //    return "translate("+ -300 +"," + (i * 20-10) + ")"; });

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .attr("rx", "3px")
            .attr("ry", "3px")
            .style("fill", function (d) {
                return stringToColour(d)

            });

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function(d) { return d; });
            simulation
                .nodes(data)

        for (var j = 0; j < group_number; j++) {
                trans = 49
                console.log(j)
            for (var i = 0; i < 7; i++) {
                var grid = svg.append("g")
                    .append("rect")
                    .attr("height", "510px")
                    .attr("width", 11 * 10 + 10)
                    .attr("height", 75 )
                    .attr("rx", 10)
                    .attr("ry", 10)
                    .style("fill", "none")
                    .style("stroke", color[i])
                    .attr("transform", "translate(" + (trans-4.6) + "," + (250 +80*j) + ")");
                //bill_link = data[0]
                //document.getElementById("title").innerHTML = data[0].BillTitle
                //document.getElementById("title2").innerHTML = data[0].BusinessTitle
                trans += 11 * 10 + 40;
            }
        }

    });
});
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
    return colour;}