$( document ).ready(function() {
  var numberOfEntries = 20;

  $('.random-btn').click(function(){
     window.location.href='https://' + GetSelectedLang() + '.wikipedia.org/wiki/Special:Random';
  });

  $("input")
    .focus(function(){
    $(".input-container").css('outline', 'solid 2px black');
    }).blur(function(){
    $(".input-container").css('outline', 'solid 1px #9A9A9A');
  });

  $('.submit-btn').click(function(event){
    ColapseDivs();
    event.preventDefault();

    $.getJSON('https://' + GetSelectedLang() + '.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=' + numberOfEntries + '&prop=info|pageimages|extracts&inprop=url&pilimit=max&pithumbsize=400&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + GetFormInput() + '&callback=?', function(data){

      SetResultsGrid(data);
    });
  });
});

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

function ColapseDivs(){
  $(".hero-container").slideUp(450);
  $(".random-btn-container").slideUp(450);
  $(".wikiglobe").fadeOut(350, function(){
  });
}

function SetResultsGrid(data){
  var div = '';
  var imgURL = '';
  var imgThumbnail = '';
  var txtExtract = '';
  var articleURL = '';

  $('.result-container').empty();

  if (data.query === undefined) {
    div = '<div>There were no results matching the query.</div>';
  } else {
      for (var id in data.query.pages){
        imgThumbnail = data.query.pages[id].thumbnail;
        txtExtract = data.query.pages[id].extract;
        articleURL = data.query.pages[id].fullurl;

        if(imgThumbnail === undefined){
          imgURL = "https://upload.wikimedia.org/wikipedia/commons/1/10/Wikipedia-W-bold-in-square.svg";
        } else{
          imgURL = imgThumbnail.source;
        }

        if (txtExtract === undefined) {
          txtExtract = ' ';
        }

        div += '<div class="card-wrapper"><a href="' + articleURL + '"><img src="' + imgURL + '" class="thumbnail"/></a><div class="article-text"><h3 class="article-head"><a href="' + articleURL + '">' + data.query.pages[id].title + '</h3></a><p class="article-body">' + txtExtract + '</p></div></div>';
      }
    }
  $('.result-container').append(div).hide().fadeIn(1000);
}
