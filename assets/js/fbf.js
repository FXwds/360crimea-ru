function validateEmail(inputText)
{
	if(inputText.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
	{
	return true;
	}
	else
	{
	return false;
	}
}
function sendMail(isProperty) {
    var title = $("#property-title").val();
    var name = $("#feed-back-name").val();
    var email = $("#feed-back-email").val();
    var tel = $("#feed-back-phone").val();
    var bedrooms = $("#property-bedrooms").val();
    var bathrooms = $("#property-bathrooms").val();
    var typeOfProperty = $("#type-of-property").val();
    var locationOfProperty = $("#location-of-property").val();
    var sellPrice = $('#property-sell-price').val();
    var rentPrice = $('#property-rent-price').val();
    var msg = $("#feed-back-comment").val();
    var url = window.location.href;
	var pageTitle = $('title').text();
	var lang = getUrlVars()["lang"];
	if(typeof lang === 'undefined'){
		lang = 'en';
	}
    var sendUrl = 'https://russia-360.info/api/send-message'
    var dataString = 'name=' + name + '&email=' + email + '&tel=' + tel + '&msg=' + msg + '&url=' + encodeURIComponent(url) + '&pageTitle=' + pageTitle;
    var elem = $('#booking-block input');
    if (isProperty) {
        sendUrl = 'https://russia-360.info/api/send-property'
        elem = $('#feed-back-content input, #feed-back-content select');
        name = $("#property-name").val();
        email = $("#property-email").val();
        tel = $("#property-phone").val();
        dataString = 'title=' + title + '&name=' + name + '&email=' + email + '&tel=' + tel + '&bedrooms=' + bedrooms + '&bathrooms=' + bathrooms + '&typeOfProperty=' + typeOfProperty + '&locationOfProperty=' + locationOfProperty + '&sellPrice=' + sellPrice + '&rentPrice=' + rentPrice + '&url=' + encodeURIComponent(url) + '&pageTitle=' + pageTitle;
    }
    var foc;
    var error = false;
	$('.form-group span').remove();
    elem.each(function(index) {
		var $this = $(this);
        if ($this.hasClass('required')) {
            if (!this.value || this.value == this.defaultValue) {
                $this.addClass("error");
				$this.parent('.form-group').append('<span class="error-message">' + translation.This_Field_Is_Required(lang) + '</span>');
                error = true;
                foc = $(this).attr("id");
            } else {
				if($this.attr('type') == 'email' && !this.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
					$this.parent('.form-group').append('<span class="error-message">' + translation.You_Entered_An_Incorrect_Email(lang) + '</span>');
					error = true;
				}
				else if($this.attr('type') == 'tel' && !this.value.match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)){
					$this.parent('.form-group').append('<span class="error-message">' + translation.Please_Enter_Only_Phone_Number(lang) + '</span>');
					error = true;
				}
				else{
					$this.parents('.form-group').find('span').remove();
					$this.removeClass("error");
				}

            }
        }
    });
    if (error) {
        $('#' + foc).focus();
        return false;
    } else {
        $('#property-feed-back').addClass('sent');
        $.ajax({
            type: "POST",
            url: sendUrl,
            data: dataString,
            success: function() {
                if (isProperty) {
                    ga('send', 'event', 'Button', 'Click', 'List Property Send');
                } else {
					fbq('track', 'Lead',{content_name: $('title').text()});
                    ga('send', 'event', 'Button', 'Click', 'FeedBack Send');
                }
                window.location.href = window.location.protocol + '//' + window.location.hostname + '/message-send?lang=' + lang +'&url=' + encodeURIComponent(url);
            }
        });
    }
};
