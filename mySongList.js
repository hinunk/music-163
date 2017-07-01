$(function() {
    ! function() {
        var dota, request
        request = new XMLHttpRequest()
        request.open('GET', './songs.json')
        request.onload = function() {
            data = JSON.parse(request.responseText)
            data.forEach(function(element) {
                var $li = $(`
            <li>
                <div>${element.id}</div>
                <div>
                    <h4>${element.name}</h4>
                    <p>${element.album}</p>
                    <svg class="icon" aria-hidden="true">
								<use xlink:href="#icon-play"></use>
					</svg>
                </div>
            </li>
        `)
                $('.musicList>ol').append($li)
            })
        }
        request.send(null)

        $('.musicList>ol').on('click', 'li', function() {
            var name = $(this).children('div').eq(0).text()
            $.get('./song.html').then(function() {
                window.location = `./song.html?id=${name}`
            })
        })
    }()


})