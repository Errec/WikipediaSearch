var numberOfEntries = 5;

$('.random-btn').click(function(){
   window.location.href='https://' + GetSelectedLang() + '.wikipedia.org/wiki/Special:Random';
});

$('.submit-btn').click(function(event){
  event.preventDefault();
  $.getJSON('https://' + GetSelectedLang() + '.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=' + numberOfEntries + '&prop=pageimages|extracts&pilimit=max&pithumbsize=400&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + GetFormInput() + '&callback=?', function(data){

  SetResultsGrid(data);
  });
});

function SetResultsGrid(data){
  var div = '';
  var imgURL = '';
  var imgThumbnail = '';
  $('.result-container').empty();

  if (data.query === undefined) {
    div = '<div>There were no results matching the query.</div>';
  } else {
      for (var id in data.query.pages){
        imgThumbnail = data.query.pages[id].thumbnail;

        if(imgThumbnail === undefined){
          imgURL = "https://upload.wikimedia.org/wikipedia/commons/1/10/Wikipedia-W-bold-in-square.svg";
        } else{
          imgURL = imgThumbnail.source;
        }
        div += '<div class="card-wrapper"><img src="' + imgURL + '" class="thumbnail"/><div class="article-text"><h3 class="article-head">' + data.query.pages[id].title + '</h3><p class="article-body">' + data.query.pages[id].extract + '</p></div></div>';
      }
    }
  $('.result-container').append(div);
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
