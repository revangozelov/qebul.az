(function($) {
    "use strict";
	
	/* ..............................................
	Loader 
    ................................................. */
	
	$(window).on('load', function() { 
		$('.preloader').fadeOut(); 
		$('#preloader').delay(550).fadeOut('slow'); 
		$('body').delay(450).css({'overflow':'visible'});
	});
    	
	/* ..............................................
    Navbar Bar
    ................................................. */
	
	$('.navbar-nav .nav-link').on('click', function() {
		var toggle = $('.navbar-toggler').is(':visible');
		if (toggle) {
			$('.navbar-collapse').collapse('hide');
		}
	});
	
	/* ..............................................
    Fixed Menu
    ................................................. */
    
	$(window).on('scroll', function () {
		if ($(window).scrollTop() > 50) {
			$('.top-header').addClass('fixed-menu');
			$('.top-header').css('top','0');
		} else {
			$('.top-header').removeClass('fixed-menu');
			$('.top-header').css('top','10px');
		}
	});

	/* ..............................................
    Properties Filter
    ................................................. */
	var Container = $('.container');
	Container.imagesLoaded(function () {
		var portfolio = $('.properties-menu');
		portfolio.on('click', 'button', function () {
			$(this).addClass('active').siblings().removeClass('active');
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({
				filter: filterValue
			});
		});
		var $grid = $('.properties-list').isotope({
			itemSelector: '.properties-grid'
		});

	});

	/* ..............................................
    Gallery
    ................................................. */
	
	$(document).ready(function() {
		$('.popup-gallery').magnificPopup({
			delegate: 'a',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc: function(item) {
					return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
				}
			}
		});
		  
		  
		$(document).on('click','.data-newssend',function(){
			   
			   window.open ("news.html","Xəbərlər");

			   
		})
		
        

	});
	
	/* ..............................................
    Scroll To Top
    ................................................. */
	
	$(document).ready(function () {

		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('#scroll-to-top').fadeIn();
			} else {
				$('#scroll-to-top').fadeOut();
			}
		});

		$('#scroll-to-top').click(function () {
			$("html, body").animate({
				scrollTop: 0
			}, 600);
			return false;
		});

	});

	$(window).on('load',function () {
		$(".nav ul li").click(function() {
			$(this)
			  .addClass("active")
			  .siblings()
			  .removeClass("active");

			let vale= $(this).val()
			  tabs(vale);
		  });
		  
		 
		  const tab = document.querySelectorAll(".tab");
		  
		  function tabs(panelIndex) {
			tab.forEach(function(node) {
			  node.style.display = "none";
			});
			$(tab[panelIndex]).css('display','block');
		  }
		  tabs(0);
		  
		  
		  let bio = document.querySelector(".bio");
		  const bioMore = document.querySelector("#see-more-bio");
		  const bioLength = bio.innerText.length;
		  
		  function bioText() {
			bio.oldText = bio.innerText;
		  
			bio.innerText = bio.innerText.substring(0, 100) + "...";
			bio.innerHTML += `<span  id='see-more-bio'>See More</span>`;
		  }
		  //        console.log(bio.innerText)
		  
		  bioText();
		   
		  function addLength() {
			bio.innerText = bio.oldText;
			bio.innerHTML +=
			  "&nbsp;" + `<span onclick='bioText()' id='see-less-bio'>See Less</span>`;
			document.getElementById("see-less-bio").addEventListener("click", () => {
			  document.getElementById("see-less-bio").style.display = "none";
			});
		  }
		  if (document.querySelector(".alert-message").innerText > 9) {
			document.querySelector(".alert-message").style.fontSize = ".7rem";
		  }
		  

		 $(document).on('click',"#see-more-bio", function(){
			addLength()
		 } );
		 $(document).on('click',"#see-less-bio", function(){
			bioText()
		 });
	
	


	});
	


	

	
	

	
}(jQuery));

AOS.init();



