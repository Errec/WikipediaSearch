var numberOfEntries = 5;

$('.random-btn').click(function(){
   window.location.href='https://' + GetSelectedLang() + '.wikipedia.org/wiki/Special:Random';
});

$('.submit-btn').click(function(event){
  event.preventDefault();
  $.getJSON('https://' + GetSelectedLang() + '.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + GetFormInput() + '&limit=' + numberOfEntries + '&callback=?', function(data){
  SetResultsGrid(data);
  });
});

function SetResultsGrid(data){
  $('.result-container').empty();
  for (var i = 0; i < data[1].length; i++){
    $('.result-container').append('<h3>' + data[1][i] + '</h3>');
    $('.result-container').append('<p>' + data[2][i] + '</p>');
  }
}

function GetFormInput(){
  if(document.getElementById('#search-input').value === ''){
    return ' ';
  } else {
    return document.getElementById('#search-input').value;
  }
}

function GetSelectedLang(){
  return $('select').val();
}

// TODO: form border on focus
