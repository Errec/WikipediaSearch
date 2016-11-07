var numberOfEntries = 5;

$('.random-btn').click(function(){
   window.location.href='https://' + GetSelectedLang() + '.wikipedia.org/wiki/Special:Random';
});

$('.submit-btn').click(function(event){
  event.preventDefault();

  $.getJSON('https://' + GetSelectedLang() + '.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + GetFormText() + '&limit=' + numberOfEntries + '&callback=?', function(data){
  SetResultsGrid(data);
/*    console.log('https://' + lang + '.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + keyword + '&limit=' + numberOfEntries + '&callback=?');*/
  });
});

function SetResultsGrid(data){
  for (var i = 0; i < data[1].length; i++){
    $('body').append('<h3>' + data[1][i] + '</h3>');
    $('body').append('<p>' + data[2][i] + '</p>');
  }
}

function GetFormText(){
  if(document.getElementById('#search-input').value === ''){
    return ' ';
  } else {
    return document.getElementById('#search-input').value;
  }
}

function GetSelectedLang(){
  return $('select').val();
}


