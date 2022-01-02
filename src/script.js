$(document).ready(function(){ 
  $("#random-button").click(function(){
    window.open('https://en.wikipedia.org/wiki/Special:Random')
  })
  $("#input").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#search-button").click();
    }
  });
  $("#search-button").click(function() {
    $("#results-list").empty();
    var search = $("#search-box").val();
    $.ajax({
        type: 'GET',
        url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=extracts&pilimit=max&exintro&explaintext&exsentences=10&exlimit=max&gsrsearch=' + search,
        dataType: 'jsonp',
        success: function(result) {
          console.log(result);
          console.log(result.query.pages);
          var pages = result.query.pages;
          for (var page in pages) {
          $("#results-list").append('<a target="_blank" href="https://en.wikipedia.org/wiki?curid=' + pages[page].pageid + '">' + '<li><h3 class="wiki-title">' + pages[page].title + '</h3><p class="wiki-extract">' + pages[page].extract + '</p></li></a>');
          }
        }
      });
    });
});
