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



})

