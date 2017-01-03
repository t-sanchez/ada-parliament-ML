/*var rad_cluster = document.Clustering.buttons;
var prev_cluster = null;
var cluster = "Null";
var cluster_changed = false;
var style = "Null";
for(var i = 0; i < rad_cluster.length; i++) {
    rad_cluster[i].onclick = function() {
        (prev_cluster)? console.log(prev_cluster.value):null;
        if(this !== prev_cluster) {
            prev_cluster = this;
            cluster = this.value;
        }
        cluster_changed = true;
    };

}*/
/*var rad_style = document.style.checkbox;
var prev_style = null;
var styleType = "none";
var style_changed = false;
for(var i = 0; i < rad_style.length; i++) {
    rad_style[i].onclick = function() {
        (prev_style)? console.log(prev_style.value):null;
        if(this !== prev_style) {
            prev_style = this;
            console.log(this.value)
            styleType = this.value;
        }
        style_changed = true;
    };
}*/
var simulation = d3.forceSimulation();






simulation
    .on("tick", ticked)
    .alphaDecay(0)
    .velocityDecay(0.1);

function ticked(){
    console.log('coucou')

    updatehist();
}
function updatehist() {
if(cluster_changed ==true || style_changed == true ){
    d3.selectAll("svg > *").remove();

    if (cluster == "year") {
        d3.json("../viz_data_vote.json", function (json) {
            console.log(json)
            var a = json.VoteEnd;
            console.log(style)
            if (styleType == "line"){
                makegraph(a)
            }
            else{
            makehistogram(a)
            }



        });
    } else if (cluster == "month") {
        d3.json("../viz_data_vote_month.json", function (json) {
            console.log(json)
            var a = json.VoteEnd;
            if (styleType == "line"){
                makegraph(a)
            }
            else{
                makehistogram(a)
            }
        });
    }
    cluster_changed = false;
    style_changed = false
    }
}
