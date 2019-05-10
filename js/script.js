
$('#article-select').on('change', function () {

    $('.intro').addClass('active');

    const selected = $(this).val();
    if (selected !== '') {
        $('.api-results').append(
            '<img class="loader" src="assets/images/ajax-loader.gif">');
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

                    const altDescription = function(caption){
                        if (caption !== '') {
                            altDescription = value.caption;
                        }
                    };
       
                    $('.api-results').append(`
                <a class="article" href="${value.url}">
                    <p class="img-frame"><img alt="${altDescription}" class="pic-size" src="${pic}"</p>
                    <p class="abstract-summary">${abstract}</p>
                </a>
                
            `);
                });// end of .each
            });// end of .done and .ajax
    }

});



