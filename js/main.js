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

/*    $.getJSON('https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=' + data[1][i].split(' ').join('_') + '&callback=?', function(dataImg){
        var id = Object.keys(dataImg.query.pages)[0];
        var imgSrc = dataImg.query.pages[id].thumbnail.original;
        $('body').append('<img class="thumbnail" src=' + '"' + imgSrc + '"' + '>');
    });*/
    $('.article-text').append('<h3 class="article-head">' + data[1][i] + '</h3>');
    $('.article-text').append('<p class="aticle-body">' + data[2][i] + '</p>');
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
