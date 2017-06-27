$(document).ready(function () {
    $.get('./songs.json', function (response) {
        var array = response
        array.forEach(function (element) {
            let $li = $(`
            <li>
                <h3 data-id="${element.id}">${element.name}</h3>
                <p>
                    <svg class="sq" aria-hidden="true">
                        <use xlink:href="#icon-SQ"></use>
                    </svg>
                    ${element.album}
                </p>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-play"></use>
                </svg>
            </li>`)
            $('.latelyMusic>ol').append($li)
            $('#loading-gif').remove()
            $('.latelyMusic>ol').on('click', 'li', function () {
                var name = $(this).children('h3').attr('data-id')
                $.get('./song.html').then(function () {
                    window.location = `./song.html?id=${name}`
                })
            })
        });
    })

    $('.nav').on('click','.click-items>li',function(e){
        var $li = $(e.currentTarget).addClass('active')
        $li.siblings().removeClass('active')
        var index = $li.index()
        $li.trigger('tabChange',index)
        $('.tab-contaner > li').eq(index).addClass('active')
        .siblings().removeClass('active')
    })

    $('.nav').on('tabChange',function(e,index){
        console.log(e,index)
    })
})

