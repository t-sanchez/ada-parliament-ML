var data = [];
cols = []
d3.csv("../viz_data/voting_deputee/Ada Marra_vote.csv", function(list) {
    console.log(list)

     data = list
 var table =   $('#table').DataTable( {
        data: data,
        columns: [
            {data : 'BillTitle'},
            {data :'Decision'},
            {data :'MeaningYes'},
            {data :'Party_Yes'},
            {data :'Party_No'},
            {data :'Party_Abstention'},
            {data :'Total_Yes'},
            {data :'Total_No'},
            {data :'Total_Abstention'},
            {data :'Date'},
            {data :'IdVote'}
            ]

    } );
    $('#table').on( 'click', 'tr', function () {
        console.log($(this)[0].children[10].innerHTML)

        if ($(this)[0].children[0].innerHTML != "BillTitle"){
        localStorage['subject'] = $(this)[0].children[10].innerHTML
        window.location.assign("../html/bills.html", '_blank')
            ;}

    } );

});
