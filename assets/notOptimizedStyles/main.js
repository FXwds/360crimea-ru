	var owl;
	var owl2;
	var timeout;
	var timer;
	loadMap = false;
	var loadGallery = false;
	var panoIsLoad = false;
	var windowLoad = false;
	var dateTimeNow = new Date();	
	var breadCrumbsHeight = $('#bread-crumbs').height();
	var deviceHeight = window.innerHeight;
	var deviceWidth = window.innerWidth;
	var map;
	var firstLoad = true;
	var pageLoad = true;
	var myVar;
	var timeNow = $('#startTime').val();
	var randomHash = 123123;
	var isLoaded = true;	
		function priceToString(price){
			var priceString = price.toString();
			var price = priceString.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
			var priceStart = price.split(' ')[0];
			var priceEnd = price.replace(priceStart, '');
			if(priceEnd === undefined)
			{
				priceEnd = '';
			}
			var entity = '<span>' + priceStart + '</span>' + priceEnd;
			return entity;
		}
		function setCookie(name, value, options) {
		  options = options || {};

		  var expires = options.expires;

		  if (typeof expires == "number" && expires) {
			var d = new Date();
			d.setTime(d.getTime() + expires * 1000);
			expires = options.expires = d;
		  }
		  if (expires && expires.toUTCString) {
			options.expires = expires.toUTCString();
		  }

		  value = encodeURIComponent(value);

		  var updatedCookie = name + "=" + value;

		  for (var propName in options) {
			updatedCookie += "; " + propName;
			var propValue = options[propName];
			if (propValue !== true) {
			  updatedCookie += "=" + propValue;
			}
		  }

		  document.cookie = updatedCookie;
		}
		function getRandom()
		{
		  return Math.random();
		}
		function OnShowFilters(){
			$('.scroll-wrapper.site-search-results, .show-filters, .search-panel-footer, .sisea-search-form').hide();			
			$('.search-panel-header').hide();
			$('.hide-filters, .filters-body, .filters').show();
			$('.filters-body').addClass('active');	
		}
		//pano functions//
		function webglAvailable() {
				try {
					var canvas = document.createElement("canvas");
					return !!window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
				} catch(e) {
					return false;
				}
		}
		function getWmodeValue() {
				var webglTest = webglAvailable();
				if(webglTest){
					return 'direct';
				}
				return 'opaque';
		}
		function addDayNight(img, display){
				$('#day-night-btn').css({"background-image": "url('" + img.replace('indexdata','assets').replace('png', 'svg') + "')", "display": display});				
			}
		function readDeviceOrientation() {
				// window.innerHeight is not supported by IE
				var winH = window.innerHeight ? window.innerHeight : jQuery(window).height();
				var winW = window.innerWidth ? window.innerWidth : jQuery(window).width();
				//force height for iframe usage
				if(!winH || winH == 0){
					winH = '100%';
				}
				if($('#search-panel').hasClass('active'))
				{
					
					var left = 0;
					if(winW > 396){
						left = winW - 396;
					}
					$('#search-panel').css('left', left + 'px');
				}
				// set the height of the document
				jQuery('html').css('height', '100%');
				// scroll to top
				window.scrollTo(0,0);
		}
		function accessWebVr(){
				unloadPlayer();
				eventUnloadPlugins();
				setTimeout(function(){ loadPlayer(true); }, 100);
		}
		function accessStdVr(){
				unloadPlayer();	
				if(!$('#search-panel').hasClass('open')){
					OnShowHideControls(false, false);
				}
				resetValuesForPlugins();
				setTimeout(function(){ loadPlayer(false); }, 100);
		}
		function loadPlayer(isWebVr) {			
			if (isWebVr) {
				embedpano({
						id:"krpanoSWFObject"
						,xml:panoVrXml
						,target:"panoDIV"
						,passQueryParameters:true
						,bgcolor:"#000000"
						,html5:"only+webgl"
						,focus: false
						,vars:{skipintro:true,norotation:true}
					});
			} else {
					
					var isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);
					embedpano({
						id:"krpanoSWFObject"
						,swf:panoSwf
						,target:"panoDIV"
						,passQueryParameters:true
						,bgcolor:"#000000"
						,focus: false
						,html5:isBot ? "always" : "prefer"
					});
			}
				//apply focus on the visit if not embedded into an iframe
				if(top.location === self.location){
					kpanotour.Focus.applyFocus();
				}
			}
			function unloadPlayer(){
				if(jQuery('#krpanoSWFObject')){
					removepano('krpanoSWFObject');
				}
			}
		    function isVRModeRequested() {
				var querystr = window.location.hash.substring(2);				
				var params = querystr.split('&');
				for (var i=0; i<params.length; i++){
					if (params[i].toLowerCase() == "vr"){
						return true;
					}
				}
				return false;
			}
	function fullScreen(){
		var panoWindow = document.getElementById('krpanoSWFObject');
		var $this = $(this);
		if($this.hasClass('full-screen'))
		{
			panoWindow.set('fullscreen', false);
			$this.removeClass('full-screen');
			$('.logo').css('z-index', 10000);
		}
		else{
			panoWindow.set('fullscreen', true);
			$this.addClass('full-screen');
			//panoWindow.webkitRequestFullScreen();
			$('.logo').css('z-index', 10000000000);		
		}
	}
	function giroscopeOnOff(){
		var panoWindow = document.getElementById('krpanoSWFObject');
		var $this = $(this);
		if($this.hasClass('active'))
		{
			panoWindow.set('plugin[gyroscope].enabled', false);
			$this.removeClass('active');			
		}
		else{
			panoWindow.set('plugin[gyroscope].enabled', true);
			$this.addClass('active');					
		}
	}
	function hotspotsHideShow(){
		var panoWindow = document.getElementById('krpanoSWFObject');
		var $this = $(this);
		if($this.hasClass('visible'))
		{
			panoWindow.call('hidepanopointspots');
			$this.removeClass('visible');
		}
		else{
			panoWindow.call('showpanopointspots');
			$this.addClass('visible');
		}
	}
	function goHome(){
		var panoWindow = document.getElementById('krpanoSWFObject');
		var parentLink = $('#home-btn').attr('data-link');			
			if(parseInt(parentLink) == 0)
			{			
				panoWindow.call('startup');
				panoWindow.call('stopallsounds');
			}
			else{
				window.location.hash = parentLink;
			}
	}
	function goBack(){
		var panoWindow = document.getElementById('krpanoSWFObject');
		var scene = panoWindow.get("xml.scene");
		var sphere = getUrlVars()["s"];		
			if(typeof sphere === 'undefined' || sphere === null )
			{			
				panoWindow.call('startup');
				panoWindow.call('stopallsounds');
			}
			else{
				if(parseInt(scene.replace(/\D+/g,"")) == parseInt(sphere.replace(/\D+/g,"")))
				{
					history.back();
				}
				else
				{
					panoWindow.call('startup');
					panoWindow.call('stopallsounds');
				}
			}

	}
	function OnVrMode(){
		accessWebVr();
		OnShowHideControls(true, false);
	}
	function loadpano(xmlname)
	{
		document.getElementById("krpanoSWFObject").call("loadpano(" + xmlname + ", startscene=null, MERGE, ZOOMBLEND(2.0, 2.0, easeInOutSine));");
	}
	function CSSLoad(file){
		var link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("type", "text/css");
		link.setAttribute("href", file);
		link.setAttribute("title", "dynamicLoadedSheet");
		document.getElementsByTagName("head")[0].appendChild(link)
	}
	function getTime(){
		var locale = $('html').attr('lang');
		var dateTimeNow = new Date(timeNow);
		$('.time').text(moment(dateTimeNow).locale('ru').format("H:mm"));
		$('.date').text(moment(dateTimeNow).locale(locale).format("ddd., DD MMMM"));
	}
	function updateTime(){
		var dateTime = new Date(timeNow);
		var locale = $('html').attr('lang');
		var dateTimeNow = moment(dateTime).add(1,'minutes');
		$('.time').text(dateTimeNow.locale('ru').format("H:mm"));
		$('.date').text(dateTimeNow.locale(locale).format("ddd., DD MMMM"));
		timeNow = dateTimeNow.locale('en').format("MMMM D, YYYY HH:mm:ss");
	}
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};
	function searchTimeout() {
		timeout = setTimeout(function(){ OnSearchPanelShow(false, 1220, 1220, true); }, 5000);
	}
	function initMap() {
		var myLatlng = new google.maps.LatLng($('#search-panel').attr('data-latitude'),$('#search-panel').attr('data-longitude'));
	    map = new google.maps.Map(document.getElementById('map'), {
			center: myLatlng,
			zoom: mapZoom,		
			disableDefaultUI: true,
			scrollwheel: true,
			gestureHandling: 'cooperative'
	    });
		var marker = new google.maps.Marker({
			position: myLatlng,
			title: mapTitle
		});
		// To add the marker to the map, call setMap();
		marker.setMap(map);
	}
	function initOurLocationMap() {
		var myLatlng = new google.maps.LatLng(7.9927999,98.3056705);
	    map = new google.maps.Map(document.getElementById('ourLocation'), {
			center: myLatlng,
			zoom: 10,		
			disableDefaultUI: true,
			scrollwheel: false,
			gestureHandling: 'cooperative'
	    });
		var marker = new google.maps.Marker({
			position: myLatlng,
			title: 'Boat Avenue, 49/15 Bandon-Cherngtalay Road, Thalang, Choeng Thale, Phuket, 83110'
		});
		// To add the marker to the map, call setMap();
		marker.setMap(map);
	}
	function appendMap(){
		$('.search-content').empty().append('<div id="map"></div>');
		$('.back').attr('data-id', 1220).attr('data-search-id', 1220);
		initMap();
	}
	function infoMessage(message){
		$('body').append('<div class="info-message" style="display: none;">'+ message +'</div>');
		$('body').queue(function(){
			$('.info-message').fadeIn();
			setTimeout(function(){
				$('.info-message').fadeOut();
				$('.info-message').queue(function(){
				$('.info-message').remove();
				$('.info-message').dequeue();
				});
			}, 3000);			
			$('body').dequeue();
		});		
	}
	function OnShowHideControls(isHide, isSearch){
		if(isHide){
			if(isMobile.any() || !isSearch){
				$('#day-night-btn').css('z-index', '-1');
				$('#about-object-btn, #panoLocation, .site-bar-btns').fadeOut(500);
			}
			$('.search-tabs, .logo').fadeOut(500);
		}
		else{
			if(isMobile.any() || !isSearch){
				$('#about-object-btn, #panoLocation, .site-bar-btns').fadeIn(500);
				$('#day-night-btn').css('z-index', '10000000000');
			}
			$('.search-tabs, .logo').fadeIn(500);
		}
	}
	function OnCloseShareBtns(){
		if($("#share-btn").hasClass('open'))
				{
					$("#share-btn").removeClass('open');
					$("#control-share-btns").animate({height: '0px'},500).hide('500');
				}
	}
	function OnCloseCategoryShareBtns(){
		if($("#category-share-btn").hasClass('open'))
				{
					$("#category-share-btn").removeClass('open');
					$("#category-control-share-btns").animate({height: '0px'},500).hide('500');
				}
	}
		/*------------ Панель поиска -------------*/
	function OnSearchPanelShow(isMap, category, categoryId, isFolder){
				var $this = $(this);		
				OnCloseShareBtns();
				$('.wrap_mW._show_1e._orinationLeft_3O').hide();
				OnCloseCategoryShareBtns();
				clearTimeout(timeout);
				$('#search-panel').addClass('open');				
				OnShowHideControls(true, true);
				$('#search-panel').animate({width: (!isMobile.any() ? 396 : '100%')}, 500);
				$('#search-panel').queue(function() {
				$('.search-panel-content').fadeIn(500);
				if(!isMobile.any()){
					$("#search").focus();					
				}
				setTimeout(function(){
					if(!isMap)
					{
						if (!$.cookie('first_visit')) {
							$.cookie('first_visit', true, {expires: 300,path: '/'});
							$('#category-search-btn').empty();
						}
						$('#mobile-category-search-btn').addClass('active');
						if(pageLoad){
							if(categoryId == 1220)
							{
								GetParentCategories()
							}
							else{
								OnCategorySearch(category, categoryId, isFolder, '', false);
							}
							pageLoad = false;
						}
					}
					else{
						$('.search-content').empty();						
						appendMap();
					}						
				}, 500);
				if(isMobile.any())
				{
					var deviceWidthNow = window.innerWidth;
					var left = 0;
					if(deviceWidthNow > 396){
						left = deviceWidthNow - 396;
					}
					$('#search-panel').css('left', left + 'px').addClass('active');
				}
				$('#search-panel').dequeue();
				});
	}
	function OnSearch(){
			$('.filters, .filters-body').hide();
			if(isMobile.any())
			{
				$('.scroll-wrapper.site-search-results').css('top', '75px');
			}
			else{
				$('.search-panel-header').show();
				$('.scroll-wrapper.site-search-results').css('top', '160px');
			}
			var pagetitle = $('#search').val();
			var category = $('.search-logo').attr('data-categoryid');
			var categoryId = parseInt($('.search-logo').attr('data-categoryid'));
			var isFolder = $('.search-logo').attr('data-isfolder');
			if(parseInt(isFolder) == 0){
				isFolder = false;
			}
			else{
				isFolder = true;
			}
			window.clearTimeout(timer);
		    if(pagetitle.length > 2)
			{	
				timer = setTimeout(function () {OnAjaxSearch(pagetitle);}, 1000);				
    		}
			else
			{
				$('.search-content').empty();
				timer = setTimeout(function(){
						if($('#map-search-btn').hasClass('active'))
						{
							appendMap();
						}
						else{
							if(categoryId == 0)
							{
								GetParentCategories();
							}
							else{
								OnCategorySearch(category, categoryId, isFolder, '');
							}
						}
				}, 1000);
			}
	}
	function OnLanguageChange(){
		var $this = $(this);
		var panoId = getUrlVars()["p"];		
		contextKey = $this.data('key');
		window.location.hash = '#!p=' + panoId + '&lang=' + contextKey;
		var culture = $this.data('culture'); 
		$('.language-active').text($this.text());
		$this.parents('.lang-links').hide("slide", { direction: "right" }, 500);
		$('html').attr('lang', culture);
		$('.absolute, .hub-logo').show();
		$('.lang-links li a').removeClass('active');
		$('.language-active').removeClass('open');
		$this.addClass('active');	
		GetParentCategories();	
		getTime();
	}
	function GetParentCategories (){
		if(isMobile.any())
		{
			$('.scroll-wrapper.site-search-results').css('top', '75px');
		}
		else{
			$('.search-panel-header').show();
			$('.scroll-wrapper.site-search-results').css('top', '160px');
		}
		$('.search-logo').attr('data-categoryid', 0).attr('data-isfolder', 1);
		$('.parent-category').remove();
		$('.absolute, .filters, .filters-body').hide();
		$('.filters-body').removeClass('active');
		var searchResults = $('.site-search-results .search-content');
		var cultureKey = $('html').attr('lang');
		$.ajax({
				url: 'https://thai360.info/api/get-parent-categories',
				data:{					
						lang: cultureKey
					},
				beforeSend: function(){
				searchResults.html('<svg version="1.1" id="loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
									   width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">\
									  <path opacity="0.5" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946\
										s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634\
										c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>\
									  <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0\
										C22.32,8.481,24.301,9.057,26.013,10.047z">\
										<animateTransform attributeType="xml"\
										  attributeName="transform"\
										  type="rotate"\
										  from="0 20 20"\
										  to="360 20 20"\
										  dur="0.5s"\
										  repeatCount="indefinite"/>\
										</path>\
									  </svg>');
				},
				success: function (data){
					var items = data.items;					
					searchResults.hide().empty();
					$('#search').attr('placeholder', data.search);
					$('.back').attr('data-id', 0).attr('data-search-id', 0);		
					var $container = searchResults.append('<ul class="category-list"></ul>').find('ul');											
					for (key in items) {
                    var item = items[key];
                            $container.append('<li class="' + item.catClass + '">\
										<a data-id="' + item.itemId + '" data-search-id="'+ item.searchId +'" title="' + item.title + '">\
										<svg version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
											  viewBox="0 0 60 60" style="enable-background:new 0 0 60 60; fill:' + item.borderColor + ';" xml:space="preserve">\
											<polyline class="st0" points="30,30 5.8,30 5.8,5.7 54.2,5.7 54.2,54.3 5.8,54.3 "/>\
											<g>\
											 <path class="st1" d="M30,59.8C13.5,59.8,0.2,46.5,0.2,30S13.5,0.3,30,0.3S59.8,13.6,59.8,30S46.4,59.8,30,59.8z M30,2.3\
											  C14.6,2.3,2.2,14.7,2.2,30c0,15.3,12.5,27.8,27.8,27.8S57.8,45.4,57.8,30C57.8,14.7,45.3,2.3,30,2.3z"/>\
											</g>\
											<g>\
											 <path class="st1" d="M30,58.8H1.2V30c0,0-0.4,11.7,8.3,20.3S30,58.8,30,58.8z"/>\
											 <path class="st1" d="M30,59.8H0.2V30.6c0-0.3,0-0.5,0-0.6l2,0v0.4c0,1.9,0.6,11.8,8,19.2c8.3,8.2,19.6,8.3,19.8,8.3V59.8z\
											   M2.2,57.8h17.6c-3.5-1.3-7.5-3.4-11-6.8c-3.3-3.3-5.4-6.9-6.6-10.3V57.8z"/>\
											</g>\
										</svg>\
											<span>\
												<i style="background-image: url(' + item.icon +');"></i>\
											</span>\
											<p>' + item.title + '</p>\
										</a>\
									</li>');
                    }
					searchResults.fadeIn('500');
				}
			});
	}
	function OnFilterSearch(){		
		$('.filters-body, .hide-filters, .search-panel-header').hide();
		$('.filters-body').removeClass('active');
		$('.search-logo').attr('data-isfilter', 1);
		isLoaded = true;
		$('.scroll-wrapper.site-search-results, .show-filters, .sisea-search-form, .search-panel-footer').show();
		var districts = getDistrictArray();
		var rentType = parseInt($('.radio-btns .select-list input:checked').val());
		var categoryId = $('#type-select .select-active').attr('data-categoryId');
		var type = $('.radio-btns input[name="type"]:checked').val();
		$('.parent-category').remove();
		var searchResults = $('.site-search-results .search-content');
		var cultureKey = $('html').attr('lang');	  
			$.ajax({
				url: 'https://thai360.info/api/get-real-estate-objects',
				data:{
						categoryId: categoryId,						
						lang: cultureKey,
						type: type,
						rentType: rentType,
						currency: $('#currency-select .select-active').attr('data-currency'),
						bedroomsMin: $( "#slider-beds" ).slider( "values", 0),
						bedroomsMax: $( "#slider-beds" ).slider( "values", 1),
						districts: districts
					},
				beforeSend: function(){
				searchResults.html('<svg version="1.1" id="loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
									   width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">\
									  <path opacity="0.5" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946\
										s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634\
										c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>\
									  <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0\
										C22.32,8.481,24.301,9.057,26.013,10.047z">\
										<animateTransform attributeType="xml"\
										  attributeName="transform"\
										  type="rotate"\
										  from="0 20 20"\
										  to="360 20 20"\
										  dur="0.5s"\
										  repeatCount="indefinite"/>\
										</path>\
									  </svg>');
				},
				success: function (data){
					var items = data.items;					
					var parentId = data.parentId;
					var priceNowMin = $( "#slider-range" ).slider( "values", 0 );
					var priceNowMax = $( "#slider-range" ).slider( "values", 1 );
					searchResults.hide().empty();
					$('#search').attr('placeholder', data.search);
					$('.back').attr('data-id', parentId).attr('data-search-id', parentId);
					$('.absolute').show();
					if(isMobile.any())
					{
						$('.scroll-wrapper.site-search-results').css('top', '110px');
					}
					else{
						$('.scroll-wrapper.site-search-results').css('top', '120px');
					}				
					var $container = searchResults.append('<div class="category-list"></div>').find('div.category-list');
							if(type == 1)
							{
							
							for (key in items) {
								var item = items[key];
								if(rentType == 1 && categoryId != '327-land'){
										if(parseInt(item.priceRentDaily) >= priceNowMin && parseInt(item.priceRentDaily) <= priceNowMax && parseInt(item.priceRentDaily) != 0){
									$container.append('<div class="sisea-result estate offset">\
															<a href="#!p=' + item.itemId + '-' + item.alias + '&lang=' + cultureKey + '" title="'+ item.title +'" style="background-image: url('+ item.squareImg + '?' + randomHash + ');" class="object">'
																+ ($.cookie('object_' + item.itemId) ? (item.type == 1 ? '<div class="rent"></div>' : '') + (item.type == 3 ? '<div class="sale-rent"></div>' : '') : '<div class="new"></div>') +  '<div class="object-id">Id: ' + item.itemId + '</div></a>\
															<div class="object-description">\
															<p class="card-object-location"><i></i>' + item.location + '</p>\
															<p class="card-object-category"><i></i>' + item.category + '</p>'
															+ (item.categoryId != '327-land' ? '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>' : '') +
															'<p class="card-area">' + item.area + ' <span>sq. m.</span></p>'
															+ (item.pool == 0 ? '' : '<p class="card-pool">' + (item.pool == 1 ? 'Private pool' : 'Community pool') + '</p>' ) +
															'<p class="object-sea-view">' + (item.seaView == 'true' ? 'Sea view' : '') + '</p>'
															+ (item.type == 3 ? '<p class="second-object-price"><i>Rent: </i>' + priceToString(item.priceRentDaily) + ' ' + getCurrencySymbol() + '</p><p class="object-price"><i>Sale: </i>' + priceToString(item.priceSale) + ' ' + getCurrencySymbol() + '</p>' : '<p class="object-price">' + priceToString(item.priceRentDaily) + ' ' + getCurrencySymbol() + '</p>') + '</div>\
															<div class="contact-object-btn"><img src="/assets/images/object_contact_icon.svg"/><span>Contact</span></div>\
															<div class="favorite-object-btn"><img src="/assets/images/favorites_icon.svg"/><span>Favorite</span></div>\
									</div>')};
								}
								else{
									if(parseInt(item.priceRentMonthly) >= priceNowMin && parseInt(item.priceRentMonthly) <= priceNowMax && parseInt(item.priceRentMonthly) != 0){
									$container.append('<div class="sisea-result estate offset">\
															<a href="#!p=' + item.itemId + '-' + item.alias + '&lang=' + cultureKey + '" title="'+ item.title +'" style="background-image: url('+ item.squareImg + '?' + randomHash +');" class="object">'
																+ ($.cookie('object_' + item.itemId) ? (item.type == 1 ? '<div class="rent"></div>' : '') + (item.type == 3 ? '<div class="sale-rent"></div>' : '') : '<div class="new"></div>') +  '<div class="object-id">Id: ' + item.itemId + '</div></a>\
															<div class="object-description">\
															<p class="card-object-location"><i></i>' + item.location + '</p>\
															<p class="card-object-category"><i></i>' + item.category + '</p>'
															+ (item.categoryId != '327-land' ? '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>' : '') +
															'<p class="card-area">' + item.area + ' <span>sq. m.</span></p>'
															+ (item.pool == 0 ? '' : '<p class="card-pool">' + (item.pool == 1 ? 'Private pool' : 'Community pool') + '</p>' ) +
															'<p class="object-sea-view">' + (item.seaView == 'true' ? 'Sea view' : '') + '</p>'
															+ (item.type == 3 ? '<p class="second-object-price"><i>Rent: </i>' + priceToString(item.priceRentMonthly) + ' ' + getCurrencySymbol() + '</p><p class="object-price"><i>Sale: </i>' + priceToString(item.priceSale) + ' ' + getCurrencySymbol() + '</p>' : '<p class="object-price">' + priceToString(item.priceRentMonthly) + ' ' + getCurrencySymbol() + '<text> monthly+</text></p>') + '</div>\
															<div class="contact-object-btn"><img src="/assets/images/object_contact_icon.svg"/><span>Contact</span></div>\
															<div class="favorite-object-btn"><img src="/assets/images/favorites_icon.svg"/><span>Favorite</span></div>\
									</div>')};
								}
								$.cookie('object_' + item.itemId, true, {expires: 300, path: '/'});
								}
							}
							else{								
								for (key in items) {
								var item = items[key];
								if(parseInt(item.priceSale) >= priceNowMin && parseInt(item.priceSale) <= priceNowMax){
									$container.append('<div class="sisea-result estate offset">\
															<a href="#!p=' + item.itemId + '-' + item.alias + '&lang=' + cultureKey + '" title="'+ item.title +'" style="background-image: url('+ item.squareImg + '?' + randomHash +');" class="object">'
															+ ($.cookie('object_' + item.itemId) ? (item.type == 2 ? '<div class="sale"></div>' : '') + (item.type == 3 ? '<div class="sale-rent"></div>' : '') : '<div class="new"></div>') + '<div class="object-id">Id: ' + item.itemId + '</div></a>\
															<div class="object-description">\
															<p class="card-object-location"><i></i>' + item.location + '</p>\
															<p class="card-object-category"><i></i>' + item.category + '</p>'
															+ (item.categoryId != '327-land' ? '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>' : '') +
															'<p class="card-area">' + item.area + ' <span>sq. m.</span></p>'
															+ (item.pool == 0 ? '' : '<p class="card-pool">' + (item.pool == 1 ? 'Private pool' : 'Community pool') + '</p>' ) +
															'<p class="object-sea-view">' + (item.seaView == 'true' ? 'Sea view' : '') + '</p>'
															+ (item.type == 3 ? '<p class="second-object-price"><i>Rent: </i>' + priceToString(item.priceRentMonthly) + ' ' + getCurrencySymbol() + '</p><p class="object-price"><i>Sale: </i>' + priceToString(item.priceSale) + ' ' + getCurrencySymbol() + '</p>' : '<p class="object-price">' + priceToString(item.priceSale) + ' ' + getCurrencySymbol() + '</p>') +
															'</div>\
															<div class="contact-object-btn"><img src="/assets/images/object_contact_icon.svg"/><span>Contact</span></div>\
															<div class="favorite-object-btn"><img src="/assets/images/favorites_icon.svg"/><span>Favorite</span></div>\
									</div>');
									$.cookie('object_' + item.itemId, true, {expires: 300, path: '/'});
									};
								}
							}
					searchResults.fadeIn('500');
				}				
			});			
	}
	function GetHotRealEstates(){
		var searchResults = $('.site-search-results  .search-content');
		var cultureKey = $('html').attr('lang');
		$('.search-logo').empty();	
		$('.filters, .show-filters, .absolute').show();
		$('.search-panel-header').hide();
		$('.parent-category').remove();
		if(isMobile.any())
		{
			$('.scroll-wrapper.site-search-results').css('top', '110px');
		}
		else{
			$('.scroll-wrapper.site-search-results').css('top', '120px');
		}	
		$.ajax({
				url: 'https://thai360.info/api/get-hots-real-estates',
				data:{
						lang: cultureKey,
						currency: $('#currency-select .select-active').attr('data-currency')
					},
				beforeSend: function(){
				searchResults.html('<svg version="1.1" id="loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
									   width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">\
									  <path opacity="0.5" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946\
										s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634\
										c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>\
									  <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0\
										C22.32,8.481,24.301,9.057,26.013,10.047z">\
										<animateTransform attributeType="xml"\
										  attributeName="transform"\
										  type="rotate"\
										  from="0 20 20"\
										  to="360 20 20"\
										  dur="0.5s"\
										  repeatCount="indefinite"/>\
										</path>\
									  </svg>');
				},
				success: function (data){
					var hots = data.hots;
					var items = data.items;
					var parentId = data.parentId;
					searchResults.hide().empty();
					$('.search-logo').append('<svg version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
									viewBox="0 0 60 60" style="enable-background:new 0 0 60 60; fill: rgba(255,0,0, 1);" xml:space="preserve">\
									<polyline class="st0" points="30,30 5.8,30 5.8,5.7 54.2,5.7 54.2,54.3 5.8,54.3 "/>\
									<g>\
									<path class="st1" d="M30,59.8C13.5,59.8,0.2,46.5,0.2,30S13.5,0.3,30,0.3S59.8,13.6,59.8,30S46.4,59.8,30,59.8z M30,2.3\
									C14.6,2.3,2.2,14.7,2.2,30c0,15.3,12.5,27.8,27.8,27.8S57.8,45.4,57.8,30C57.8,14.7,45.3,2.3,30,2.3z"/>\
									</g>\
									<g>\
									<path class="st1" d="M30,58.8H1.2V30c0,0-0.4,11.7,8.3,20.3S30,58.8,30,58.8z"/>\
									<path class="st1" d="M30,59.8H0.2V30.6c0-0.3,0-0.5,0-0.6l2,0v0.4c0,1.9,0.6,11.8,8,19.2c8.3,8.2,19.6,8.3,19.8,8.3V59.8z\
									M2.2,57.8h17.6c-3.5-1.3-7.5-3.4-11-6.8c-3.3-3.3-5.4-6.9-6.6-10.3V57.8z"/>\
									</g>\
								</svg>\
								<i style="background-image: url(/assets/images/category-icons/R_Panel_Icon_Real_Estate.svg);"></i>').css('background-image', '').attr('data-categoryId', '35').attr('data-isfolder', 0);
					$('#search').attr('placeholder', data.search);
					$('.back').attr('data-id', parentId).attr('data-search-id', parentId);
					var $container = searchResults.append('<div class="category-list"></div>').find('div.category-list');
					for (key in hots) {
							var item = hots[key];
								$container.append('<div class="sisea-result estate">\
															<a href="#!p=' + item.itemId + '-' + item.alias + '&lang=' + cultureKey + '" title="'+ item.title +'" style="background-image: url('+ item.squareImg + '?' + randomHash +');" class="object">'
																+ ($.cookie('object_' + item.itemId) ? (item.type == 1 ? '<div class="rent"></div>' : '') + (item.type == 2 ? '<div class="sale"></div>' : '') + (item.type == 3 ? '<div class="sale-rent"></div>' : '') : '<div class="new"></div>') + '<div class="object-id">Id: ' + item.itemId + '</div></a>\
															<div class="object-description">\
															<p class="card-object-location"><i></i>' + item.location + '</p>\
															<p class="card-object-category"><i></i>' + item.category + '</p>'
															+ (item.categoryId == '327-land' ? '' : '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>') +
															'<p class="card-area">' + item.area + ' <span>sq. m.</span></p>'
															+ (item.pool == 0 ? '' : '<p class="card-pool">' + (item.pool == 1 ? 'Private pool' : 'Community pool') + '</p>' ) +
															'<p class="object-sea-view">' + (item.seaView == 'true' ? 'Sea view' : '') + '</p>'
															+ (item.type == 1 ? '<p class="object-price">' + priceToString(item.priceRentMonthly) + ' ' + getCurrencySymbol() + '<text> monthly+</text></p>' : (item.type == 2 ? '<p class="object-price">' + priceToString(item.priceSale) + ' ' + getCurrencySymbol() + '</p>' : (item.type == 3 ? '<p class="second-object-price"><i>Rent: </i>' + priceToString(item.priceRentMonthly) + ' ' + getCurrencySymbol() + '</p><p class="object-price"><i>Sale: </i>' + priceToString(item.priceSale) + ' ' + getCurrencySymbol() + '</p>': ''))) +
															'</div>\
															<div class="contact-object-btn"><img src="/assets/images/object_contact_icon.svg"/><span>Contact</span></div>\
															<div class="favorite-object-btn"><img src="/assets/images/favorites_icon.svg"/><span>Favorite</span></div>\
									</div>');
									$.cookie('object_' + item.itemId, true, {expires: 300, path: '/'});
									};					
					searchResults.fadeIn('500');
				}
	});
	}
	function OnCategorySearch(category, categoryId, isFolder, title){
		if(categoryId == 35){
			GetHotRealEstates();
			//OnShowFilters();
		}
		else{
		$('.parent-category').remove();
		$('.absolute, .filters, .filters-body').hide();
		$('.filters-body').removeClass('active');
		var searchResults = $('.site-search-results .search-content');
		var cultureKey = $('html').attr('lang');
		var url = '';
				if(!isFolder)
				{
					url = 'https://thai360.info/api/objects';
				}
				else{
					url = 'https://thai360.info/api/categories';					
				}	  
			$.ajax({
				url: url,
				data:{
						parents: category,
						categoryId: categoryId,					
						lang: cultureKey,
						pagetitle: title,						
						bedrooms: $('input[name="beds"]:checked').val(),
						peoples: $('input[name="peoples"]:checked').val(),
						currency: $('#currency-select .select-active').attr('data-currency')
					},
				beforeSend: function(){
				searchResults.html('<svg version="1.1" id="loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
									   width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">\
									  <path opacity="0.5" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946\
										s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634\
										c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>\
									  <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0\
										C22.32,8.481,24.301,9.057,26.013,10.047z">\
										<animateTransform attributeType="xml"\
										  attributeName="transform"\
										  type="rotate"\
										  from="0 20 20"\
										  to="360 20 20"\
										  dur="0.5s"\
										  repeatCount="indefinite"/>\
										</path>\
									  </svg>');
				},
				success: function (data){
					var items = data.items;
					var hots = data.hots;
					var parentId = data.parentId;
					var parentCategory = data.parentCategory;
					searchResults.hide().empty();
					$('#search').attr('placeholder', data.search);
					var baseUrl = '/' + cultureKey + '/';
					if (cultureKey == 'en')
					{
						baseUrl = '/';
					}

					$('.back').attr('data-id', parentId).attr('data-search-id', parentCategory);
					if(categoryId != 1220){
						$('.absolute').show();
					}
					if(isMobile.any())
					{						
						$('.search-panel-header').show();
						$('.scroll-wrapper.site-search-results').css('top', '100px');
					}
					else{
						$('.search-panel-header').show();
						$('.scroll-wrapper.site-search-results').css('top', '180px');
					}
					if(data.parentId != 0)
						{
							$('.sisea-search-form').append('<div class="parent-category" data-isRealEstate="' + data.isRealEstate + '" data-id="' + categoryId + '" data-category="' + category + '" data-description="'+ data.parentDescription +'" data-url="'+ data.parentUrl +'" data-image="'+ data.parentImage +'">\
							<svg version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
											  viewBox="0 0 60 60" style="enable-background:new 0 0 60 60; fill:' + data.parentBorderColor + ';" xml:space="preserve">\
											<polyline class="st0" points="30,30 5.8,30 5.8,5.7 54.2,5.7 54.2,54.3 5.8,54.3 "/>\
											<g>\
											 <path class="st1" d="M30,59.8C13.5,59.8,0.2,46.5,0.2,30S13.5,0.3,30,0.3S59.8,13.6,59.8,30S46.4,59.8,30,59.8z M30,2.3\
											  C14.6,2.3,2.2,14.7,2.2,30c0,15.3,12.5,27.8,27.8,27.8S57.8,45.4,57.8,30C57.8,14.7,45.3,2.3,30,2.3z"/>\
											</g>\
											<g>\
											 <path class="st1" d="M30,58.8H1.2V30c0,0-0.4,11.7,8.3,20.3S30,58.8,30,58.8z"/>\
											 <path class="st1" d="M30,59.8H0.2V30.6c0-0.3,0-0.5,0-0.6l2,0v0.4c0,1.9,0.6,11.8,8,19.2c8.3,8.2,19.6,8.3,19.8,8.3V59.8z\
											   M2.2,57.8h17.6c-3.5-1.3-7.5-3.4-11-6.8c-3.3-3.3-5.4-6.9-6.6-10.3V57.8z"/>\
											</g>\
										</svg>\
							<i style="background-image: url(' + data.parentIcon +');"></i>' + data.parentTitle + '</div>');
						}
						else{
							if(isMobile.any())
							{
							$('.scroll-wrapper.site-search-results').css('top', '75px');
						}
						else{
							$('.scroll-wrapper.site-search-results').css('top', '160px');
						}							
					}
					if (!isFolder){
						$('.search-logo').attr('data-categoryid', category).attr('data-isfolder', 0);
						var $container = searchResults.append('<div class="category-list"></div>').find('div.category-list');					
							for (key in items) {
							var item = items[key];
								$container.append('<div class="sisea-result slide offset">\
														<a href="#!p=' + item.itemId + '-' + item.alias + '&lang=' + cultureKey + '" title="'+ item.title +'" style="background-image: url('+ item.image +');" class="object">'
															+ ($.cookie('object_' + item.itemId) ? '' : '<div class="new"></div>') + item.longtitle +
														'</a>\
							</div>')};						
					}
					else{
						$('.search-logo').attr('data-categoryid', category).attr('data-isfolder', 1);
						var $container = searchResults.append('<ul class="category-list"></ul>').find('ul');						
							for (key in items) {
							var item = items[key];
								$container.append('<li class="' + item.catClass + '">\
											<a data-id="' + item.itemId + '" data-search-id="'+ item.searchId +'" title="' + item.title + '">\
												<span>\
													<i style="background-image: url(' + (categoryId == 1220 ? item.icon : item.image) +');"></i>\
												</span>\
												<p>' + item.title + '</p>\
											</a>\
										</li>');
							}						
					}
					searchResults.fadeIn('500');
				}
			});
		}		
	}
	function OnLoadObjects(category, offset){
		var cultureKey = $('html').attr('lang');
		var searchResults = $('.site-search-results .search-content .category-list');
		var url = 'https://thai360.info/api/loading-objects';
		var currency = $('#currency-select .select-active').attr('data-currency');
		var districts = getDistrictArray();
		var rentType = parseInt($('.radio-btns .select-list input:checked').val());
		var categoryId = $('#type-select .select-active').attr('data-categoryId');
		var type = $('.radio-btns input[name="type"]:checked').val();
		var isFilter =  parseInt($('.search-logo').attr('data-isfilter'));
		priceMin = $('#priceMin').text();
		priceMax = $('#priceMax').text();
		if(category == 35){
			if(isFilter){
				url = 'https://thai360.info/api/get-real-estate-objects';
			}else{
				url = 'https://thai360.info/api/get-all-real-estates';
			}			
		}
			$.ajax({
				url: url,
				data:{						
						category: category,					
						lang: cultureKey,
						offset: offset,
						categoryId: categoryId,
						type: type,
						rentType: rentType,
						currency: currency,
						bedroomsMin: $( "#slider-beds" ).slider( "values", 0),
						bedroomsMax: $( "#slider-beds" ).slider( "values", 1),
						districts: districts
					},
				beforeSend: function(){
				searchResults.append('<svg class="object-loads" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="background: none;"><g transform="translate(20 50)">\
									<circle cx="0" cy="0" r="6" fill="#ffffff" transform="scale(0.572192 0.572192)">\
									  <animateTransform attributeName="transform" type="scale" begin="-0.375s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>\
									</circle>\
									</g><g transform="translate(40 50)">\
									<circle cx="0" cy="0" r="6" fill="#ffffff" transform="scale(0.224255 0.224255)">\
									  <animateTransform attributeName="transform" type="scale" begin="-0.25s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>\
									</circle>\
									</g><g transform="translate(60 50)">\
									<circle cx="0" cy="0" r="6" fill="#ffffff" transform="scale(0.00676722 0.00676722)">\
									  <animateTransform attributeName="transform" type="scale" begin="-0.125s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>\
									</circle>\
									</g><g transform="translate(80 50)">\
									<circle cx="0" cy="0" r="6" fill="#ffffff" transform="scale(0.115136 0.115136)">\
									  <animateTransform attributeName="transform" type="scale" begin="0s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>\
									</circle>\
									</g></svg>');
				},
				success: function (data){
						var items = data.items;
						var priceNowMin = $( "#slider-range" ).slider( "values", 0 );
						var priceNowMax = $( "#slider-range" ).slider( "values", 1 );
						if(category == 35){
							if(isFilter){
								if(offset >= 10){
								if(type == 1)
								{							
									for (key in items) {
										var item = items[key];
										if(rentType == 1 && categoryId != '327-land'){
												if(parseInt(item.priceRentDaily) >= priceNowMin && parseInt(item.priceRentDaily) <= priceNowMax && parseInt(item.priceRentDaily) != 0){
											searchResults.append('<div class="sisea-result estate offset">\
																	<a href="#!p=' + item.itemId + '-' + item.alias + '&lang=' + cultureKey + '" title="'+ item.title +'" style="background-image: url('+ item.squareImg + '?' + randomHash + ');" class="object">'
																		+ ($.cookie('object_' + item.itemId) ? (item.type == 1 ? '<div class="rent"></div>' : '') + (item.type == 3 ? '<div class="sale-rent"></div>' : '') : '<div class="new"></div>') +  '<div class="object-id">Id: ' + item.itemId + '</div></a>\
																	<div class="object-description">\
																	<p class="card-object-location"><i></i>' + item.location + '</p>\
																	<p class="card-object-category"><i></i>' + item.category + '</p>'
																	+ (item.categoryId != '327-land' ? '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>' : '') +
																	'<p class="card-area">' + item.area + ' <span>sq. m.</span></p>'
																	+ (item.pool == 0 ? '' : '<p class="card-pool">' + (item.pool == 1 ? 'Private pool' : 'Community pool') + '</p>' ) +
																	'<p class="object-sea-view">' + (item.seaView == 'true' ? 'Sea view' : '') + '</p>'
																	+ (item.type == 3 ? '<p class="second-object-price"><i>Rent: </i>' + priceToString(item.priceRentDaily) + ' ' + getCurrencySymbol() + '</p><p class="object-price"><i>Sale: </i>' + priceToString(item.priceSale) + ' ' + getCurrencySymbol() + '</p>' : '<p class="object-price">' + priceToString(item.priceRentDaily) + ' ' + getCurrencySymbol() + '</p>') + '</div>\
																	<div class="contact-object-btn"><img src="/assets/images/object_contact_icon.svg"/><span>Contact</span></div>\
																	<div class="favorite-object-btn"><img src="/assets/images/favorites_icon.svg"/><span>Favorite</span></div>\
											</div>')};
								}
								else{
									if(parseInt(item.priceRentMonthly) >= priceNowMin && parseInt(item.priceRentMonthly) <= priceNowMax && parseInt(item.priceRentMonthly) != 0){
									searchResults.append('<div class="sisea-result estate offset">\
															<a href="#!p=' + item.itemId + '-' + item.alias + '&lang=' + cultureKey + '" title="'+ item.title +'" style="background-image: url('+ item.squareImg + '?' + randomHash +');" class="object">'
																+ ($.cookie('object_' + item.itemId) ? (item.type == 1 ? '<div class="rent"></div>' : '') + (item.type == 3 ? '<div class="sale-rent"></div>' : '') : '<div class="new"></div>') +  '<div class="object-id">Id: ' + item.itemId + '</div></a>\
															<div class="object-description">\
															<p class="card-object-location"><i></i>' + item.location + '</p>\
															<p class="card-object-category"><i></i>' + item.category + '</p>'
															+ (item.categoryId != '327-land' ? '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>' : '') +
															'<p class="card-area">' + item.area + ' <span>sq. m.</span></p>'
															+ (item.pool == 0 ? '' : '<p class="card-pool">' + (item.pool == 1 ? 'Private pool' : 'Community pool') + '</p>' ) +
															'<p class="object-sea-view">' + (item.seaView == 'true' ? 'Sea view' : '') + '</p>'
															+ (item.type == 3 ? '<p class="second-object-price"><i>Rent: </i>' + priceToString(item.priceRentMonthly) + ' ' + getCurrencySymbol() + '</p><p class="object-price"><i>Sale: </i>' + priceToString(item.priceSale) + ' ' + getCurrencySymbol() + '</p>' : '<p class="object-price">' + priceToString(item.priceRentMonthly) + ' ' + getCurrencySymbol() + '<text> monthly+</text></p>') + '</div>\
															<div class="contact-object-btn"><img src="/assets/images/object_contact_icon.svg"/><span>Contact</span></div>\
															<div class="favorite-object-btn"><img src="/assets/images/favorites_icon.svg"/><span>Favorite</span></div>\
									</div>')};
								}
								$.cookie('object_' + item.itemId, true, {expires: 300, path: '/'});
								}
							}
							else{								
								for (key in items) {
								var item = items[key];
								if(parseInt(item.priceSale) >= priceNowMin && parseInt(item.priceSale) <= priceNowMax){
									searchResults.append('<div class="sisea-result estate offset">\
															<a href="#!p=' + item.itemId + '-' + item.alias + '&lang=' + cultureKey + '" title="'+ item.title +'" style="background-image: url('+ item.squareImg + '?' + randomHash +');" class="object">'
															+ ($.cookie('object_' + item.itemId) ? (item.type == 2 ? '<div class="sale"></div>' : '') + (item.type == 3 ? '<div class="sale-rent"></div>' : '') : '<div class="new"></div>') + '<div class="object-id">Id: ' + item.itemId + '</div></a>\
															<div class="object-description">\
															<p class="card-object-location"><i></i>' + item.location + '</p>\
															<p class="card-object-category"><i></i>' + item.category + '</p>'
															+ (item.categoryId != '327-land' ? '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>' : '') +
															'<p class="card-area">' + item.area + ' <span>sq. m.</span></p>'
															+ (item.pool == 0 ? '' : '<p class="card-pool">' + (item.pool == 1 ? 'Private pool' : 'Community pool') + '</p>' ) +
															'<p class="object-sea-view">' + (item.seaView == 'true' ? 'Sea view' : '') + '</p>'
															+ (item.type == 3 ? '<p class="second-object-price"><i>Rent: </i>' + priceToString(item.priceRentMonthly) + ' ' + getCurrencySymbol() + '</p><p class="object-price"><i>Sale: </i>' + priceToString(item.priceSale) + ' ' + getCurrencySymbol() + '</p>' : '<p class="object-price">' + priceToString(item.priceSale) + ' ' + getCurrencySymbol() + '</p>') +
															'</div>\
															<div class="contact-object-btn"><img src="/assets/images/object_contact_icon.svg"/><span>Contact</span></div>\
															<div class="favorite-object-btn"><img src="/assets/images/favorites_icon.svg"/><span>Favorite</span></div>\
									</div>');
									$.cookie('object_' + item.itemId, true, {expires: 300, path: '/'});
									};
								}
							}
							}
							}else{
								for (key in items) {
									var item = items[key];
									searchResults.append('<div class="sisea-result estate offset">\
															<a href="#!p=' + item.itemId + '-' + item.alias + '&lang=' + cultureKey + '" title="'+ item.title +'" style="background-image: url('+ item.squareImg + '?' + randomHash +');" class="object">'
																+ ($.cookie('object_' + item.itemId) ? (item.type == 1 ? '<div class="rent"></div>' : '') + (item.type == 2 ? '<div class="sale"></div>' : '') + (item.type == 3 ? '<div class="sale-rent"></div>' : '') : '<div class="new"></div>') + '<div class="object-id">Id: ' + item.itemId + '</div></a>\
															<div class="object-description">\
															<p class="card-object-location"><i></i>' + item.location + '</p>\
															<p class="card-object-category"><i></i>' + item.category + '</p>'
															+ (item.categoryId == '327-land' ? '' : '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>') +
															'<p class="card-area">' + item.area + ' <span>sq. m.</span></p>'
															+ (item.pool == 0 ? '' : '<p class="card-pool">' + (item.pool == 1 ? 'Private pool' : 'Community pool') + '</p>' ) +
															'<p class="object-sea-view">' + (item.seaView == 'true' ? 'Sea view' : '') + '</p>'
															+ (item.type == 1 ? '<p class="object-price">' + priceToString(item.priceRentMonthly) + ' ' + getCurrencySymbol() + '</p>' : (item.type == 2 ? '<p class="object-price">' + priceToString(item.priceSale) + ' ' + getCurrencySymbol() + '</p>' : (item.type == 3 ? '<p class="second-object-price"><i>Rent: </i>' + priceToString(item.priceRentMonthly) + ' ' + getCurrencySymbol() + '</p><p class="object-price"><i>Sale: </i>' + priceToString(item.priceSale) + ' ' + getCurrencySymbol() + '</p>': ''))) +
															'</div>\
															<div class="contact-object-btn"><img src="/assets/images/object_contact_icon.svg"/><span>Contact</span></div>\
															<div class="favorite-object-btn"><img src="/assets/images/favorites_icon.svg"/><span>Favorite</span></div>\
									</div>');
									$.cookie('object_' + item.itemId, true, {expires: 300, path: '/'});
									};
							}
						}
						else{
							if(offset >= 10){
								for (key in items){
									var item = items[key];
									searchResults.append('<div class="sisea-result slide offset">\
															<a href="#!p=' + item.itemId + '-' + item.alias + '&lang=' + cultureKey + '" title="'+ item.title +'" style="background-image: url('+ item.image +');" class="object">'
																+ ($.cookie('object_' + item.itemId) ? '' : '<div class="new"></div>') + item.longtitle +
															'</a>\
								</div>')};
							}
						}
						if(items.length >= 1){
							isLoaded = true;
						}
						else{
							isLoaded = false;
						}
						searchResults.find('svg').remove();
				}
			});
	}
	
	function OnAjaxSearch(title){
		$('.parent-category').remove();
		var searchResults = $('.site-search-results  .search-content');
		var cultureKey = $('html').attr('lang');	
		var	categoryId = $('.search-logo').attr('data-categoryid');
		var isFolder = parseInt($('.search-logo').attr('data-isfolder'));
		if(isFolder == 1){
			categoryId = 0;
		}
			$.ajax({
				url: 'https://thai360.info/api/search',
				data:{
						lang: cultureKey,
						title: title,
						categoryId: categoryId
					},
				beforeSend: function(){
				searchResults.html('<svg version="1.1" id="loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
									   width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">\
									  <path opacity="0.5" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946\
										s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634\
										c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>\
									  <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0\
										C22.32,8.481,24.301,9.057,26.013,10.047z">\
										<animateTransform attributeType="xml"\
										  attributeName="transform"\
										  type="rotate"\
										  from="0 20 20"\
										  to="360 20 20"\
										  dur="0.5s"\
										  repeatCount="indefinite"/>\
										</path>\
									  </svg>');
				},
				success: function (data){
					var categories = data.categories;
					var firstLevel = data.firstLevel;
					var secondLevel = data.secondLevel;
					var thirdLevel = data.thirdLevel;
					searchResults.hide().empty();
					$('#search').attr('placeholder', data.search);					
					$('.back').attr('data-id', 1220).attr('data-search-id', 1220);
					var $container = searchResults.append('<div class="category-list"></div>').find('div.category-list');						
						for (key in categories) {
                        var item = categories[key];
                            $container.append('<div class="sisea-result slide ' + item.catClass + '">\
													<a data-id="' + item.itemId + '" data-search-id="'+ item.searchId +'" title="'+ item.title +'" class="search-category" style="background-image: url('+ item.image + '?' + randomHash +');"><p>\
													<span>\
															<i style="background-image: url(' + (item.icon) +');"></i>\
													</span>\
													<svg version="1.1" id="Layer_2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
														  viewBox="0 0 60 60" style="enable-background:new 0 0 60 60; fill:' + item.borderColor + ';" xml:space="preserve">\
														<polyline class="st0" points="30,30 5.8,30 5.8,5.7 54.2,5.7 54.2,54.3 5.8,54.3 "/>\
														<g>\
														 <path class="st1" d="M30,59.8C13.5,59.8,0.2,46.5,0.2,30S13.5,0.3,30,0.3S59.8,13.6,59.8,30S46.4,59.8,30,59.8z M30,2.3\
														  C14.6,2.3,2.2,14.7,2.2,30c0,15.3,12.5,27.8,27.8,27.8S57.8,45.4,57.8,30C57.8,14.7,45.3,2.3,30,2.3z"/>\
														</g>\
														<g>\
														 <path class="st1" d="M30,58.8H1.2V30c0,0-0.4,11.7,8.3,20.3S30,58.8,30,58.8z"/>\
														 <path class="st1" d="M30,59.8H0.2V30.6c0-0.3,0-0.5,0-0.6l2,0v0.4c0,1.9,0.6,11.8,8,19.2c8.3,8.2,19.6,8.3,19.8,8.3V59.8z\
														   M2.2,57.8h17.6c-3.5-1.3-7.5-3.4-11-6.8c-3.3-3.3-5.4-6.9-6.6-10.3V57.8z"/>\
														</g>\
													</svg>' + item.longtitle + '</p></a>\
									</div>')};
						for (key in firstLevel) {
                        var item = firstLevel[key];
						if(categoryId == 35){
							$container.append('<div class="sisea-result estate">\
															<a href="#!p=' + item.itemId + '-' + item.alias + '&lang=' + cultureKey + '" title="'+ item.title +'" style="background-image: url('+ item.squareImg + '?' + randomHash +');" class="object">'
																+ ($.cookie('object_' + item.itemId) ? (item.type == 1 ? '<div class="rent"></div>' : '') + (item.type == 2 ? '<div class="sale"></div>' : '') + (item.type == 3 ? '<div class="sale-rent"></div>' : '') : '<div class="new"></div>') + '<div class="object-id">Id: ' + item.itemId + '</div></a>\
															<div class="object-description">\
															<p class="card-object-location"><i></i>' + item.location + '</p>\
															<p class="card-object-category"><i></i>' + item.category + '</p>'
															+ (item.categoryId == '327-land' ? '' : '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>') +
															'<p class="card-area">' + item.area + ' <span>sq. m.</span></p>'
															+ (item.pool == 0 ? '' : '<p class="card-pool">' + (item.pool == 1 ? 'Private pool' : 'Community pool') + '</p>' ) +
															'<p class="object-sea-view">' + (item.seaView == 'true' ? 'Sea view' : '') + '</p>'
															+ (item.type == 1 ? '<p class="object-price">' + priceToString(item.priceRentMonthly) + ' ' + getCurrencySymbol() + '</p>' : (item.type == 2 ? '<p class="object-price">' + priceToString(item.priceSale) + ' ' + getCurrencySymbol() + '</p>' : (item.type == 3 ? '<p class="second-object-price"><i>Rent: </i>' + priceToString(item.priceRentMonthly) + ' ' + getCurrencySymbol() + '</p><p class="object-price"><i>Sale: </i>' + priceToString(item.priceSale) + ' ' + getCurrencySymbol() + '</p>': ''))) +
															'</div>\
															<div class="contact-object-btn"><img src="/assets/images/object_contact_icon.svg"/><span>Contact</span></div>\
															<div class="favorite-object-btn"><img src="/assets/images/favorites_icon.svg"/><span>Favorite</span></div>\
									</div>');
						}
						else{
							$container.append('<div class="sisea-result slide">\
													<a href="#!p=' + item.itemId + '-' + item.alias + '&lang=' + cultureKey + '" title="'+ item.title +'" style="background-image: url('+ item.image + '?' + randomHash + ');" class="object">'
														+ ($.cookie('object_' + item.itemId) ? '' : '<div class="new"></div>') + item.longtitle +
													'</a>\
							</div>');
						}
                            };
						for (key in secondLevel) {
                        var item = secondLevel[key];
                            						if(categoryId == 35){
							$container.append('<div class="sisea-result estate">\
															<a href="#!p=' + item.itemId + '-' + item.alias + '&lang=' + cultureKey + '" title="'+ item.title +'" style="background-image: url('+ item.squareImg + '?' + randomHash +');" class="object">'
																+ ($.cookie('object_' + item.itemId) ? (item.type == 1 ? '<div class="rent"></div>' : '') + (item.type == 2 ? '<div class="sale"></div>' : '') + (item.type == 3 ? '<div class="sale-rent"></div>' : '') : '<div class="new"></div>') + '<div class="object-id">Id: ' + item.itemId + '</div></a>\
															<div class="object-description">\
															<p class="card-object-location"><i></i>' + item.location + '</p>\
															<p class="card-object-category"><i></i>' + item.category + '</p>'
															+ (item.categoryId == '327-land' ? '' : '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>') +
															'<p class="card-area">' + item.area + ' <span>sq. m.</span></p>'
															+ (item.pool == 0 ? '' : '<p class="card-pool">' + (item.pool == 1 ? 'Private pool' : 'Community pool') + '</p>' ) +
															'<p class="object-sea-view">' + (item.seaView == 'true' ? 'Sea view' : '') + '</p>'
															+ (item.type == 1 ? '<p class="object-price">' + priceToString(item.priceRentMonthly) + ' ' + getCurrencySymbol() + '</p>' : (item.type == 2 ? '<p class="object-price">' + priceToString(item.priceSale) + ' ' + getCurrencySymbol() + '</p>' : (item.type == 3 ? '<p class="second-object-price"><i>Rent: </i>' + priceToString(item.priceRentMonthly) + ' ' + getCurrencySymbol() + '<text> monthly+</text></p><p class="object-price"><i>Sale: </i>' + priceToString(item.priceSale) + ' ' + getCurrencySymbol() + '</p>': ''))) +
															'</div>\
															<div class="contact-object-btn"><img src="/assets/images/object_contact_icon.svg"/><span>Contact</span></div>\
															<div class="favorite-object-btn"><img src="/assets/images/favorites_icon.svg"/><span>Favorite</span></div>\
									</div>');
						}
						else{
							$container.append('<div class="sisea-result slide">\
													<a href="#!p=' + item.itemId + '-' + item.alias + '&lang=' + cultureKey + '" title="'+ item.title +'" style="background-image: url('+ item.image + '?' + randomHash + ');" class="object">'
														+ ($.cookie('object_' + item.itemId) ? '' : '<div class="new"></div>') + item.longtitle +
													'</a>\
							</div>');
						}};
						for (key in thirdLevel) {
                        var item = thirdLevel[key];
                            						if(categoryId == 35){
							$container.append('<div class="sisea-result estate">\
															<a href="#!p=' + item.itemId + '-' + item.alias + '&lang=' + cultureKey + '" title="'+ item.title +'" style="background-image: url('+ item.squareImg + '?' + randomHash +');" class="object">'
																+ ($.cookie('object_' + item.itemId) ? (item.type == 1 ? '<div class="rent"></div>' : '') + (item.type == 2 ? '<div class="sale"></div>' : '') + (item.type == 3 ? '<div class="sale-rent"></div>' : '') : '<div class="new"></div>') + '<div class="object-id">Id: ' + item.itemId + '</div></a>\
															<div class="object-description">\
															<p class="card-object-location"><i></i>' + item.location + '</p>\
															<p class="card-object-category"><i></i>' + item.category + '</p>'
															+ (item.categoryId == '327-land' ? '' : '<p class="card-bedrooms">' + item.bedrooms + '<i></i></p>') +
															'<p class="card-area">' + item.area + ' <span>sq. m.</span></p>'
															+ (item.pool == 0 ? '' : '<p class="card-pool">' + (item.pool == 1 ? 'Private pool' : 'Community pool') + '</p>' ) +
															'<p class="object-sea-view">' + (item.seaView == 'true' ? 'Sea view' : '') + '</p>'
															+ (item.type == 1 ? '<p class="object-price">' + priceToString(item.priceRentMonthly) + ' ' + getCurrencySymbol() + '<text> monthly+</text></p>' : (item.type == 2 ? '<p class="object-price">' + priceToString(item.priceSale) + ' ' + getCurrencySymbol() + '</p>' : (item.type == 3 ? '<p class="second-object-price"><i>Rent: </i>' + priceToString(item.priceRentMonthly) + ' ' + getCurrencySymbol() + '</p><p class="object-price"><i>Sale: </i>' + priceToString(item.priceSale) + ' ' + getCurrencySymbol() + '</p>': ''))) +
															'</div>\
															<div class="contact-object-btn"><img src="/assets/images/object_contact_icon.svg"/><span>Contact</span></div>\
															<div class="favorite-object-btn"><img src="/assets/images/favorites_icon.svg"/><span>Favorite</span></div>\
									</div>');
						}
						else{
							$container.append('<div class="sisea-result slide">\
													<a href="#!p=' + item.itemId + '-' + item.alias + '&lang=' + cultureKey + '" title="'+ item.title +'" style="background-image: url('+ item.image + '?' + randomHash + ');" class="object">'
														+ ($.cookie('object_' + item.itemId) ? '' : '<div class="new"></div>') + item.longtitle +
													'</a>\
							</div>');
						}};
					searchResults.fadeIn('500');
				}
			});
	}
	function getPano(itemId){
		panoIsLoad = false;
		$('#day-night-btn').empty().hide();
		$('#video-object-btn, #about-object-btn').empty();
		var krpano = document.getElementById("krpanoSWFObject");
	    var cultureKey = $('html').attr('lang');
		var panoContainer = $('#tourDIV');
		var videoContainer = $('.video-modal-content');
		var panoLocation = $('#panoLocation');
		$.ajax({
				url: 'https://thai360.info/api/get-object',
				data:{
						cultureKey: cultureKey,
						itemId: itemId,
						lang: cultureKey
					},				
				beforeSend: function(){

				},
				success: function (data){								
					panoUrl = data.panoUrl + 'indexdata/index_messages_en.xml';
					panoVrXml = data.panoUrl + 'indexdata/index_vr.xml';
					panoSwf = data.panoUrl + 'indexdata/index.swf';					
					crossPanoUrl = data.panoUrl;
					mapTitle = data.longtitle;
					if ((!firstLoad) && !$.cookie('video_' + data.id) && (data.video != null || data.video != ''||  data.video != undefined) && data.video) {							
							setTimeout(function(){
								$('#video-object-btn').append('<div class="animation-border"></div>\
										<div class="animation-background"></div>\
										<div class="btn-animation"></div>');
							}, 10000);
					}
					if((!firstLoad) && (!$.cookie('object_info'))){
						$('#about-object-btn').append('<div class="animation-border"></div>\
													<div class="animation-background"></div>\
													<div class="btn-animation"></div>');
					}
					if(!$.cookie('day_night_' + itemId)){
						$('#day-night-btn').append('<div class="animation-border"></div>\
													<div class="animation-background"></div>\
													<div class="btn-animation"></div>');
					}
					if(!$.cookie('object_' + itemId)){
						$.cookie('object_' + itemId, true, {expires: 300,path: '/'});
					}
					//$('#search').attr('placeholder', data.search);
					$('.search-logo, .logo').attr('href', data.parentPoint + '&lang=' + cultureKey);
					$('title').text(data.longtitle + ' - ' + siteName);
					$("meta[name='title']").attr('content', data.longtitle + ' - ' + siteName);
					$("meta[name='description']").attr('content', data.description);
					$("meta[property='og:title']").attr('content', data.longtitle + ' - ' + siteName);
					$("meta[property='og:description']").attr('content', data.description);
					$("meta[property='og:image']").attr('content', data.image);
					$("link[rel='image_src']").attr('href', data.image);
					$("link[rel='alternate']").attr('hreflang', cultureKey).attr('href', window.location.href);
					$("meta[property='og:image:secure_url']").attr('content', data.image);
					$("meta[name='twitter:image']").attr('content', data.image);
					$("meta[property='og:url']").attr('content', window.location.href);
					$('#home-btn').attr('data-link', data.mainPanoLink);
					//$('#skype-btn').attr('data-href', window.location.href);
					if (isVRModeRequested()){
						accessWebVr();
					}
					else
					{
						accessStdVr();
					}			
					if((data.video != null || data.video != ''||  data.video != undefined) && data.video)
					{					
						videoContainer.empty().append('<div class="embed-responsive embed-responsive-16by9" id="video-iframe">\
							<iframe class="embed-responsive-item modal-iframe"  frameborder="0" data-link="https://www.youtube.com/embed/' + data.video + '" allowfullscreen></iframe>\
						</div>');
					}
					else{
						videoContainer.empty().append('<img class="img-responsive" src="/assets/images/video_coming_soon.png" style="display: none;" />');
					}
					if(data.template == 3)
					{
						panoLocation.empty().html('Thailand <br><span>'+ data.title + '</span>');
					}
					else{
						panoLocation.empty().html('Thailand <br><span>'+ data.location + '<br>' + data.title + '</span>');
					}					
					}
				}).done(function(){
					panoIsLoad = true;					
					ga('create', 'UA-90941148-2', 'auto', 'myAnalytics');					
					ga('myAnalytics.send', 'pageview',location.pathname+location.search+location.hash);
					ga('myAnalytics.remove');
				});		
	}

	function getPanoByCategoryId(itemId){
		panoIsLoad = false;
		$('#day-night-btn').empty().hide();
		$('#video-object-btn, #about-object-btn').empty();
		var krpano = document.getElementById("krpanoSWFObject");
	    var cultureKey = $('html').attr('lang');
		var panoContainer = $('#tourDIV');
		var videoContainer = $('.video-modal-content');
		var panoLocation = $('#panoLocation');
		var categoryId = getUrlVars()["c"];
		$.ajax({
				url: 'https://thai360.info/api/get-object-by-category',
				data:{						
						itemId: itemId,
						lang: cultureKey,
						categoryId: categoryId
					},				
				beforeSend: function(){

				},
				success: function (data){
					var itemObject = data.item;
					var isFolder = data.isfolder;
					for (key in itemObject) {
                        var item = itemObject[key];
					panoUrl = item.panoUrl + 'indexdata/index_messages_en.xml';
					panoVrXml = item.panoUrl + 'indexdata/index_vr.xml';
					panoSwf = item.panoUrl + 'indexdata/index.swf';					
					crossPanoUrl = item.panoUrl;
					mapTitle = item.longtitle;
					if ((!firstLoad) && !$.cookie('video_' + item.id) && (item.video != null || item.video != ''||  item.video != undefined) && item.video) {							
							setTimeout(function(){
								$('#video-object-btn').append('<div class="animation-border"></div>\
										<div class="animation-background"></div>\
										<div class="btn-animation"></div>');
							}, 10000);
					}
					if((!firstLoad) && (!$.cookie('object_info'))){
						$('#about-object-btn').append('<div class="animation-border"></div>\
													<div class="animation-background"></div>\
													<div class="btn-animation"></div>');
					}
					if(!$.cookie('day_night_' + itemId)){
						$('#day-night-btn').append('<div class="animation-border"></div>\
													<div class="animation-background"></div>\
													<div class="btn-animation"></div>');
					}
					if(!$.cookie('object_' + itemId)){
						$.cookie('object_' + itemId, true, {expires: 300,path: '/'});
					}
					//$('#search').attr('placeholder', item.search);
					$('.search-logo, .logo').attr('href', item.parentPoint + '&lang=' + cultureKey);
					$('title').text(item.longtitle + ' - ' + siteName);
					$("meta[name='title']").attr('content', item.longtitle + ' - ' + siteName);
					$("meta[name='description']").attr('content', item.description);
					$("meta[property='og:title']").attr('content', item.longtitle + ' - ' + siteName);
					$("meta[property='og:description']").attr('content', item.description);
					$("meta[property='og:image']").attr('content', item.image);
					$("link[rel='image_src']").attr('href', item.image);
					$("link[rel='alternate']").attr('hreflang', cultureKey).attr('href', window.location.href);
					$("meta[property='og:image:secure_url']").attr('content', item.image);
					$("meta[name='twitter:image']").attr('content', item.image);
					$("meta[property='og:url']").attr('content', window.location.href);
					//$('#skype-btn').attr('data-href', window.location.href);
					if (isVRModeRequested()){
						accessWebVr();
					}
					else
					{
						accessStdVr();
					}			
					if((item.video != null || item.video != ''||  item.video != undefined) && item.video)
					{					
						videoContainer.empty().append('<div class="embed-responsive embed-responsive-16by9" id="video-iframe">\
							<iframe class="embed-responsive-item modal-iframe"  frameborder="0" data-link="https://www.youtube.com/embed/' + item.video + '" allowfullscreen></iframe>\
						</div>');
					}
					else{
						videoContainer.empty().append('<img class="img-responsive" src="/assets/images/video_coming_soon.png" style="display: none;" />');
					}
					if(data.template == 3)
					{
						panoLocation.empty().html('Thailand <br><span>'+ item.title + '</span>');
					}
					else{
						panoLocation.empty().html('Thailand <br><span>'+ item.location + '<br>' + item.title + '</span>');
					}					
					}
					if($('#search-panel').hasClass('open'))
					{
						OnCategorySearch(categoryId, itemId, isFolder, '');
					}
					else{
						if(!pageLoad){
							OnCategorySearch(categoryId, itemId, isFolder, '');
						}
						setTimeout(function(){
							OnSearchPanelShow(false, categoryId, itemId, isFolder);
						}, 1000)
					}

				}				
				}).done(function(){
					panoIsLoad = true;					
					ga('create', 'UA-90941148-2', 'auto', 'myAnalytics');					
					ga('myAnalytics.send', 'pageview',location.pathname+location.search+location.hash);
					ga('myAnalytics.remove');
				});		
	}
	
	function getAboutInfo(isContacts){
		$('#info-btn').removeClass('open');
		OnShowHideControls(true, false);		
	    var cultureKey = $('html').attr('lang');		
		var aboutContent = $('.about-content');
		$('.about-modal-window').animate({left: 0}, 500);
		$('.about-modal-window').queue(function() {				
			$('.close-modal-btn').fadeIn(500);			
			$('.about-modal-window').dequeue();
		});		
		$.ajax({
				url: 'https://thai360.info/api/get-about-info',
				data:{						
						lang: cultureKey
					},
				beforeSend: function(){
				$('.about-content').append('<svg version="1.1" id="loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
									   width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">\
									  <path opacity="0.5" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946\
										s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634\
										c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>\
									  <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0\
										C22.32,8.481,24.301,9.057,26.013,10.047z">\
										<animateTransform attributeType="xml"\
										  attributeName="transform"\
										  type="rotate"\
										  from="0 20 20"\
										  to="360 20 20"\
										  dur="0.5s"\
										  repeatCount="indefinite"/>\
										</path>\
									  </svg>');

				},
				success: function (data){
					var pages = data.pages;
					var news = data.news;
					var aboutTitleLong = data.aboutTitleLong;
					var counter = 1;
					$('.about-content svg').remove();
				if(!isContacts){
					aboutContent.prepend('<h2 id="aboutTitleLong">' + aboutTitleLong + '</h2>');
					for (key in pages) {
                        var page = pages[key];
						if(page.alias == 'project-news-i-updates'){					
							aboutContent.append('<div class="about-block block-' + counter + '">\
								<h3>' + page.title + '</h3>\
								<div class="about-content-body"></div>\
							</div>');
							for (key in news){
								var itemNew = news[key];
								aboutContent.find('.block-2 .about-content-body').append('<div class="item-new" data-id="'+ itemNew.itemId +'">\
									<h4>' + itemNew.title + '</h4>\
									<div class="new-image" style="background-image: url(' + itemNew.imageUrl + ');"></div>\
									<p>' + itemNew.introtext + '</p>\
								</div>');
							}
						}
						else
						{							
							aboutContent.append('<div class="about-block block-' + counter + '">\
								<h3>' + page.title + '</h3>\
								<div class="about-content-body">' + page.content + '</div>\
							</div>');
							if(counter == 3){
								aboutContent.find('.block-3 .about-content-body').append('<div id="ourLocation"><iframe class="location-iframe" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d505704.9120408311!2d98.332807!3d8.0175282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x76a7f73bce63d3c0!2sthai360+Co.+LTD.!5e0!3m2!1sru!2s!4v1496828995883" frameborder="0" style="border:0"></iframe><div>');
							}							
						}
					counter++;
					};
					aboutContent.append(data.privacyPolicy);
				}
				else{
					$('#aboutTitleLong').remove();
					for (key in pages) {
                        var page = pages[key];
						if(page.alias == 'we-are-located-at'){
							aboutContent.append('<div class="our-location">\
								<h3>' + page.title + '</h3>\
								<div class="about-content-body">' + page.content + '</div>\
								<div id="ourLocation"><iframe class="location-iframe" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d505704.9120408311!2d98.332807!3d8.0175282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x76a7f73bce63d3c0!2sthai360+Co.+LTD.!5e0!3m2!1sru!2s!4v1496828995883" frameborder="0" style="border:0"></iframe><div>\
							</div>');
						}
					}
				}
					aboutContent.fadeIn('500');					
				}
			}).done(function(){
				panoIsLoad = false;
				loadMap = true;
			});
	}	
	function getAboutObjectInfo(){		
		OnShowHideControls(true, false);		
	    var cultureKey = $('html').attr('lang');		
		var aboutContent = $('.about-object-content');
		var panoId = getUrlVars()["p"];		
		if(typeof panoId === 'undefined' || panoId === null )
		{
			panoId = 1;
		}
		else{
			panoId = getUrlVars()["p"].split('-')[0];
		}
		$('.about-object-modal').animate({right: 0}, 500);
		$('.about-object-modal').queue(function() {				
			$('.about-object-close-btn').fadeIn(500);			
			$('.about-object-modal').dequeue();
		});	
		$.ajax({
				url: 'https://thai360.info/api/get-about-object-info',
				data:{
						contextKey: cultureKey,
						itemId: panoId,
						lang: cultureKey
					},
				beforeSend: function(){
				$('.about-object-content').append('<svg version="1.1" id="loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
									   width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">\
									  <path opacity="0.5" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946\
										s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634\
										c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>\
									  <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0\
										C22.32,8.481,24.301,9.057,26.013,10.047z">\
										<animateTransform attributeType="xml"\
										  attributeName="transform"\
										  type="rotate"\
										  from="0 20 20"\
										  to="360 20 20"\
										  dur="0.5s"\
										  repeatCount="indefinite"/>\
										</path>\
									  </svg>');

				},
				success: function (data){
					var album = data.gallery;					
					var news = data.news;					
					var counter = 4;
					aboutContent.show();
					$('#aboutObjectTitle').text(data.title);
					//$('.object-description').text(data.description);
					$('.object-content').html(data.content).find('table').wrap('<div class="table-responsive"></div>');
					if((data.mapLink != null || data.mapLink != ''||  data.mapLink != undefined) && data.mapLink)
					{
						$('.object-content').after('<div class="object-location"><iframe class="location-iframe" src="' + data.mapLink + '" frameborder="0" style="border:0"></iframe></div>');
					}
					$('.about-object-content svg').remove();
					if((data.video != null || data.video != ''||  data.video != undefined) && data.video)
					{
						$('.owl-main').append('<a class="owl-video" href="https://www.youtube.com/watch?v='+ data.video +'"></a>');
						$('.owl-navigation').append('<div class="gallery-item video-item" style="background-image: url(https://img.youtube.com/vi/' + data.video + '/hqdefault.jpg);"></div>');
					}
					$('.owl-main').append('<a class="fancybox" data-fancybox="gallery" href="' + data.image + '" title="' + data.title + '"><div class="gallery-item" style="background-image: url(' + data.image + ');"></div></a>');
					$('.owl-navigation').append('<div class="gallery-item" style="background-image: url(' + data.image + ');"></div>');
					if(album){
						for (key in album) {
							var galleryItem = album[key];
							$('.owl-main').append('<a class="fancybox" data-fancybox="gallery" href="' + galleryItem.url + '" title="' + data.title + '"><div class="gallery-item" style="background-image: url(' + galleryItem.url + ');"></div></a>');						
							$('.owl-navigation').append('<div class="gallery-item" style="background-image: url(' + galleryItem.thumbUrl + ');"></div>');
						};
					}
										
					if(news.length >= 1 && !data.isCity){
						$('#gallery-block, #news-block').addClass('col-sm-6');
						$('#news-block').empty().append('<h3>'+ data.newsTitle +'</h3>');
						for (key in news){
							var itemNew = news[key];
							$('#news-block').append('<div class="item-new" data-id="'+ itemNew.itemId +'">\
								<h4>' + itemNew.title + '</h4>\
								<img src="'+ itemNew.imageUrl +'" />\
								<p>' + itemNew.introtext + '</p>\
							</div>');
						}
					}
					else{
						$('#gallery-block').addClass('col-sm-6 col-sm-offset-3');
					}
				
				}
			}).done(function(){
				panoIsLoad = false;
				loadGallery = true;
			});
	}
	function getInnerContent(){
		$this = $(this);
		var cultureKey = $('html').attr('lang');
		var innerContainer = $('.inner-content');
		itemId = $this.attr('data-id');
		$('.inner-content-close-btn, .inner-content').fadeIn(500);
		$('.inner-modal').animate({left: 0, top:0, bottom: 0, right: 0}, 500);
		$.ajax({
				url: 'https://thai360.info/api/get-default-object',
				data:{						
						itemId: itemId,
						lang: cultureKey
					},
				beforeSend: function(){

				},
				success: function (data){
					if($this.hasClass('item-new')){
						if(data.imageUrl){
							innerContainer.append('<h2>' + data.title + '</h2><img src="'+ data.imageUrl +'" class="main-new-img"/><div class="main-new-body">'+ data.content +'</div>');
						}
						else{
							innerContainer.append('<h2>' + data.title + '</h2><div class="main-new-body">'+ data.content +'</div>');
						}
					}
					else{
						innerContainer.append('<h2>' + data.title + '</h2><div>'+ data.content +'</div>');
					}
					
		}}).done(function(){			
					panoIsLoad = false;							
				});		
	}
	function getHelpInfo(dataId){
		var cultureKey = $('html').attr('lang');
		OnShowHideControls(true, false);		
		var helpContainer = $('.help-content');		
		$('.help-content-close-btn, .help-content').fadeIn(500);
		$('.help-modal').animate({left: 0}, 500);
		$.ajax({
			url: 'https://thai360.info/api/get-default-object',
			data:{						
				itemId: dataId,
				lang: cultureKey
			},
			beforeSend: function(){
				helpContainer.append('<svg version="1.1" id="loader" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\
									   width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">\
									  <path opacity="0.5" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946\
										s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634\
										c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>\
									  <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0\
										C22.32,8.481,24.301,9.057,26.013,10.047z">\
										<animateTransform attributeType="xml"\
										  attributeName="transform"\
										  type="rotate"\
										  from="0 20 20"\
										  to="360 20 20"\
										  dur="0.5s"\
										  repeatCount="indefinite"/>\
										</path>\
									  </svg>');
			},
			success: function (data){
				$('.help-content svg').remove();
				helpContainer.append('<h2>' + data.title + '</h2><div>'+ data.content +'</div>');				
					
		}}).done(function(){			
				panoIsLoad = false;							
		});		
	}
	function OnCloseModal(){
		$('.close-modal-btn, .about-content, #aboutTitleLong').hide();
		$('.about-content').empty();
		$('.about-modal-window').animate({left: '100%'}, 500);
		OnShowHideControls(false, false);
	}
	function OnCloseSearchPanel(isAnimate){
				OnCloseCategoryShareBtns();
				$('.wrap_mW._show_1e._orinationLeft_3O').show();
				close = false;
				clearTimeout(timeout);
				$('#search').val('');				
				//$('.search-content').empty();				
				$('#category-search-btn, #map-search-btn').removeClass('open').removeClass('active');
				$('#mobile-category-search-btn, #mobile-map-search-btn').removeClass('active');
				OnShowHideControls(false, true);
				if(isAnimate){
					$('#search-panel').css("left", "auto");
					$('#search-panel').animate({width: 0}, 500);
				}
				else{					
					$('#search-panel').css({"width":"0px"});
					setTimeout(function(){
						$('#search-panel').css({"left":"auto"});
					}, 500);
				}							
				//$('.search-panel-header, .filters, .sisea-search-form, .site-search-results, .search-panel-footer, .search-panel-footer, .filters-body').hide();
				$('.search-panel-content').hide();
				//$('.filters-body').removeClass('active');
				$('#search-panel').removeClass('open');
	}
	function OnCloseVideoModal(){
		var panoWindow = document.getElementById('krpanoSWFObject');
		panoWindow.call('showpanospotsaction');
		$('.video-modal-close-btn, .video-modal-content, .video-modal-window img').hide();		
		$('.video-modal-window').animate({left: '100%'}, 500);
		$('#panoDIV').show();
		OnShowHideControls(false, false);
		$('#video-iframe iframe').attr('src', '');
	}
	function OnCloseInnerModal(){
		$('.inner-content-close-btn, .inner-content').hide();
		$('.inner-content').empty();
		$('.inner-modal').animate({left: '50%', right: '50%', top: '50%', bottom: '50%'}, 500);
	}
	function OnCloseAboutObjectModal(){
		owl.trigger('destroy.owl');
		owl2.trigger('destroy.owl');
		$('.object-location').remove();
		$('#news-block').empty().removeClass('col-sm-6');
		$('#gallery-block').removeClass('col-sm-6').removeClass('col-sm-offset-3');
		$('.about-object-close-btn, .about-object-content').hide();		
		$('.about-object-modal').animate({right: '100%'}, 500);		
		OnShowHideControls(false, false);
		$('.owl-main, .owl-navigation').html('').removeClass('owl-carousel').removeClass('owl-theme').removeClass('owl-loaded');		
	}
	function OnCloseHelpModal(){
		$('.help-content').empty();		
		$('.help-content-close-btn, .help-content').hide();		
		$('.help-modal').animate({left: '100%'}, 500);		
		OnShowHideControls(false, false);	
	}
	function getUrlVars()
	{
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('#') + 2).split('&');
		for(var i = 0; i < hashes.length; i++)
		{
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	}
	$(window).on('hashchange', function() {
		var categoryHashId = getUrlVars()["c"];
		var languageKey = getUrlVars()["lang"];
		if(languageKey != '' || languageKey != 'undefined' || languageKey != null)
		{			
			$('html').attr('lang', languageKey);
		}
		
		if(typeof categoryHashId === 'undefined' || categoryHashId === null )
		 {			
			getPano(getUrlVars()["p"].split('-')[0]);
		}
		else{
			categoryHashId = getUrlVars()["c"].split('-')[0];
			getPanoByCategoryId(categoryHashId);		
		}  		
				
	});
	$(document).ajaxComplete(function(){		
		if(panoIsLoad){
			xmlParser(panoVrXml);
			panoIsLoad	= false;		
		}
		if(loadGallery){
			setTimeout(function(){
			galleryOwlInit();			
			loadGallery = false;
			}, 1000);
		}
		if($('#mobile-map-search-btn').hasClass('active')){
			initMap();
		}
		jQuery('.site-search-results').not('.scroll-wrapper').on("scroll", function(){
			var category = $('.search-logo').attr('data-categoryId');
			var isFolder = parseInt($('.search-logo').attr('data-isfolder'));
			var scrollBodyHeight = parseInt($('.scroll-wrapper.site-search-results.scrollbar-inner .scroll-y .scroll-element_outer').height());
			var scrollBarHeight = parseInt($('.scroll-wrapper.site-search-results.scrollbar-inner .scroll-y .scroll-bar').height());
			var scrollBarPosition = parseInt($('.scroll-wrapper.site-search-results.scrollbar-inner .scroll-y .scroll-bar').css('top'));
			var offset = getObjectsCount();			
			if(isFolder == 0 && scrollBarPosition > (scrollBarHeight - 50) && (scrollBarHeight + scrollBarPosition) == scrollBodyHeight && isLoaded){
				isLoaded = false;
				OnLoadObjects(category, offset)
			}
			console.log(offset);
		});
	});
	function xmlParser(xmlUrl) {		
		$.ajax({
        type: "GET",
        url: xmlUrl,
        dataType: "xml",
        success: function (xml) {
			var xmlLatitude = $(xml).find("scene").attr('latitude');
			var xmlLongitude = $(xml).find("scene").attr('longitude');			
			$('#search-panel').attr('data-latitude', xmlLatitude).attr('data-longitude', xmlLongitude);			
		}					
    }).done(function(){
				panoIsLoad = false;
			});	
	}

	function OnDocumentReady() {
		getPrices(priceSaleMin, priceSaleMax, getPricesByCurrency(100000));
		getBeds(0, 15);
		setInterval(function(){
			updateTime();
		}, 60000)
		if (!$.cookie('first_visit')) {
		setTimeout(function(){
			$('#category-search-btn').append('<div class="animation-border"></div>\
											<div class="animation-background"></div>\
											<div class="btn-animation"></div>');
		}, 10000);
		}
		if (!$.cookie('using_cookies')) {
		setTimeout(function(){
			$('.cookies').slideDown();
		}, 5000);
		}
		if(window.location.search.length == 0)
		{
		if(window.location.hash == '' || typeof window.location.hash == 'undefined' || window.location.hash == null)
		{
			window.location.hash = '#!p=26-phuket&s=pano12&lang=en';
			contextKey = 'en';
		}
		else{
			var panoId = getUrlVars()["p"];
			var categoryId = getUrlVars()["c"];			
			if(typeof panoId === 'undefined' || panoId === null )
			{			
				panoId = 1;
			}
			else{
				panoId = getUrlVars()["p"].split('-')[0];			
			}
			if(typeof categoryId === 'undefined' || categoryId === null )
			{			
				getPano(panoId);
				if(panoId.split('-')[0] == 26){
					searchTimeout();
				}
			}
			else{
				categoryId = getUrlVars()["c"].split('-')[0];
				getPanoByCategoryId(categoryId);		
			}
		}
		}
		else{
			var urlNow = window.location.href;
			window.location.href = urlNow.replace('?_escaped_fragment_=','#!');
		}
		contextKey = getUrlVars()["lang"];
		if(contextKey == '' || contextKey == 'undefined' || contextKey == null)
		{			
			$('html').attr('lang', 'en');
			$('.en').hide();
		}
		else{
			$('html').attr('lang', contextKey);
			$('.lang-links a').each(function(){
				var $this = $(this);
				if($this.attr('data-culture') == contextKey){
					$this.addClass('active');
					$('.language-active').text($this.text());
				}
			});
		}
		
		CSSLoad('https://thai360.info/assets/css/jquery-ui.min.css');
		CSSLoad('https://thai360.info/assets/css/jquery.fancybox.css');
		CSSLoad('https://thai360.info/assets/css/owl.carousel.css');
		CSSLoad('https://thai360.info/assets/css/bootstrap.css');
		CSSLoad('https://thai360.info/assets/css/jquery.scrollbar.css');
		CSSLoad('https://thai360.info/assets/css/main.css?' + getRandom());
		getTime();	
		$('[data-fancybox]').fancybox({			
			infobar : false
		});
		$(document).on('click', '.day-night-btn', function(){
			ga('send', 'event', 'Button', 'Click', 'Day Night');
			var panoWindow = document.getElementById('krpanoSWFObject');
			var dataId = getUrlVars()["p"].split('-')[0];
			if (!$.cookie('day_night_' + dataId)) {
				setCookie('day_night_' + dataId, true, { path: '/', expires: 3600});
				$('#day-night-btn').empty();
			}					
			 panoWindow.call('SwitchPano();');			 
		});		
		$(document).on('click', '#fullScreen-btn', fullScreen);
		$(document).on('click', '#hotspots-btn', hotspotsHideShow);
		$(document).on('click', '#giroscope-btn', giroscopeOnOff);
		$(document).on('click', '#terms-of-use, #privacy-policy, .item-new', getInnerContent);


		$(document).on('click', '#sale-input', function(){
			$('.radio-btns .select-list').hide();
			$('.priceFilter h4').text('Price:');
			getPrices(getPricesByCurrency(priceSaleMin), getPricesByCurrency(priceSaleMax), getPricesByCurrency(100000));
		});
		$(document).on('click', '#daily-rent', function(){
			$('.radio-btns .select-list').hide();
			$('.priceFilter h4').text('Daily Rate:');
			getPrices(getPricesByCurrency(priceRentDailyMin), getPricesByCurrency(priceRentDailyMax), getPricesByCurrency(100));
		});
		$(document).on('click', '#monthly-rent', function(){
			$('.radio-btns .select-list').hide();
			$('.priceFilter h4').text('Monthly+ Rate:');
			getPrices(getPricesByCurrency(priceRentMonthlyMin), getPricesByCurrency(priceRentMonthlyMax), getPricesByCurrency(500));
		});
		$(document).on('click', '#currency-select .select-active', function(){
			if($('#currency-select ul').hasClass('open')){
				$('#currency-select ul').hide().removeClass('open');
			}
			else{
				$('#currency-select ul').show().addClass('open');
			}
		});
		$(document).on('click', '#currency-select li a', function(){
			var $this = $(this);
			$('#currency-select li').show();
			$('#currency-select .select-active').html($this.attr('data-currency') + '<i></i>').attr('data-currency', $this.attr('data-currency'));
			$('.price-currency').text($this.attr('data-currency'));
			$this.parent('li').hide();
			$('#currency-select ul').hide().removeClass('open');
			if($('#sale-input').hasClass('active'))
			{
				getPrices(getPricesByCurrency(parseInt(priceSaleMin)), getPricesByCurrency(parseInt(priceSaleMax)), getPricesByCurrency(100000))
			}
			if($('.radio-btns .select label').hasClass('active') && $('#daily-rent input').prop('checked'))
			{
				getPrices(getPricesByCurrency(parseInt(priceRentDailyMin)), getPricesByCurrency(parseInt(priceRentDailyMax)), getPricesByCurrency(100))
			}
			if($('.radio-btns .select label').hasClass('active') && $('#monthly-rent input').prop('checked'))
			{
				getPrices(getPricesByCurrency(parseInt(priceRentMonthlyMin)), getPricesByCurrency(parseInt(priceRentMonthlyMax)), getPricesByCurrency(500))
			}
		});
		$(document).on('click', '#type-select .select-active', function(){
			if($('#type-select ul').hasClass('open')){
				$('#type-select ul').hide().removeClass('open');
			}
			else{
				$('#type-select ul').show().addClass('open');
			}
		});
		$(document).on('click', '#type-select li a', function(){
			var $this = $(this);
			$('#type-select li').show();
			$('#type-select .select-active').html($this.text() + '<i></i>').attr('data-categoryId', $this.attr('data-categoryId'));			
			$this.parent('li').hide();
			$('#type-select ul').hide().removeClass('open');
			if($this.attr('data-categoryid') == '327-land')
			{
				$('.roomsFilter').hide();
				getBeds(0, 15);
			}
			else{
				$('.roomsFilter').show();
			}
		});
		$(document).on('click', '.contact-object-btn', function(){
			$('.search-panel-close-btn').click();
			$('#about-btn').click();
		});
		$(document).on('click', '.show-filters', OnShowFilters);
		$(document).on('click', '.filter-search-btn', OnFilterSearch);
		$(document).on('click', '.roomsFilter label', function(e){
			e.preventDefault();
			var $this = $(this);
			$('.roomsFilter input').each(function(){
				if(parseInt($this.find('input').val()) >= parseInt($(this).val()))
				{
					$(this).parent('label').addClass('active');
				}
				else{
					$(this).parent('label').removeClass('active');
				}
			});
			$('.roomsFilter input:checked').prop('checked', false);		
			$this.find('input').prop('checked', true);			
		});
		$(".roomsFilter label")
		  .mouseover(function() {			
			var $this = $(this);
			$('.roomsFilter input').each(function(){
				if(parseInt($this.find('input').val()) >= parseInt($(this).val()))
				{
					$(this).parent('label').addClass('room-hover');
				}
				else{
					$(this).parent('label').addClass('room-no-hover');
				}
			});
			if(parseInt($this.find('input').val()) == 50){
				$('.roomsFilter h5 i').text(8 + '+');
			}
			else{
				$('.roomsFilter h5 i').text($this.find('input').val());
			}			
		}).mouseout(function() {
			var $this = $(this);
			$('.roomsFilter label').removeClass('room-hover').removeClass('room-no-hover');
			if(parseInt($('.roomsFilter input:checked').val()) == 50){
				$('.roomsFilter h5 i').text(8 + '+');
			}
			else{
				$('.roomsFilter h5 i').text($('.roomsFilter input:checked').val());
			}
			
		  });
		$(document).on('click', '.filters-body, .filters-body div, .filters-body span, .filters-body p, .filters-body label, .filters-body input', function(){
			$('.select-list').hide().removeClass('open');
		});
		$(document).on('click', '.filter-clear-btn', function(e){
			e.preventDefault();
			var clearType = $('#type-select ul li:first-child a');
			getPrices(getPricesByCurrency(priceSaleMin), getPricesByCurrency(priceSaleMax), getPricesByCurrency(100000));
			$('#type-select .select-active').html(clearType.text() +'<i></i>').attr('data-categoryid', clearType.attr('data-categoryid'));
			$('#type-select .select-list li').show();
			$('#type-select .select-list li:first-child').hide();
			$('.districts input').prop('checked', false);			
			$( "#priceMin" ).html(priceToString($( "#slider-range" ).slider("values", 0)));
			$( "#priceMax" ).html(priceToString($( "#slider-range" ).slider("values", 1)));
			$('.roomsFilter label, .districts label').removeClass('active');
			$('.roomsFilter h5 i').text(0);
			$('#clearInput').prop('checked', true);
			getBeds(0, 15);
			$('.radio-btns .select label').removeClass('active');
			$('.radio-btns .select-list').hide();
			$('#sale-input').addClass('active');
			$('#sale-input input').prop('checked', true);
			$('.roomsFilter').show();
		});
		$(document).on('click', '.districts p label input', function(){
			var $this = $(this);
			if($this.parent('label').hasClass('active')){
				$this.parent('label').removeClass('active');
			}
			else{
				$this.parent('label').addClass('active');
			}
		});
		$(document).on('click', '.radio-btns p label', function(){
			var $this = $(this);
			$('.radio-btns p label').removeClass('active');
			$this.addClass('active');
		});
		$(document).on('click', '#rent-input', function(){
			$('.radio-btns .select-list').show();
		});
		$(document).on('click', '.radio-btns ul li a', function(){
			
		});
		if (/(iphone|ipod|ipad|android|iemobile|webos|fennec|blackberry|kindle|series60|playbook|opera\smini|opera\smobi|opera\stablet|symbianos|palmsource|palmos|blazer|windows\sce|windows\sphone|wp7|bolt|doris|dorothy|gobrowser|iris|maemo|minimo|netfront|semc-browser|skyfire|teashark|teleca|uzardweb|avantgo|docomo|kddi|ddipocket|polaris|eudoraweb|opwv|plink|plucker|pie|xiino|benq|playbook|bb|cricket|dell|bb10|nintendo|up.browser|playstation|tear|mib|obigo|midp|mobile|tablet)/.test(navigator.userAgent.toLowerCase())) {
			if(/iphone/.test(navigator.userAgent.toLowerCase()) && window.self === window.top){
						jQuery('body').css('height', '100.18%'); 
			}
			// add event listener on resize event (for orientation change)
			if(window.addEventListener) {
				window.addEventListener("load", readDeviceOrientation);
				window.addEventListener("resize", readDeviceOrientation);
				window.addEventListener("orientationchange", readDeviceOrientation);
			}
			//initial execution
			setTimeout(function(){readDeviceOrientation();},10);
		}
		$(document).on('click', '.cookie-close-btn', function(){
			$('.cookies').slideUp();
		});
		$(document).on('click', '.ok-btn', function(){
			$.cookie('using_cookies', true, {expires: 300,path: '/'});
			$('.cookies').slideUp();			
		});	
		$(document).on('click', '#video-object-btn', function(){
			var panoWindow = document.getElementById('krpanoSWFObject');
			panoWindow.call('hidepanospotsaction');
			panoWindow.call('stopallsounds');
			var dataId = getUrlVars()["p"].split('-')[0];
			if (!$.cookie('video_' + dataId)) {
				setCookie('video_' + dataId, true, { path: '/', expires: 3600});
				$('#video-object-btn').empty();
			}
			OnCloseSearchPanel(false);
			var videoLink = $('#video-iframe iframe').attr('data-link');
			$('#video-iframe iframe').attr('src', videoLink);
			$('.video-modal-close-btn, .video-modal-content, .video-modal-window img').fadeIn(1000);			
			$('#panoDIV').hide();
			OnShowHideControls(true, false);
			$('.video-modal-window').animate({left: '0'}, 500);
		});
		$(document).on('click', '#about-object-btn', function() {
			if (!$.cookie('object_info')) {
				$.cookie('object_info', true, {expires: 300,path: '/'});
				$('#about-object-btn').empty();
			}
			OnCloseSearchPanel(false);
			getAboutObjectInfo();
		});
		$(document).on('click', '.mobile-category-search-btn, .mobile-map-search-btn', function(){
			var $this = $(this);
			$('.search-content').empty();
			setTimeout(function(){
			if($this.attr('id') == 'mobile-map-search-btn')
			{
				$('#mobile-category-search-btn, #mobile-map-search-btn').removeClass('active');
				$this.addClass('active');
				appendMap();
				$('.back').attr('data-id', 1220).attr('data-search-id', 1220);
			}
			else{
				$('#mobile-category-search-btn, #mobile-map-search-btn').removeClass('active');
				$this.addClass('active');
				OnCategorySearch(1220, 1220, true, '', false);
			}
			}, 500);
		});		
		$(document).on('click', '.video-modal-close-btn', OnCloseVideoModal);
		$(document).on('click', '.help-content-close-btn', OnCloseVideoModal);
		$(document).on('click', '.inner-content-close-btn', OnCloseInnerModal);
		$(document).on('click', '.about-object-close-btn', OnCloseAboutObjectModal);
		$(document).on('click', '.help-content-close-btn', OnCloseHelpModal);
		$(document).on('click', '.lang-links li a', OnLanguageChange);
		$(document).on('click', '#about-full-btn', function(){
			OnCloseSearchPanel(false);
			getAboutInfo(false);			
		});
		$(document).on('click', '.estate-back-btn', function(){
			$('.show-filters, .sisea-search-form, .search-panel-footer, .site-search-results').show();
			$('.filters-body, .hide-filters').hide().removeClass('active');
		});
		$(document).on('click', '#about-btn', function(){
			OnCloseSearchPanel(false);
			if(device.mobile()){
				$('.button_1O').click();
			}
			else{
				getAboutInfo(true);
			}			
		});
		$(document).on('click', '#help-btn', function(){
			OnCloseSearchPanel(false);
			getHelpInfo($(this).attr('data-id'));
		});
		$(document).on('click', '.close-modal-btn', OnCloseModal);
		
		$('.scrollbar-inner').scrollbar();
		$('#about-body').scrollbar();
		$('#inner-body').scrollbar();
		$('#about-object-body').scrollbar();
		$('#help-body').scrollbar();
		
		$(document).on('click','.category-list a', function(){
			var $this = $(this);
			var lastLevel = false;
			if(!$this.parent().hasClass('last-level'))
				{
					lastLevel = true;
				}
			if($this.hasClass('object'))
				{
					$this.find('.new').remove();
					if(isMobile.any()){
						OnCloseSearchPanel(true);
					}					
				}
				else
				{
					OnCategorySearch($this.data('search-id'), $this.data('id'), lastLevel, '', false);
				}
		});
		$(document).on('click','.search-logo', function(){
			OnCloseSearchPanel(true);
		});
		$(document).on('click','#settings-btn', function(){
			var blockHeight = 240;
			if(window.innerHeight <= 480)
			{
				blockHeight = 220;
			}
				if($(this).hasClass('open'))
				{
					$(this).removeClass('open');
					$(".pano-control").animate({height: '0px'},500).hide('500');					
				}
				else{
					$(this).addClass('open');				
					$(".pano-control").css('display', 'inline-block').animate({height: blockHeight + 'px'},500);					
				}
		});
		$(document).on('click','#share-btn', function(){			
				if($(this).hasClass('open'))
				{
					$(this).removeClass('open');
					$(".control-share-btns").animate({height: '0px'},500).hide('500');					
				}
				else{
					$(this).addClass('open');				
					$(".control-share-btns").show().animate({height: 86 + 'px'},500);					
				}
		});
		$(document).on('click','#category-share-btn', function(){			
				if($(this).hasClass('open'))
				{
					$(this).removeClass('open');
					$(".category-control-share-btns").animate({height: '0px'},500).hide('500');					
				}
				else{
					$(this).addClass('open');				
					$(".category-control-share-btns").show().animate({height: 86 + 'px'},500);					
				}
		});
		$(document).on('click', '#category-control-share-btns a', OnCloseCategoryShareBtns);		
		$(document).on('click', '#control-share-btns a', OnCloseShareBtns);
		$(document).on('click','.back', function(){
			$('#search').val('');
			isLoaded = true;
			$('.search-logo').attr('data-isfilter', 0);
			var $this = $(this);
			var lastLevel = false;
			if($(this).attr('data-id') == '0')
			{
				OnCloseSearchPanel(true);
			}
			else{
				if(parseInt($this.attr('data-id')) == 1220)
				{
					GetParentCategories();
				}
				else
				{
					OnCategorySearch($this.attr('data-search-id'), $this.attr('data-id'), true, '', false);
				}				
			}
			$('.search-logo').empty().css('background-image', 'url(/assets/images/logo360.svg)');
		});			
		 // Кнопка 
    	$(document).on('click', '#search-btn', OnSearch);
    	// Живой поиск
    	$(document).on('keyup', '.sisea-search-form input', OnSearch);
		$(document).on('click', '.search-panel-close-btn', function(){
			OnCloseSearchPanel(true);
		});
		$(document).on('click', '#category-search-btn', function(){
			OnSearchPanelShow(false, 1220, 1220, true);	
		});
		$(document).on('click', '#map-search-btn', function(){
			OnSearchPanelShow(true, 1220, 1220, true);
		});
		if(isMobile.any()){			
            $("body").append($('<link rel="stylesheet" href="https://thai360.info/assets/css/mobile_adaptation.css" type="text/css" />'));			
		}
		if(device.mobile()){
			$('#about-btn').append('<div class="animation-border red"></div><div class="animation-background red"></div><div class="btn-animation red"></div><div class="phone-icon"></div>');
		}
		/*------------ Переключатель языка -------------*/
		$(document).on('click', '.language-active', function(){
			
			if($(this).hasClass('open'))
			{
				$(this).removeClass('open');
				$(".lang-links").hide("slide", { direction: "right" }, 500);
				$('.absolute, .hub-logo').show();
			}
			else{
				$(this).addClass('open');				
				$(".lang-links").show("slide", { direction: "right" }, 500); 
				$('.absolute, .hub-logo').hide();
			}
		});		
		$(document).on('click', '.audio-block', function(){
			var playBtn = $(this).find('i');
			if(playBtn.hasClass('play'))
			{
				playBtn.removeClass('play');
				document.getElementById('audio-player').pause();
			}
			else{
				playBtn.addClass('play');
				document.getElementById('audio-player').play();
			}
		});
		$(document).on('click', '.inner-modal a', function(){
			OnCloseInnerModal();
			OnCloseModal();
		})
		if(isMobile.any())
		{		
			$('#giroscope-btn').parents('li').show();
		//var categoryBtn = document.getElementById('category-search-btn');		
		var panel = document.getElementById('search-panel');
		var startPoint={};
		var nowPoint;
		var ldelay;
			/*Search Panel swipe*/
		panel.addEventListener('touchstart', function(event) {
			//event.preventDefault();
			//event.stopPropagation();
			if(!$('#filters-body').hasClass('active'))
			{
			startPoint.x=event.changedTouches[0].pageX;
			startPoint.y=event.changedTouches[0].pageY;
			ldelay=new Date(); 
			}
			}, false);
			/*Ловим движение пальцем*/
			panel.addEventListener('touchmove', function(event) {
			if(!$('#filters-body').hasClass('active'))
			{
			var otk={};
			nowPoint=event.changedTouches[0];
			otk.x=nowPoint.pageX-startPoint.x;
			otk.y=nowPoint.pageY-startPoint.y;
			var left = otk.x;
			if(window.innerWidth > 396){
				left = window.innerWidth - (396 - otk.x);
			}
			if(otk.x>0 && Math.abs(otk.x)>Math.abs(otk.y * 5)){
				event.preventDefault();
				event.stopPropagation();
				panel.style.left = left + 'px';
			}
			}			
			}, false);

		/*Ловим отпускание пальца*/
		panel.addEventListener('touchend', function(event) {
		if(!$('#filters-body').hasClass('active'))
		{
		var pdelay=new Date(); 
		nowPoint=event.changedTouches[0];
		var xAbs = Math.abs(startPoint.x - nowPoint.pageX);
		var yAbs = Math.abs(startPoint.y - nowPoint.pageY);
		var left = 0;
		if(window.innerWidth > 396){
			left = window.innerWidth - 396;
		}
		if ((xAbs > 20 || yAbs > 20)) {
			if (xAbs > (yAbs * 5)) {
			if (xAbs > 130){
				if(nowPoint.pageX > startPoint.x){
					$('#search-panel').animate({left: window.innerWidth}, 500);
					$('#search-panel').queue(function() {
					OnCloseSearchPanel(false);			
					$('#search-panel').dequeue();
					});
				}
			}
			else{
				$('#search-panel').animate({left: left}, 500);
			}
			}
			else{
				$('#search-panel').animate({left: left}, 500);
			}
		}
		}
			}, false);			
			// Touch and swipe //
		var categoryBtn = document.getElementById('category-search-btn');		
		var panel = document.getElementById('search-panel');
		var aboutObjectBtn = document.getElementById('about-object-btn');		
		var aboutObjectModal = document.getElementById('about-object-modal');		
		
		var widthInTwo = deviceWidth * 0.3;
		// category-search-btn //

			categoryBtn.addEventListener('touchstart', function(event) {
			if(event.targetTouches.length == 1) {
			var touch=event.targetTouches[0];
			touchOffsetX = touch.pageX - touch.target.offsetLeft;		
			}
			}, true);		
			categoryBtn.addEventListener('touchmove', function(event) {
			if(event.targetTouches.length == 1) {
			var touch = event.targetTouches[0];
			var moveX = touch.pageX-touchOffsetX;
			categoryBtn.style.right = (window.innerWidth - 38 - moveX)  + 'px';

			panel.style.width = (window.innerWidth - 53 - moveX) + 'px';
			}
			}, true);
			categoryBtn.addEventListener('touchend', function(event) {
			if(event.changedTouches.length == 1) {
				var widthNow = parseInt(panel.style.width);
				
				if(widthNow >= 130)
				{
					categoryBtn.style.right = 15 + 'px';
					OnSearchPanelShow(false, 1220, 1220, true);
				}
				else{
					$('#category-search-btn').animate({right: 15}, 500);
					$('#search-panel').animate({width: 0}, 500);
				}		
			}		
			}, true);
		// about-object-btn //
		aboutObjectBtn.addEventListener('touchstart', function(event) {
		if(event.targetTouches.length == 1) {
		var touch=event.targetTouches[0];
		touchOffsetX = touch.pageX - touch.target.offsetLeft;		
		}
		}, true);		
		aboutObjectBtn.addEventListener('touchmove', function(event) {
		if(event.targetTouches.length == 1) {
		var touch = event.targetTouches[0];
		var moveX = touch.pageX-touchOffsetX;
		aboutObjectBtn.style.left = moveX + 'px';

		aboutObjectModal.style.right = (window.innerWidth + 15 - moveX) + 'px';
		}
		}, true);
		aboutObjectBtn.addEventListener('touchend', function(event) {
		if(event.changedTouches.length == 1) {
			var widthNow = parseInt(aboutObjectModal.style.right);
			
			if((window.innerWidth - widthNow) >= 130)
			{
				aboutObjectBtn.style.left = 15 + 'px';
				aboutObjectBtn.click();	
			}
			else{
				$('#about-object-btn').animate({left: 15}, 500);
				$('#about-object-modal').animate({right: '100%'}, 500);
			}		
		}		
		}, true);	

		/*About object swipe*/
		// aboutObjectModal.addEventListener('touchstart', function(event) {

		// startPoint.x=event.changedTouches[0].pageX;
		// startPoint.y=event.changedTouches[0].pageY;
		// ldelay=new Date(); 
		// }, false);

		// aboutObjectModal.addEventListener('touchmove', function(event) {
// );
		// var otk={};
		// nowPoint=event.changedTouches[0];
		// otk.x=nowPoint.pageX-startPoint.x;
		// otk.y=nowPoint.pageY-startPoint.y;
		// var right = otk.x;		
		// if(otk.x<0 && Math.abs(otk.x)>Math.abs(otk.y * 5)){
			// aboutObjectModal.style.right = Math.abs(right) + 'px';
			// aboutObjectModal.style.left = right + 'px';
		// }		
		// }, false);

		// aboutObjectModal.addEventListener('touchend', function(event) {
		// var pdelay=new Date(); 
		// nowPoint=event.changedTouches[0];
		// var xAbs = Math.abs(startPoint.x - nowPoint.pageX);
		// var yAbs = Math.abs(startPoint.y - nowPoint.pageY);
		// var right = '100%';
		// if ((xAbs > 20 || yAbs > 20)) {
			// if (xAbs > (yAbs * 5)) {
			// if (xAbs > 130){
				// if(nowPoint.pageX < startPoint.x){
					// $('#about-object-modal').animate({left: (window.innerWidth * (-1)), right: window.innerWidth}, 500);
					// $('#about-object-modal').queue(function() {
					// OnCloseAboutObjectModal();
					// $('#about-object-modal').css('left', 0);
					// $('#about-object-modal').dequeue();
					// });
				// }
			// }
			// else{
				// $('#about-object-modal').animate({left: 0, right: 0}, 500);
			// }
			// }
			// else{
				// $('#about-object-modal').animate({left: 0, right: 0}, 500);
			// }
		// }
			// }, false);
			
		/*About Us Modal swipe*/
		var aboutUsModal = document.getElementById('about-modal-window');
		aboutUsModal.addEventListener('touchstart', function(event) {
		//event.preventDefault();
		//event.stopPropagation();
		startPoint.x=event.changedTouches[0].pageX;
		startPoint.y=event.changedTouches[0].pageY;
		ldelay=new Date(); 
		}, false);
		/*Ловим движение пальцем*/
		aboutUsModal.addEventListener('touchmove', function(event) {
		//event.preventDefault();
		//event.stopPropagation();
		var otk={};
		nowPoint=event.changedTouches[0];
		otk.x=nowPoint.pageX-startPoint.x;
		otk.y=nowPoint.pageY-startPoint.y;
		var left = otk.x;		
		if(otk.x>0 && Math.abs(otk.x)>Math.abs(otk.y * 5)){
			aboutUsModal.style.right = (left * (-1)) + 'px';
			aboutUsModal.style.left = left + 'px';
		}		
		}, false);
		/*Ловим отпускание пальца*/
		aboutUsModal.addEventListener('touchend', function(event) {
		var pdelay=new Date(); 
		nowPoint=event.changedTouches[0];
		var xAbs = Math.abs(startPoint.x - nowPoint.pageX);
		var yAbs = Math.abs(startPoint.y - nowPoint.pageY);
		var right = '100%';
		if ((xAbs > 20 || yAbs > 20)) {
			if (xAbs > (yAbs * 5)) {
			if (xAbs > 130){
				if(nowPoint.pageX > startPoint.x){
					$('#about-modal-window').animate({right: (window.innerWidth * (-1)), left: window.innerWidth}, 500);
					$('#about-modal-window').queue(function() {
					OnCloseModal();
					$('#about-modal-window').css({right: '0', left: '100%'});
					$('#about-modal-window').dequeue();
					});
				}
			}
			else{
				$('#about-modal-window').animate({left: 0, right: 0}, 500);
			}
			}
			else{
				$('#about-modal-window').animate({left: 0, right: 0}, 500);
			}
		}
			}, false);
			
		/*Video Modal swipe*/
		var videoModal = document.getElementById('video-modal-window');
		videoModal.addEventListener('touchstart', function(event) {
		//event.preventDefault();
		//event.stopPropagation();
		startPoint.x=event.changedTouches[0].pageX;
		startPoint.y=event.changedTouches[0].pageY;
		ldelay=new Date(); 
		}, false);
		/*Ловим движение пальцем*/
		videoModal.addEventListener('touchmove', function(event) {
		//event.preventDefault();
		//event.stopPropagation();
		var otk={};
		nowPoint=event.changedTouches[0];
		otk.x=nowPoint.pageX-startPoint.x;
		otk.y=nowPoint.pageY-startPoint.y;
		var left = otk.x;		
		if(otk.x>0 && Math.abs(otk.x)>Math.abs(otk.y * 5)){
			videoModal.style.right = (left * (-1)) + 'px';
			videoModal.style.left = left + 'px';
		}		
		}, false);
		/*Ловим отпускание пальца*/
		videoModal.addEventListener('touchend', function(event) {
		var pdelay=new Date(); 
		nowPoint=event.changedTouches[0];
		var xAbs = Math.abs(startPoint.x - nowPoint.pageX);
		var yAbs = Math.abs(startPoint.y - nowPoint.pageY);
		var right = '100%';
		if ((xAbs > 20 || yAbs > 20)) {
			if (xAbs > (yAbs * 5)) {
			if (xAbs > 130){
				if(nowPoint.pageX > startPoint.x){
					$('#video-modal-window').animate({right: (window.innerWidth * (-1)), left: window.innerWidth}, 500);
					$('#video-modal-window').queue(function() {
					OnCloseVideoModal();
					$('#video-modal-window').css({right: '0', left: '100%'});
					$('#video-modal-window').dequeue();
					});
				}
			}
			else{
				$('#video-modal-window').animate({left: 0, right: 0}, 500);
			}
			}
			else{
				$('#video-modal-window').animate({left: 0, right: 0}, 500);
			}
		}
			}, false);
			
		/*Help Modal swipe*/
		var helpModal = document.getElementById('help-modal');
		helpModal.addEventListener('touchstart', function(event) {
		//event.preventDefault();
		//event.stopPropagation();
		startPoint.x=event.changedTouches[0].pageX;
		startPoint.y=event.changedTouches[0].pageY;
		ldelay=new Date(); 
		}, false);
		/*Ловим движение пальцем*/
		helpModal.addEventListener('touchmove', function(event) {
		//event.preventDefault();
		//event.stopPropagation();
		var otk={};
		nowPoint=event.changedTouches[0];
		otk.x=nowPoint.pageX-startPoint.x;
		otk.y=nowPoint.pageY-startPoint.y;
		var left = otk.x;		
		if(otk.x>0 && Math.abs(otk.x)>Math.abs(otk.y * 5)){
			helpModal.style.right = (left * (-1)) + 'px';
			helpModal.style.left = left + 'px';
		}		
		}, false);
		/*Ловим отпускание пальца*/
		helpModal.addEventListener('touchend', function(event) {
		var pdelay=new Date(); 
		nowPoint=event.changedTouches[0];
		var xAbs = Math.abs(startPoint.x - nowPoint.pageX);
		var yAbs = Math.abs(startPoint.y - nowPoint.pageY);
		var right = '100%';
		if ((xAbs > 20 || yAbs > 20)) {
			if (xAbs > (yAbs * 5)) {
			if (xAbs > 130){
				if(nowPoint.pageX > startPoint.x){
					$('#help-modal').animate({right: (window.innerWidth * (-1)), left: window.innerWidth}, 500);
					$('#help-modal').queue(function() {
					OnCloseHelpModal();
					$('#help-modal').css({right: '0', left: '100%'});
					$('#help-modal').dequeue();
					});
				}
			}
			else{
				$('#help-modal').animate({left: 0, right: 0}, 500);
			}
			}
			else{
				$('#help-modal').animate({left: 0, right: 0}, 500);
			}
		}
			}, false);

	}		
}	
	
	$(document).ready(OnDocumentReady);
	$(window).load(function(){
		firstLoad = false;
	});
function galleryOwlInit(){	
	owl = $('.owl-main');
	owl2 = $('.owl-navigation');
	owl.owlCarousel({	  
	  nav: false,
	  dots: false,
	  items: 1,
	  video:true
	}).on('changed.owl.carousel', function(event) {
		owl2.trigger('to.owl.carousel', [event.item.index, 300, true]);
		// (Optional) Remove .current class from all items
		owl2.find('.current').removeClass('current');
		// (Optional) Add .current class to current active item
		owl2.find('.owl-item .item').eq(event.item.index).addClass('current');
	});

	/*
	 * Navigation carousel
	 */
	owl2.owlCarousel({	  
	  nav: true,
	  navText: false,
	  dots:true,
	  margin:10,
	  items: 4,
	  video:true
	})
	.on('click', '.owl-item', function(event) {
		owl.trigger('to.owl.carousel', [$(event.target).parents('.owl-item').index(), 0, true]);
	});	
}
function getPrices(min, max, step) {
    $( "#slider-range" ).slider({
      range: true,
      min: min,
      max: max,
	  step: step,
      values: [min, max],
      slide: function( event, ui ) {
        $("#priceMin").html(priceToString(ui.values[0]));
		$("#priceMax").html(priceToString(ui.values[1]));
      }
	});
    $( "#priceMin" ).html(priceToString($( "#slider-range" ).slider( "values", 0 )));
	$( "#priceMax" ).html(priceToString($( "#slider-range" ).slider( "values", 1 )));
};
function getBeds(min, max) {
    $( "#slider-beds" ).slider({
      range: true,
      min: min,
      max: max,
	  step: 1,
      values: [min, max],
      slide: function( event, ui ) {
        $("#bedMin").html(ui.values[0]);
		$("#bedMax").html(ui.values[1]);
      }
	});
    $( "#bedMin" ).html($( "#slider-beds" ).slider( "values", 0 ));
	$( "#bedMax" ).html($( "#slider-beds" ).slider( "values", 1 ));
};
function getPricesByCurrency(value){
	var currency = $('#currency-select .select-active').attr('data-currency');
	var entity;
	switch (currency) {
	  case 'rub':
		entity = value * rubKoef;
		break;
	  case 'eur':
		entity = value * eurKoef;
		break;
	  case 'usd':
		entity = value * usdKoef;
		break;
	  case 'thb':
		entity = value * 1;
		break;
	}
	return Math.round(entity);
}
function getCurrencySymbol(){
	var currency = $('#currency-select .select-active').attr('data-currency');
	var entity;
	switch (currency) {
	  case 'rub':
		entity = '₽';
		break;
	  case 'eur':
		entity = '€';
		break;
	  case 'usd':
		entity = '$';
		break;
	  case 'thb':
		entity = '฿';
		break;
	}
	return entity;
}
function getDistrictArray(){
	var checkedDistricts = [];	
	$('.districts p label input:checked').each(function ()
	{
		checkedDistricts.push('district==' + $(this).val());
	});
	checkedDistricts = checkedDistricts.join(',').replace(',', '||');
	if(checkedDistricts.length < 1){
		checkedDistricts = 0;
	}
	
	return checkedDistricts;
}
function getObjectsCount(){
	var count = 0;
	$('#site-search-results .sisea-result.offset').each(function(){
		count++;
	});
	return count;	
}