var linksperson = [];
d3.json("../viz_data/linkspersons.json", function(list) {
    linksperson = list;

});

var input = document.getElementById("countries");
var map = {};
d3.csv("../viz_data/map_bill_ID.csv", function(mapping){

    mapping.forEach(function(element) {
        map[element.BillTitle] = element.ID_Bill;

    });
});
var awesomplete = new Awesomplete(input, {
    minChars: 1,
    maxItems: 5,
    autoFirst: true
});
var persons = [];
d3.csv("../viz_data/SubjectTopicMapping.csv", function(error, graph) {
    if (error) throw error;
    graph.forEach(function (d) {
        persons.push(d[""])
    })
    awesomplete.list = persons;
});
votes_indices ={}
heights = {};
pos ={}
var votes = {}
group_number = 0
groups = [];



var color = ["#00B425", "#FF002D", "#FF002D", "#000000", "#A5AEB4", "#37009D", "#37009D"]
number = 0;
bills = JSON.parse(localStorage['bills']);
var src = document.getElementById("navig");
for (var i = 0; i < bills.length; i++) {
    var option = document.createElement("option");
    if (bills[i].Subject !="NaN")
    option.innerHTML =i+":"+ bills[i].Subject
    else
        option.innerHTML =i+":"+ "Subject not specified"
    option.value = bills[i].ID
    option.id = i
    src.appendChild(option);
}
bill = JSON.parse(localStorage['bill']);
bill_str = "voting_"+bill.ID+".csv";
createpage(bill_str)
if (bill.BillTitle == bill.BusinessTitle)
document.getElementById("title").innerHTML = "<b> Loi votée : "+bill.BillTitle+"</b>";
else
    document.getElementById("title").innerHTML = "<b> Loi votée : "+bill.BillTitle+"<br/> "+bill.BusinessTitle+"</br>";


function createpage(bill_str) {

    d3.json("../viz_data/groupId2.json", function(list) {
        groups = list;
        group_number = groups.length
        dx = 1380/groups.length;
        dy = 1000/groups.length;
        for (var i = 0; i < (groups.length); i++) {
            y = 140+95*i
            heights[groups[i]]=y
            for (var j = 0; j < 7; j++){
                votes[j+1]=0
                pos[groups[i]+(j+1)] =0}
        }
        votes[0]=0;

    d3.csv("../viz_data/bill_voting/"+bill_str , function(error, data) {
        console.log(data)

        if (error) throw error;
        data.forEach(function (person) {
            if (person.Decision in votes)
            votes[person.Decision]+=1
            else
                votes[person.Decision]=1
            number+=1

        })
        if (error) throw error;
        var svgContainer = d3.select("svg")
            .attr("width", 980)
            .attr("height", 900);

        var svg = d3.select("svg"),
            width = +svg.attr("width"),
            height = +svg.attr("height");
        var y = d3.scaleBand()
            .rangeRound([0, width],-1)
            .paddingInner(0.1);

        var x = d3.scaleLinear()
            .rangeRound([height, 0]);


        var simulation = d3.forceSimulation()

        //Draw the Circle

        var nodetext =   svgContainer
        var circle = svgContainer
        var offset = 180;
        var trans = 0;
        totalwidth = 200;
        d3.json("../viz_data/vote_dict.json", function (d) {
            votes_indices =d

        for (var i = 0; i < 7; i++) {
            trans    += (votes[i] * width) / 800
            switch (i) {
                case 0:
                    var text = svg.append("g")
                        .append("text")
                        .text(votes_indices[i + 1] + " (" + votes[i + 1] + ")")
                        .attr("transform", "translate(" + (offset+11 * 10 - 40) + "," + (120) + ")")
                        .attr("font-weight", "bold");

                        break;
                case 1:
                    var text = svg.append("g")
                        .append("text")
                        .text(votes_indices[i + 1] + " (" + votes[i + 1] + ")")
                        .attr("transform", "translate(" + (offset+11 * 10 + (11 * 10 + 40) * 2 - 40) + "," + (120) + ")")
                        .attr("font-weight", "bold");
                    break;
                case 2:
                    var text = svg.append("g")
                        .append("text")
                        .text(votes_indices[i + 1] + " (" + votes[i + 1] + ")")
                        .attr("transform", "translate(" + (offset+11 * 10 + (11 * 10 + 40) * 1 - 40) + "," + (120) + ")")
                        .attr("font-weight", "bold");
                    break;
                case 4:
                    var text = svg.append("g")
                        .append("text")
                        .text(votes_indices[i + 1] + " (" + votes[i+1] + ")")
                        .attr("transform", "translate(" + (offset+11 * 10 + (11 * 10 + 40) * 3 - 40) + "," + (120) + ")")
                        .attr("font-weight", "bold");
                    break;
                case 5:
                    var text = svg.append("g")
                        .append("text")
                        .text(votes_indices[i + 1] + " (" + votes[i+1] + ")")
                        .attr("transform", "translate(" + (offset+11 * 10 + (11 * 10 + 40) * 4 - 40) + "," + (120) + ")")
                        .attr("font-weight", "bold");
                    break;
                case 6:
                    var text = svg.append("g")
                        .append("text")
                        .text("Group / President")
                        .attr("transform", "translate(" + (offset-100) + "," + (120) + ")")
                        .attr("font-weight", "bold");
                    break;
            }
            if (i<2) {
                ratio = votes[i+1] / (votes[1] + votes[2])
                ratio_old = votes[i] / (votes[1] + votes[2])
                //totalwidth+=votes[i + 1] * width / 800
                circle.append("rect")
                    .attr("width", ratio*totalwidth)
                    .attr("height", 30)
                    .attr("transform", "translate(" + (ratio_old*totalwidth+width/2.50) + "," + 20 + ")")
                    .style("fill", color[i])
                nodetext.append("text")
                    .text(Math.round((100*ratio))+"%")
                    .attr("transform", "translate(" + (width/2.50+(i)*(totalwidth-25)) + "," + 65 + ")")

            }
        }

        nodetext.append("text")
            .text("Results on Final Votation")
            .attr("transform", "translate(" + (width/2-80) + "," + 15 + ")")
        circle.append("rect")
            .attr("width", totalwidth)
            .attr("height", 30)
            .attr("rx", "3px")
            .attr("transform", "translate(" + width/2.5+ "," + 20 + ")")
            .style("fill", "none")
            .style("stroke", "#000000")
        .   style("stroke-width", "1.5px")
        })
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
                .on("mouseover",function(d) {
                     document.getElementById("pics").src="../pictures/"+linksperson[d.Name] +".jpg";
                        document.getElementById("councilorName").innerHTML = d.Name ;
                        document.getElementById("councilorParty").innerHTML = d.ParlGroupName;



                })
                .attr("transform", function(d) {
                    var str="";
                    switch (d.Decision){
                        case "1":
                            x = (offset+50 +((pos[d.ParlGroupName+d.Decision])%10)*11+ 150*(d.Decision-1))
                            y = (heights[d.ParlGroupName]+11*Math.floor(pos[d.ParlGroupName+d.Decision]/10))
                            str =  "translate(" + x+"," + y + ")";
                            pos[d.ParlGroupName+d.Decision]+=1
                            break;
                        case "2":
                             str =  "translate(" + (offset+50 +((pos[d.ParlGroupName+3])%10)*11+ 150*(2))
                                + "," + (heights[d.ParlGroupName]+11*Math.floor(pos[d.ParlGroupName+3]/10)) + ")"
                            pos[d.ParlGroupName+3]+=1
                            break;
                        case "3":
                             str =  "translate(" + (offset+50 +((pos[d.ParlGroupName+2])%10)*11+ 150*(1))
                                + "," + (heights[d.ParlGroupName]+11*Math.floor(pos[d.ParlGroupName+2]/10)) + ")"
                            pos[d.ParlGroupName+2]+=1
                            break;
                        case "5":
                            str =  "translate(" + (offset+50 +((pos[d.ParlGroupName+4])%10)*11+ 150*(3))
                                + "," + (heights[d.ParlGroupName]+11*Math.floor(pos[d.ParlGroupName+4]/10)) + ")"
                            pos[d.ParlGroupName+4]+=1
                            break;
                        case "6":
                            str =  "translate(" + (offset+50 +((pos[d.ParlGroupName+5])%10)*11+ 150*(4))
                                + "," + (heights[d.ParlGroupName]+11*Math.floor(pos[d.ParlGroupName+5]/10)) + ")"
                            pos[d.ParlGroupName+5]+=1
                            break;
                        case "7":
                            str =  "translate(" + (offset)
                                + "," + (heights[d.ParlGroupName]+25) + ")"
                            break;




                    }

                    return str })

                .on("click", function(d) {
                    localStorage['parl'] = d.Name;
                    window.location.assign("../html/viz_person.html", '_blank');
                    //window.location.assign("../html/viz-person.html", '_blank');
                })
            node.append("title")
                .style("visibility", "hidden")
                .text(function(d) {
                    return d.Decision; });





        var legend = svg.selectAll(".legend")
            .data(groups)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function(d, i) {
                return "translate("+ (-width+offset+60) +"," + (180 + 95 * i) + ") rotate(0) "; })
            //.attr("transform", function(d, i) {
            //    return "translate("+ -300 +"," + (i * 20-10) + ")"; });



        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function(d) { return d; });
            simulation
                .nodes(data)

        for (var j = 0; j < group_number; j++) {
                trans2 = 49
            for (var i = 0; i < 7; i++) {
                    if (i==0 || i==2 ) {
                        var grid = svg.append("g")
                            .append("rect")
                            .attr("height", "510px")
                            .attr("width", 11 * 10 + 10)
                            .attr("height", 90)
                            .attr("rx", 10)
                            .attr("ry", 10)
                            .style("fill", "none")
                            .style("stroke", color[i])
                            .attr("transform", "translate(" + (offset+trans2 - 4.6) + "," + (130 + 95 * j) + ")");
                        //bill_link = data[0]
                        //document.getElementById("title").innerHTML = data[0].BillTitle
                        //document.getElementById("title2").innerHTML = data[0].BusinessTitle

                    }
                trans2 += 11 * 10 + 40;
            }
        }


});

    });
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
    return colour;}
function handleKeyPress(e) {
    var key = e.keyCode || e.which;
    if (key == 13) {
        findperson();
    }
}
function findperson() {
    var input  =document.getElementById("countries");
    id = map[input.value]
    string = "bill_"+id+".csv";
    d3.csv("../viz_data/bill_link/"+string , function(error, link) {

        bill_link = link[link.length-1];

        localStorage['bills'] = JSON.stringify(link);
        localStorage['bill'] = JSON.stringify(bill_link);
        window.location.assign("../html/bills.html", '_blank');
        ;})

    localStorage['subject'] = id;
    window.location.assign("../html/bills.html", '_blank');
}

window.change = function(e){
    d3.select("svg").selectAll("*").remove();
    createpage("voting_"+e.value+".csv")


    }
