Share = {
	vkontakte: function() {
		var purl = getlink();
		var ptitle = $('title').text();	
		var pdesc = $("meta[name='description']").attr('content');		
		var pimg = $("meta[property='og:image']").attr('content');
		url  = 'https://vkontakte.ru/share.php?';
		url += 'url='          + encodeURIComponent(purl);
		url += '&title='       + encodeURIComponent(ptitle);
		url += '&description=' + encodeURIComponent(pdesc);		
		url += '&image='       + encodeURIComponent(pimg);
		url += '&noparse=true';
		Share.popup(url);
	},
	pinterest: function() {
		var purl = getlink();
		var ptitle = $('title').text();	
		var pdesc = $("meta[name='description']").attr('content');		
		var pimg = $("meta[property='og:image']").attr('content');
		url  = 'https://www.pinterest.com/pin/create/button/?';
		url += 'url='          + encodeURIComponent(purl);		
		url += '&description=' + encodeURIComponent(pdesc);		
		url += '&media='       + encodeURIComponent(pimg);
		Share.popup(url);
	},
	skype: function() {
		var ptitle = $('title').text();
		var purl = getlink();
		url  = 'https://web.skype.com/share?';
		url += 'text='      + encodeURIComponent(ptitle);
		url += '&url='      + encodeURIComponent(purl.replace('#!','?_escaped_fragment_='));
		Share.popup(url);
	},
	viber: function() {
		var ptitle = $('title').text();
		var purl = getlink();
		url  = 'viber://forward?text=';
		url += encodeURIComponent(ptitle + " " + purl.replace('#!','?_escaped_fragment_='));
		window.location.href = url;
	},
	whatsapp: function() {
		var ptitle = $('title').text();
		var purl = getlink();
		url  = 'whatsapp://send?text=';
		url += encodeURIComponent(ptitle + " " + purl.replace('#!','?_escaped_fragment_='));
		window.location.href = url;
	},
	facebook: function() {
		var purl = getlink();
		var ptitle = $('title').text();
		var pdesc = $("meta[name='description']").attr('content');
		var pimg = $("meta[property='og:image']").attr('content');		
		FB.ui({
		  method: 'feed',
		  description: encodeURIComponent(pdesc),
		  link: purl,
		  caption: encodeURIComponent(ptitle),
		  picture: pimg,
		  name: encodeURIComponent(ptitle)
		  
		}, function(response){});
	},
	facebook_mess: function() {
		var purl = getlink();
		var app_id	= 	'824308531053269';					
		window.open('fb-messenger://share?link=' + purl + '&app_id=' + app_id);
	},
	twitter: function() {
		var purl = getlink();
		var ptitle = $('title').text();
		var pimg = $("meta[property='og:image']").attr('content');		
		url  = 'http://twitter.com/share?';
		url += 'text='      + encodeURIComponent(ptitle);
		url += '&url='      + encodeURIComponent(purl.replace('#!','?_escaped_fragment_='));
		url += '&counturl=' + encodeURIComponent(purl.replace('#!','?_escaped_fragment_='));		
		Share.popup(url);
	},
	google: function() {
		var purl = getlink();		
		url  = 'https://plus.google.com/share?';
		url += 'url='      + encodeURIComponent(purl);	
		Share.popup(url);
	},
	line: function() {
		var purl = getlink();		
		url  = 'https://timeline.line.me/social-plugin/share?';
		url += 'url='      + encodeURIComponent(purl.replace('#!','?_escaped_fragment_='));	
		Share.popup(url);
	},
	copylink: function(){
		var panoShareLink = getlink();	
		CopyToClipboard(panoShareLink);
		infoMessage('Link copied!');
	},
	popup: function(url) {
		window.open(url,'','toolbar=0,status=0,width=626,height=436');
	}
};

CategoryShare = {
	vkontakte: function() {
		var purl = getCategoryLink();
		var ptitle = getCategoryTitle();	
		var pdesc = getCategoryDescription();		
		var pimg = getCategoryImage();
		url  = 'https://vkontakte.ru/share.php?';
		url += 'url='          + encodeURIComponent(purl);
		url += '&title='       + encodeURIComponent(ptitle);
		url += '&description=' + encodeURIComponent(pdesc);		
		url += '&image='       + encodeURIComponent(pimg);
		url += '&noparse=true';
		Share.popup(url);
	},
	pinterest: function() {
		var purl = getCategoryLink();
		var ptitle = getCategoryTitle();	
		var pdesc = getCategoryDescription();		
		var pimg = getCategoryImage();
		url  = 'https://www.pinterest.com/pin/create/button/?';
		url += 'url='          + encodeURIComponent(purl);		
		url += '&description=' + encodeURIComponent(pdesc);		
		url += '&media='       + encodeURIComponent(pimg);
		Share.popup(url);
	},
	skype: function() {
		var ptitle = getCategoryTitle();
		var purl = getCategoryLink();
		url  = 'https://web.skype.com/share?';
		url += 'text='      + encodeURIComponent(ptitle);
		url += '&url='      + encodeURIComponent(purl.replace('#!','?_escaped_fragment_='));
		Share.popup(url);
	},
	viber: function() {
		var ptitle = getCategoryTitle();
		var purl = getCategoryLink();
		url  = 'viber://forward?text=';
		url += encodeURIComponent(ptitle + " " + purl.replace('#!','?_escaped_fragment_='));
		window.location.href = url;
	},
	whatsapp: function() {
		var ptitle = getCategoryTitle();
		var purl = getCategoryLink();
		url  = 'whatsapp://send?text=';
		url += encodeURIComponent(ptitle + " " + purl.replace('#!','?_escaped_fragment_='));
		window.location.href = url;
	},
	facebook: function() {
		var purl = getCategoryLink();
		var ptitle = getCategoryTitle();
		var pdesc = getCategoryDescription();
		var pimg = getCategoryImage();		
		FB.ui({
		  method: 'feed',
		  description: encodeURIComponent(pdesc),
		  link: purl,
		  caption: encodeURIComponent(ptitle),
		  picture: pimg,
		  name: encodeURIComponent(ptitle)
		  
		}, function(response){});
	},
	facebook_mess: function() {
		var purl = getCategoryLink();
		var app_id	= 	'824308531053269';					
		window.open('fb-messenger://share?link=' + purl + '&app_id=' + app_id);
	},
	twitter: function() {
		var purl = getCategoryLink();
		var ptitle = getCategoryTitle();
		var pimg = getCategoryImage();		
		url  = 'http://twitter.com/share?';
		url += 'text='      + encodeURIComponent(ptitle);
		url += '&url='      + encodeURIComponent(purl.replace('#!','?_escaped_fragment_='));
		url += '&counturl=' + encodeURIComponent(purl.replace('#!','?_escaped_fragment_='));		
		Share.popup(url);
	},
	google: function() {
		var purl = getCategoryLink();		
		url  = 'https://plus.google.com/share?';
		url += 'url='      + encodeURIComponent(purl);	
		Share.popup(url);
	},
	line: function() {
		var purl = getCategoryLink();		
		url  = 'https://timeline.line.me/social-plugin/share?';
		url += 'url='      + encodeURIComponent(purl.replace('#!','?_escaped_fragment_='));	
		Share.popup(url);
	},
	copylink: function(){
		var panoShareLink = getCategoryLink();	
		CopyToClipboard(panoShareLink);
		infoMessage('Link copied!');
	},
	popup: function(url) {
		window.open(url,'','toolbar=0,status=0,width=626,height=436');
	}
};
function skypeInit(){
// Place this code in the head section of your HTML file 
(function(r, d, s) {
	r.loadSkypeWebSdkAsync = r.loadSkypeWebSdkAsync || function(p) {
		var js, sjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(p.id)) { return; }
		js = d.createElement(s);
		js.id = p.id;
		js.src = p.scriptToLoad;
		js.onload = p.callback
		sjs.parentNode.insertBefore(js, sjs);
	};
	var p = {
		scriptToLoad: 'https://swx.cdn.skype.com/shared/v/latest/skypewebsdk.js',
		id: 'skype_web_sdk'
	};
	r.loadSkypeWebSdkAsync(p);
})(window, document, 'script');
}
function getlink() {
		var pano = getUrlVars()["p"];
		var lang = getUrlVars()["lang"];
		if(lang == undefined || lang == 'undefined' || lang == ''|| lang == null){
			lang = 'en';
		}
		var scene = krpano.get("xml.scene");
		var ath = krpano.get("view.hlookat").toFixed(2);
		var atv = krpano.get("view.vlookat").toFixed(2);
		var fov = krpano.get("view.fov").toFixed(2);
		var link = window.location.protocol + '//' + window.location.host + '/#!p=' + pano + '&s=' + scene + '&h=' + ath + '&v=' + atv + '&f=' + fov + '&lang=' + lang;
		if(typeof pano === 'undefined' || pano == ''|| pano == null){
			link = window.location.href;
		}
		return link;
}
function getCategoryLink(){
	var hash = $('.parent-category').attr('data-url');
	var link = window.location.protocol + '//' + window.location.host + '/' + hash;
	if(typeof hash === 'undefined' || hash == ''|| hash == null){
			link = window.location.href;
	}	
	return link;
}
function getCategoryTitle(){
	var title = $('.parent-category').text();	
	if(typeof title === 'undefined' || title == ''|| title == null){
			title = $('title').text();
	}	
	return $.trim(title);
}
function getCategoryDescription(){
	var description = $('.parent-category').attr('data-description');	
	if(typeof description === 'undefined' || description == ''|| description == null){
			description = $("meta[name='description']").attr('content');
	}	
	return description;
}
function getCategoryImage(){
	var img = $('.parent-category').attr('data-image');	
	if(typeof img === 'undefined' || img == ''|| img == null){
			img = $("meta[name='description']").attr('content');
	}	
	return img;
}