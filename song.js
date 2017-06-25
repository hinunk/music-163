$(function(){
	$.get('./lyric.json').then(function(object){
		var {lyric} = object
		var array = lyric.split('\n')
		var regex = /^\[(.+)\](.*)$/
		array = array.map(function(string,index){
			var matches = string.match(regex)
			if(matches){
				return {tiem: matches[1],words: matches[2]}
			}	
		})
				
		array.map(function(object){
			if(!object){return}
			var $lyric = $('.line')
			var $p = $('</p>')
			$p.attr('data-teme',object.tiem).text(object.words)
			$p.appendTo($lyric)
		})
	})
	

	var audio = document.createElement('audio')
	audio.src = "./Quiet's-Theme.mp3"
	$('.icon-wrap').on('click',function(){
		audio.play()
		$('.halo').addClass('turn')
		$('.cover').addClass('turn')
		$(this).css({'display':'none'})
	})
})