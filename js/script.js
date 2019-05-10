
$('#article-select').on('change', function () {

    $('.intro').addClass('active');

    const selected = $(this).val();
    if (selected !== '') {
        loadArticles(selected);
        //action here
    }
    // run the ajax method on the select list change
    function loadArticles(category) {
        $.ajax({
            method: 'get',
            url: 'https://api.nytimes.com/svc/topstories/v2/' + selected + '.json?api-key=ebd1IQb4CcFe94VTUSSn2AzJGnwhtEAl'
        })
            .done(function (data) {
                $('.api-results').empty();

                const filteredData = data.results.filter(function (article) {
                    return article.multimedia[4] !== undefined;
                }).slice(0, 12);

                $.each(filteredData, function (key, value) {
                    console.log(value);
                    const abstract = value.abstract;
                    const pic = value.multimedia[4].url;
                    $('.api-results').append(`
                <a class="article" href="${value.url}">
                    <p class="img-frame"><img class="pic-size" src="${pic}"</p>
                    <p class="abstract-summary">${abstract}</p>
                </a>
            `);
                });// end of .each
            });// end of .done and .ajax
    }

});

//TO DO - set pictures as background images with caption on top like on Aloha
//TO DO - use "empty" to get rid of previous story selections
  //you can add classes in the html above
// sections will be Home, Arts, Business, Sports, Technology, Fashion



// !function(e){"use strict";e(function(){let a,t,i;const s=e(".ajax-loader"),n=e(".stories");e("#sections").on("change",function(){const l=e(this).val();l.length&&(i="https://api.nytimes.com/svc/topstories/v2/"+l+".json?api-key=0751ffff01d7a70710354972fa0ad4a9",n.empty(),a="",t="",e(".logo img").css({height:"50%",width:"50%"}),e(".site-header").css({"align-items":"flex-start",flex:"1 0 auto",height:"auto","max-width":"600px"}),e(".search-placeholder").hide(),s.css("display","block"),e.ajax({method:"GET",url:i,dataType:"json"}).done(function(i){let s,l,o;if(0!==(a=i.results).length){const i=a.filter(function(e){return e.multimedia.length}).slice(0,12);t+="<ul>",e.each(i,function(e,a){o=a.multimedia[4].url,l=a.abstract,s=a.url,t+='<li class="article-item">',t+='<a href="'+s+'" target="_blank">',t+='<div class="inner-item-wrapper">',t+='<div class="article" style="background-image:url('+o+')">',t+='<div class="story-meta">',t+="<p>"+(l||"This story has no description.")+"</p>",t+="</div>",t+="</div>",t+="</div>",t+="</a>",t+="</li>"}),t+="</ul>"}else t+='<p class="feedback">Sorry, nothing found! Please try again.</p>';n.hide().fadeIn("fast").append(t)}).fail(function(){n.append('<p class="feedback">Sorry! There was a problem, please try again.</p>')}).always(function(){s.hide()}))})})}(jQuery);



