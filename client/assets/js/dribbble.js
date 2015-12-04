//When DOM loaded we attach click event to button
$(document).ready(function() {

  $.getJSON('./results-dribble-jobs.json', function(data) {
      var output="<ul>";
      for (var i in data) {
          output+="<li>" + "<div class='result'>" + "<a href=" + data[i].url + "> <h3><small>" + data[i].position + "</a></small></h3>" + "<p> Company: "+ data[i].company + "</p>" + "<p>" + data[i].location+"</p></div>"+"</li>";
      }

      output+="</ul>";
      document.getElementById("placeholder").innerHTML=output;
});

$('#update').click(function(){
    console.log('button clicked');
    $.ajax({url: 'update-dribbble', success:function(data){
        console.log('Dribble is updated');

    }});
    setTimeout(function(){
    location.reload();
    },3000);
    $( ".status" ).append( "<div class='alert alert-info' role='alert'><strong>Heads up!</strong> Updating list, refreshing in 5 seconds.</div>" );

});


});
