var linksperson = [];
d3.json("../viz_data/linkspersons.json", function(list) {
    console.log(list)
    linksperson = list;


string = localStorage['parl']+"_info.json"
d3.json("../viz_data/deputee_names/"+string, function(error, data) {
    console.log(data)
    console.log(localStorage['parl'])
document.getElementById("pics").src="../pictures/"+linksperson[data.Name] +".jpg";
document.getElementById("councilorName").innerHTML = data.Name ;
document.getElementById("councilorParty").innerHTML = data.PartyName ;
document.getElementById("councilorCanton").innerHTML = data.CantonName ;




});
});