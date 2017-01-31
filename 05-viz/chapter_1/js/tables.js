var data = [];
cols = []
var map = {};

d3.csv("../viz_data/voting_deputee/"+localStorage['parl']+"_vote.csv", function(list) {
    d3.csv("../viz_data/map_bill_ID.csv", function(mapping){

        mapping.forEach(function(element) {
            map[element.BillTitle] = element.ID_Bill;

        });
    });
    console.log(list)

     data = list
 var table =   $('#table').DataTable( {
        data: data,
        columns: [
            {data : 'BillTitle'},
            {data :'Date'},
            {data :'Decision'},
            {data :'Total_Yes'},
            {data :'MeaningYes'},
            ],
        "columnDefs": [
         { "width": "40%", "targets": 0 },
            ],

        "createdRow": function (row,data,index) {

            partyvotes = [data.Party_Yes,data.Party_No,data.Party_Abstention];
            maxparty = Math.max.apply(null,partyvotes);
            argmax = partyvotes.indexOf(""+maxparty+"")
            str_party = switching(argmax)
            $('td', row).eq(3).html(maxparty+ str_party[0])
            $('td', row).eq(3).addClass(str_party[1])


            totalvotes = [data.Total_Yes,data.Total_No,data.Total_Abstention];
            maxtotal = Math.max.apply(null,totalvotes);
            argmax = totalvotes.indexOf(""+maxtotal+"")
            str_total = switching(argmax)
            $('td', row).eq(4).html(maxtotal+ str_total[0])
            $('td', row).eq(4).addClass(str_total[1])


            if ( data.Decision == "Yes" ) {
                $('td', row).eq(2).addClass('yes');
            }
            if ( data.Decision == "No" ) {
                $('td', row).eq(2).addClass('no');
            }
            if ( data.Decision == "Abstention" ) {
                $('td', row).eq(2).addClass('abs');
            }


            sTitle =  " Yes:  "+data.Total_Yes+"%, No:  "+data.Total_No+"%<br/> Abstention: "+data.Total_Abstention+"%";
            sTitle += "<br/> Total Participants: "+ data.Total_Total+"<br/> Meaning Yes :"+data.MeaningYes+"" +"<br/> Meaning No :"+data.MeaningNo;
            $('td', row)[4].setAttribute( 'title', sTitle );
            $('td',row).eq(4).tooltip(
                {
                    "container": 'body',
                    "Track"    :true,
                    "html":true,
                });
            sTitle =  " Yes:"+data.Party_Yes+"%, No:"+data.Party_No+"% <br/> Abstention: "+data.Party_Abstention+"%";
            sTitle += "<br/> Party Participants: "+data.Party_Total;
            $('td', row)[3].setAttribute( 'title', sTitle );
            $('td',row).eq(3).tooltip(
                {
                    "container": 'body',
                    "Track"    :true,
                    "html":true,
                });

            row.onclick = function () {
                id = map[data.BillTitle]
                console.log(id)
                string = "bill_"+id+".csv";
                d3.csv("../viz_data/bill_link/"+string , function(error, link) {
                    console.log(map)

                    bill_link = link[link.length-1];

                    localStorage['bills'] = JSON.stringify(link);
                    localStorage['bill'] = JSON.stringify(bill_link);
                    window.location.assign("../html/bills.html", '_blank');
                    ;})
            }
        }

    } );


});
function switching(arg) {
    switch (arg) {
        case 0:
            return ["% Yes","yes"]
            break;
        case 1:
            return ["% No","no"]
            break;
        case 2:
            return ["% Abstention","abs"]
            break;
        default :
            return "unknown"

    }
}