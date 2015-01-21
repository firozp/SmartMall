(function(){

	EventList = window.EventList || {};
	EventList.create = EventList.create || function () {   
	};

	EventList.create.prototype = {
		init: function() {
			
			this.createEventList();

			$(".topnav a").click(function() {
				var myClass = $(this).attr("class");
				$(".topnav a").removeAttr("style");
				$(this).css({
					"font-weight" : "bold",
					"color":"#ffffff"
				});
			
				$( "section[class*='-content']" ).css({
					display: 'none',
				});
				$( "section[class*='"+myClass+"-content']" ).css({
					display: 'block',
				});
			});

		},	
	
		createEventList: function() {
			$.ajax({
				url: "events.json",
				dataType: "json",
				async: "false",
				success: function(data) {
					
					$.each( data.events, function( key, value ) {
						var eventTemplate = $('#eventTemplate').html();	
						
						if ((value.eventDate.dateFrom == value.eventDate.dateTo) && (value.eventDate.monthFrom == value.eventDate.monthTo)) {				
							var eventOnSameday = $(eventTemplate)[0];
							$(eventOnSameday).find(".eventlist-enddate").remove();	
							eventTemplate = $(eventOnSameday).html();							
						}
						
						

						var event = Mustache.to_html(eventTemplate, value);		
												
						$('.events-content').append(event);
						
						
					});
				}
			});
		}
		
	}
})();
