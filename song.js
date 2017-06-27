$(function () {

	let id = location.search.match(/\bid=([^&]*)/)[1]

	$.get('./songs.json').then(function (response) {
		let songs = response
		let song = songs.filter(s => s.id === id)[0]
		let { url, name, lyric, albumImage } = song

		initplayer.call(undefined, url)
		initNameLyric(name, lyric)
		initAlbumImage(albumImage)
	})
	function initAlbumImage(albumImage) {
		var $cover = $('.cover')
		$cover.attr('src', albumImage)
	}
	function initNameLyric(name, lyric) {
		$('#musicTitle').text(name)
		parseLyric(lyric)
	}
	function initplayer(url) {
		var audio = document.createElement('audio')
		audio.src = url
		$('.icon-wrap').on('click', function () {
			audio.play()
			$('.halo').addClass('turn')
			$('.cover').addClass('turn')
			$(this).css({ 'display': 'none' })

			setInterval(() => {
				let seconds = audio.currentTime
				let munites = ~~(seconds / 60)
				let left = seconds - munites * 60
				let time = `${pad(munites)}:${pad(left)}`
				let $lines = $('.line> p')
				let $whichLine
				for (let i = 0; i < $lines.length; i++) {
					let currentLineTime = $lines.eq(i).attr('data-time')
					let nextLineTime = $lines.eq(i + 1).attr('data-time')
					if ($lines.eq(i + 1).length !== 0 && currentLineTime < time && nextLineTime > time) {
						$whichLine = $lines.eq(i)
						break
					}
				}
				if ($whichLine) {
					$whichLine.addClass('active').prev().removeClass('active')
					let top = $whichLine.offset().top
					let linesTop = $('.line').offset().top
					let delta = top - linesTop - $('.lyric').height() / 3
					$('.line').css('transform', `translateY(-${delta}px)`)
				}
			}, 300)
		})
	}
	function pad(number) {
		return number >= 10 ? number + '' : '0' + number
	}
	function parseLyric(lyric) {
		if (lyric === undefined) {
			var $lyric = $('.line')
			var $p = $('</p>')
			$p.text('暂无歌词')
			return $p.appendTo($lyric)
		}
		var array = lyric.split('\n')
		var regex = /^\[(.+)\](.*)$/
		array = array.map(function (string, index) {
			var matches = string.match(regex)
			if (matches) {
				return { tiem: matches[1], words: matches[2] }
			}
		})

		array.map(function (object) {
			if (!object) { return }
			var $lyric = $('.line')
			var $p = $('</p>')
			$p.attr('data-time', object.tiem).text(object.words)
			$p.appendTo($lyric)
		})
	}

})