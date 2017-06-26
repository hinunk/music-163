$(function () {

	let id = location.search.match(/\bid=([^&]*)/)[1]

	$.get('./songs.json').then(function (response) {
		let songs = response
		let song = songs.filter(s => s.id === id)[0]
		let { url } = song
		var audio = document.createElement('audio')
		audio.src = url
		$('.icon-wrap').on('click', function () {
			audio.play()
			$('.halo').addClass('turn')
			$('.cover').addClass('turn')
			$(this).css({ 'display': 'none' })
		})
	})


	$.get('./lyric.json').then(function (object) {
		var { lyric } = object
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
			$p.attr('data-teme', object.tiem).text(object.words)
			$p.appendTo($lyric)
		})
	})



})