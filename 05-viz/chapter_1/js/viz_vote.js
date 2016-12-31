/**
 * Created by Barry on 15/12/2016.
 */
d3.json("../topicEvolution.json", function (json) {
   makegraph_lines(json)

});


var simulation = d3.forceSimulation()

simulation
    .on("tick", ticked)
    .alphaDecay(0)
    .velocityDecay(0.1);

function ticked(){
}
/*
function clicl(){
    console.log(jsons[this.value])
    if (this.checked == true) {
        makegraph(jsons[this.value], this.value)
    }
    else{
        removegraphe(this.value)
    }
}
function addradiobutton(type, text) {
    var label = document.createElement("label");

    var element = document.createElement("input");
    //Assign different attributes to the element.
    element.setAttribute("type", "checkbox");
    element.setAttribute("value", text);
    element.setAttribute("name", type);
    element.setAttribute("onclick", 'clicl.call(this)')

    label.appendChild(element);
    label.innerHTML += text;
    label.innerHTML +='<br>'


    var body = document.getElementsByName("Topic")[0];
    body.appendChild(label);
}*/
