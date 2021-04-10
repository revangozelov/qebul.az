




$(document).ready(function () {

    addDataSlide()

function addDataSlide(data){// pass your data in method
     $.ajax({
             type: "POST",
             url: "https://app.sourcedagile.com/api/post/zd/qebulaz/getSliderList",
             data: JSON.stringify(data),// now data come in this function
             contentType: "application/json; charset=utf-8",
             crossDomain: true,
             dataType: "json",
             success: function (data, status, jqXHR) {
				 var dat = data.tbl[0].r
                 
				
				for (let index = 0; index < dat.length; index++) {
					var idSld=dat[index]['id']
					var imgSld=dat[index]['slider1']
					
						$('#js-main-slider')
						   .append($("<div>")
						              .addClass('pogoSlider-slide')
						              .attr('id',idSld)
						              .attr('style','background-image:url("https://app.sourcedagile.com/api/get/files/'+imgSld+'");'))

					
					
				}
				
               
             },

             error: function (jqXHR, status) {
                 // error handler
            
                 alert('fail' + status.code);
             }
          });
    }
	 

	setTimeout(function(){

		$('#js-main-slider').pogoSlider({
			autoplay: true,
			autoplayTimeout: 5000,
			displayProgess: true,
			preserveTargetSize: true,
			targetWidth: 1000,
			targetHeight: 300,
			responsive: true
		}).data('plugin_pogoSlider');
	
		var transitionDemoOpts = {
			displayProgess: false,
			generateNav: false,
			generateButtons: false
		}

	 }, 2000);
	

});