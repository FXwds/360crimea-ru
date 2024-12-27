function parseFiles(offset, link){
	var progress = $('.progress-bar');
	var parseImg = $('#parseImg').prop('checked') ? 1 : 0;
    $.ajax({
        url: 'https://360crimea.ru/api/parse-pano-files',
        data: {
            offset: offset,
            link: link,
			parseimg: parseImg
        },
        success: function(data) {
			if(data != 0){
				parseFiles(data, link);
				var percentNow = parseInt(progress.attr('aria-valuenow')) + 1;
				progress.attr('aria-valuenow', percentNow).text(percentNow + '%').css('width', percentNow + '%');
			}
			else{
				progress.text('Готово!');
				$('#parse').removeClass('parsing');
				progress.parent('.progress').removeClass('active');
				progress.attr('aria-valuenow', 100).css('width', 100 + '%');
			}
        }
    });
}

$(document).on('click', '#parse', function(){
	var link = $('#link').val();
	var progress = $('.progress-bar');
	if(!$(this).hasClass('parsing')){
		progress.attr('aria-valuenow', 0).text(0 + '%').css('width', 0 + '%');
		progress.parent('.progress').addClass('active');
		if(link.length < 1){
			$('#link').parent('.form-group').addClass('has-error');
		}
		else{
			$('#link').parent('.form-group').removeClass('has-error').addClass('has-success');
			$(this).addClass('parsing');
			parseFiles(0, link);
		}
	}
})









