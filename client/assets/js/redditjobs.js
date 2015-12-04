//When DOM loaded we attach click event to button
$(document).ready(function() {

  $.getJSON('./results-reddit.json', function(data) {
      var output="<ul>";
      for (var i in data) {
          output+="<li>" + "<div class='result'>" + "<a href=" + data[i].url + "> <h3><small>" + data[i].title + "</a></small></h3>" + "<p> Posted by: "+ data[i].name + "</p>" +"</div>"+"</li>";
      }

      output+="</ul>";
      document.getElementById("placeholder").innerHTML=output;
});
$('#update').click(function(){
    console.log('button clicked');
    $.ajax({url: 'update-reddit', success:function(data){
        console.log('Dribble is updated');

    }});
    setTimeout(function(){
    location.reload();
    },3000);
    $( ".status" ).append( "<div class='alert alert-info' role='alert'><strong>Heads up!</strong> Updating list, refreshing in 5 seconds.</div>" );

});


});
