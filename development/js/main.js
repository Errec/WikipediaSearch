var lang = 'en';
var keyword = 'Montreal';
var numberOfEntries = 5;

$('.random-btn').click(function(){
   window.location.href='https://' + lang + '.wikipedia.org/wiki/Special:Random';
});

$.getJSON('https://' + lang + '.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + keyword + '&limit=' + numberOfEntries + '&callback=?', function(data) {

  for (var i = 0; i < data[1].length; i++) {
    $('body').append('<h3>' + data[1][i] + '</h3>');
    $('body').append('<p>' + data[2][i] + '</p>');
  }

  var numberOfResults = data[1].length;

  console.log(numberOfResults);
  console.log('https://' + lang + '.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + keyword + '&limit=' + numberOfEntries + '&callback=?');

});

  function SetResultsGrid(){
  } // TODO
