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

    $('.nav').on('click', '.click-items>li', function (e) {
        var $li = $(e.currentTarget).addClass('active')
        $li.siblings().removeClass('active')
        var index = $li.index()
        $li.trigger('tabChange', index)
        $('.tab-contaner > li').eq(index).addClass('active')
            .siblings().removeClass('active')
    })

    $('.nav').on('tabChange', function (e, index) {
        let $li = $('.tab-contaner > li').eq(index)
        if ($li.attr('data-downloaded') === 'yes') {
            return
        }
        if (index === 1) {
            $.get('./page2.json').then((response) => {
                var array = response
                array.forEach(function (element) {
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

                $li.attr('data-downloaded', 'yes')
            })
        }
        // else if (index === 2) {
        //     $.get('./page3.json').then((response) => {
        //         $li.text(response.content)
        //         $li.attr('data-downloaded', 'yes')
        //     })
        // }

    })

    let timer = undefined
    $('input#searchSong').on('input', function (e) {
        let $input = $(e.currentTarget)
        let value = $input.val().trim()
        if (value === '') { return }

        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(function () {
            search(value).then((result) => {
                timer = undefined
                if (result.length !== 0) {
                    $('#output').text(result.map((r) => r.name).join(','))
                } else {
                    $('#output').text('没有结果')
                }
            })
        }, 300)


    })

    function search(keyword) {
        console.log('搜索' + keyword)
        return new Promise((resolve, reject) => {
            var database = [
                { "id": 1, "name": "此生不换", },
                { "id": 2, "name": "cocoon", },
                { "id": 3, "name": "Quiet's-Theme", },
                { "id": 4, "name": "風の集まる場所", },
            ]
            let result = database.filter(function (item) {
                return item.name.indexOf(keyword) >= 0
            })
            setTimeout(function () {
                console.log('搜到' + keyword + '的结果')
                resolve(result)
            }, (Math.random() * 200 + 1000))
        })
    }
    window.search = search
})

