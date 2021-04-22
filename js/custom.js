
var UrlQb = "https://app.qebul.az/";
var fkUserCode = ''
fkUserCode = localStorage.getItem('UsId');
var nmFK 
var surNmFK
(function (a) {
	a.MaskedInput = function (f) {
		if (!f || !f.elm || !f.format) {
			return null
		}
		if (!(this instanceof a.MaskedInput)) {
			return new a.MaskedInput(f)
		}
		var o = this,
			d = f.elm,
			s = f.format,
			i = f.allowed || "0123456789",
			h = f.allowedfx || function () {
				return true
			},
			p = f.separator || "/:-",
			n = f.typeon || "_YMDhms",
			c = f.onbadkey || function () {},
			q = f.onfilled || function () {},
			w = f.badkeywait || 0,
			A = f.hasOwnProperty("preserve") ? !!f.preserve : true,
			l = true,
			y = false,
			t = s,
			j = (function () {
				if (window.addEventListener) {
					return function (E, C, D, B) {
						E.addEventListener(C, D, (B === undefined) ? false : B)
					}
				}
				if (window.attachEvent) {
					return function (D, B, C) {
						D.attachEvent("on" + B, C)
					}
				}
				return function (D, B, C) {
					D["on" + B] = C
				}
			}()),
			u = function () {
				for (var B = d.value.length - 1; B >= 0; B--) {
					for (var D = 0, C = n.length; D < C; D++) {
						if (d.value[B] === n[D]) {
							return false
						}
					}
				}
				return true
			},
			x = function (C) {
				try {
					C.focus();
					if (C.selectionStart >= 0) {
						return C.selectionStart
					}
					if (document.selection) {
						var B = document.selection.createRange();
						return -B.moveStart("character", -C.value.length)
					}
					return -1
				} catch (D) {
					return -1
				}
			},
			b = function (C, E) {
				try {
					if (C.selectionStart) {
						C.focus();
						C.setSelectionRange(E, E)
					} else {
						if (C.createTextRange) {
							var B = C.createTextRange();
							B.move("character", E);
							B.select()
						}
					}
				} catch (D) {
					return false
				}
				return true
			},
			m = function (D) {
				D = D || window.event;
				var C = "",
					E = D.which,
					B = D.type;
				if (E === undefined || E === null) {
					E = D.keyCode
				}
				if (E === undefined || E === null) {
					return ""
				}
				switch (E) {
					case 8:
						C = "bksp";
						break;
					case 46:
						C = (B === "keydown") ? "del" : ".";
						break;
					case 16:
						C = "shift";
						break;
					case 0:
					case 9:
					case 13:
						C = "etc";
						break;
					case 37:
					case 38:
					case 39:
					case 40:
						C = (!D.shiftKey && (D.charCode !== 39 && D.charCode !== undefined)) ? "etc" : String.fromCharCode(E);
						break;
					default:
						C = String.fromCharCode(E);
						break
				}
				return C
			},
			v = function (B, C) {
				if (B.preventDefault) {
					B.preventDefault()
				}
				B.returnValue = C || false
			},
			k = function (B) {
				var D = x(d),
					F = d.value,
					E = "",
					C = true;
				switch (C) {
					case (i.indexOf(B) !== -1):
						D = D + 1;
						if (D > s.length) {
							return false
						}
						while (p.indexOf(F.charAt(D - 1)) !== -1 && D <= s.length) {
							D = D + 1
						}
						if (!h(B, D)) {
							c(B);
							return false
						}
						E = F.substr(0, D - 1) + B + F.substr(D);
						if (i.indexOf(F.charAt(D)) === -1 && n.indexOf(F.charAt(D)) === -1) {
							D = D + 1
						}
						break;
					case (B === "bksp"):
						D = D - 1;
						if (D < 0) {
							return false
						}
						while (i.indexOf(F.charAt(D)) === -1 && n.indexOf(F.charAt(D)) === -1 && D > 1) {
							D = D - 1
						}
						E = F.substr(0, D) + s.substr(D, 1) + F.substr(D + 1);
						break;
					case (B === "del"):
						if (D >= F.length) {
							return false
						}
						while (p.indexOf(F.charAt(D)) !== -1 && F.charAt(D) !== "") {
							D = D + 1
						}
						E = F.substr(0, D) + s.substr(D, 1) + F.substr(D + 1);
						D = D + 1;
						break;
					case (B === "etc"):
						return true;
					default:
						return false
				}
				d.value = "";
				d.value = E;
				b(d, D);
				return false
			},
			g = function (B) {
				if (i.indexOf(B) === -1 && B !== "bksp" && B !== "del" && B !== "etc") {
					var C = x(d);
					y = true;
					c(B);
					setTimeout(function () {
						y = false;
						b(d, C)
					}, w);
					return false
				}
				return true
			},
			z = function (C) {
				if (!l) {
					return true
				}
				C = C || event;
				if (y) {
					v(C);
					return false
				}
				var B = m(C);
				if ((C.metaKey || C.ctrlKey) && (B === "X" || B === "V")) {
					v(C);
					return false
				}
				if (C.metaKey || C.ctrlKey) {
					return true
				}
				if (d.value === "") {
					d.value = s;
					b(d, 0)
				}
				if (B === "bksp" || B === "del") {
					k(B);
					v(C);
					return false
				}
				return true
			},
			e = function (C) {
				if (!l) {
					return true
				}
				C = C || event;
				if (y) {
					v(C);
					return false
				}
				var B = m(C);
				if (B === "etc" || C.metaKey || C.ctrlKey || C.altKey) {
					return true
				}
				if (B !== "bksp" && B !== "del" && B !== "shift") {
					if (!g(B)) {
						v(C);
						return false
					}
					if (k(B)) {
						if (u()) {
							q()
						}
						v(C, true);
						return true
					}
					if (u()) {
						q()
					}
					v(C);
					return false
				}
				return false
			},
			r = function () {
				if (!d.tagName || (d.tagName.toUpperCase() !== "INPUT" && d.tagName.toUpperCase() !== "TEXTAREA")) {
					return null
				}
				if (!A || d.value === "") {
					d.value = s
				}
				j(d, "keydown", function (B) {
					z(B)
				});
				j(d, "keypress", function (B) {
					e(B)
				});
				j(d, "focus", function () {
					t = d.value
				});
				j(d, "blur", function () {
					if (d.value !== t && d.onchange) {
						d.onchange()
					}
				});
				return o
			};
		o.resetField = function () {
			d.value = s
		};
		o.setAllowed = function (B) {
			i = B;
			o.resetField()
		};
		o.setFormat = function (B) {
			s = B;
			o.resetField()
		};
		o.setSeparator = function (B) {
			p = B;
			o.resetField()
		};
		o.setTypeon = function (B) {
			n = B;
			o.resetField()
		};
		o.setEnabled = function (B) {
			l = B
		};
		return r()
	}
}(window));

function convertStDate(dt){

	var arr = dt.slice(0, 4);
	var arr1 = dt.slice(4, 6);
	var arr2 = dt.slice(6, 8);
   
	var fns = arr+"/"+arr1+'/'+arr2;
	  
	return fns
 }
 function convertStTime(dt){

	var arr = dt.slice(0, 2);
	var arr1 = dt.slice(2,4);
  
   
	var fns = arr+":"+arr1;
	  
	return fns
 }
 function alertBoxGenerate(text,type,nov){

	var box = `<div class="alert ${type}">
	<span class='alert-close' onclick="this.parentElement.style.display='none';">&times;</span>
	<b>${nov}</b><br>
<ul><li>

${text}
</li>

</ul></div>`


$('.alert_box_inside').append(box);
	 
setTimeout(() => {
	$('.alert_box_inside').empty();
}, 3000);
}
/* ..............................................
	Loader 
    ................................................. */

$(window).on('load', function () {
	$('.preloader').fadeOut();
	$('#preloader').delay(150).fadeOut('fast');
	$('body').delay(50).css({
		'overflow': 'visible'
	});

	MaskedInput({
		elm: document.getElementById('number_input_qb'), // select only by id
		format: '+994 (__) ___-__-__',
		separator: '+994 (   )-'
	});
	MaskedInput({
		elm: document.getElementById('update_user_mobil'), // select only by id
		format: '+994 (__) ___-__-__',
		separator: '+994 (   )-'
	});

	$(".cstmtab .nav ul li").click(function () {
		$(this)
			.addClass("active")
			.siblings()
			.removeClass("active");

		let vale = $(this).val()
		tabs(vale);
          
	});


	const tab = document.querySelectorAll(".tab");

	function tabs(panelIndex) {
		tab.forEach(function (node) {
			node.style.display = "none";
		});
		$(tab[panelIndex]).css('display', 'block');
	
	}
	tabs(0);
});



$(document).ready(function () {

	// Get all elements with class="closebtn"
var closec = document.getElementsByClassName("alert-close");
var i;

// Loop through all close buttons
for (i = 0; i < closec.length; i++) {
    // When someone clicks on a close button
    closec[i].onclick = function(){

        // Get the parent of <span class="closebtn"> (<div class="alert">)
        var divc = this.parentElement;

        // Set the opacity of div to 0 (transparent)
        divc.style.opacity = "0";

        // Hide the div after 600ms (the same amount of milliseconds it takes to fade out)
        setTimeout(function(){ divc.style.display = "none"; }, 600);
    }
}
	// masked_input_1.4-min.js
	// angelwatt.com/coding/masked_input.php
	/* ..............................................
    Navbar Bar
    ................................................. */

	

	$('.navbar-nav .nav-link').on('click', function () {
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
			$('.top-header').css('top', '0');
		} else {
			$('.top-header').removeClass('fixed-menu');
			$('.top-header').css('top', '25px');
		}
		if ($(this).scrollTop() > 100) {
			$('#scroll-to-top').fadeIn();
		} else {
			$('#scroll-to-top').fadeOut();
		}
	});



	$(document).on('click', '.data-newssend', function () {

		window.open("news.html", "Xəbərlər");


	})




	$('#scroll-to-top').click(function () {
		$("html, body").animate({
			scrollTop: 0
		}, 600);
		return false;
	});

	let bla = true

	$(document).on('click', '#link_regstr_login', function () {

		let ths = $(this);
		let pr = $(this).parent().find('span');

		if (bla) {
			$('#login_page_block').toggle('fast');
			$('#login_page_block').css('display', 'flex');
			$('#registr_page_block').toggle('fast');
			bla = false;
			ths.text('Qeydiyyat');
			pr.text('Qeydiyyatınız Yoxdur?')
		} else {

			$('#login_page_block').toggle('fast');
			$('#registr_page_block').toggle('fast');
			ths.text('Giriş');
			bla = true;
			pr.text('Qeydiyyatınız var?')
		}



	})
	//open and close tab menu
	$('.nav-tabs-dropdown')
		.on("click", "li:not('.active') a", function (event) {
			$(this).closest('ul').removeClass("open");
		})
		.on("click", "li.active a", function (event) {
			$(this).closest('ul').toggleClass("open");
		});

		$('[data-toggle="popover"]').popover({
			//trigger: 'focus',
			trigger: 'hover',
			html: true,
			content: function () {
				  return '<img class="img-fluid" src="'+$(this).data('img') + '" /> sadcascascas';
			},
			title: 'İcra Edən',
			placement: "bottom"
	  })



	$(document).on('click', '#notification_btn', function () {
		$('.notification').toggle('fast');
		$('.blip').css('display', 'none');
	})
	$(document).on('click', '#notification_close', function () {

		$('.notification').toggle('fast')
	})
	$(document).on('click', '#openRegstrBtn', function () {

	  window.location.href = "login.html"
	})



});



let userId="";

//user info set 
$(document).ready(function () {
     
	$(document).on('click', '#imtahan_list_index div', function () {

		let id = $(this).attr('id')

		if(id===undefined){
			return
		}
		$("imtahan_list_inside").empty();
		addExamList(id)
      
	})
	
	$(document).on('click', '#imtahan_list_inside div', function () {
        
		if(!localStorage.getItem('UsId')){
			$('#exampleModal').modal("toggle");
			return
		} 


		let id = $(this).attr('id');
		let name = $(this).find('h4').text();
		window.location.href = 'exam.html';
		localStorage.setItem('idExam', id);
	   localStorage.setItem('nameExam', name);
		
	


	})
	$(document).on('click', '.nav-inside-exam', function () {
        
	       
		var id = $(this).attr('id');


		if( id!==''){
			if(!localStorage.getItem('UsId')){
				$('#exampleModal').modal("toggle");
				return
			} 

			

		let id = $(this).attr('id');
		let name = $(this).find('a').text();
		let tmas=$(this).attr('data-times');;
		window.location.href = 'exam.html';
		localStorage.setItem('idExam', id);
	   localStorage.setItem('nameExam', name);
	   localStorage.setItem('TmEx', tmas*60)
		
		} else{

			alertBoxGenerate('Hal hazırda bu bölmə Mövcud deyil. Tezliklə əlavə olunacaqdır','info','Məlumat')
		}
		 

	

	


	})
	$(document).on('click', '.news_blok_gen', function () {
        
		var dte= $(this).attr('data-secte');

		localStorage.setItem('newsId',dte);
       
        window.location.href ="news.html";

     })
  
	 
	function genExamBlock(id, nam, img) {

		return `<div id='${id}' class="col-md-4" data-aos="zoom-in" data-aos-delay="200">
	   <div class="full1 blog_img_popular">
		   <img class="img-responsive" src=${UrlQb}api/get/zdfiles/qebulaz/${img}" alt="#" />
		   <h4>${nam}</h4>
	   </div>
      </div>`

	}

	
	function addExamList(gId) {

		$.ajax({
			type: "POST",
			url: UrlQb+"api/post/zd/qebulaz/getImtahanTreeList",
			// now data come in this function
			contentType: "application/json; charset=utf-8",
			crossDomain: true,
			dataType: "json",
			success: function (data, status, jqXHR) {
				var dat = data.tbl[0].r
				var ilst = $('#imtahan_list_inside');

                   
				for (let index = 0; index < dat.length; index++) {

					var fennTc = dat[index]['parentImtahanNovu'];
					if (gId === fennTc) {
						var idTc = dat[index]['id'];
						var imgTc = dat[index]['logoUrl'];
						var nameTc = dat[index]['imtahanNovuAdi'];
						var time = dat[index]['duration'];
						localStorage.setItem('TmEx', time*60)
						ilst.append(genExamBlock(idTc, nameTc, imgTc));


					}

				}
				ilst.css('display', 'flex');
				$('#imtahan_list_index').css('display', 'none');

			},

			error: function (jqXHR, status) {
				// error handler
				
				alert('fail' + status.code);
			}
		});
	}
	

	
	
	//teacher post api 
	function genTeacherBlock(id, img, name, fenn) {

		return $('<div>')
			.addClass('col-sm-6 col-lg-4 col-xl-3')
			.attr('id', id)
			.append($('<div>')
				.addClass('single-person')
				.append($('<div>')
					.addClass('person-image')
					.append('<img src="'+UrlQb+'api/get/zdfiles/qebulaz/' + img + '" alt="">'))
				.append($('<div>')
					.addClass('person-info')
					.append('<h3 class="full-name center">' + name + '</h3>')
					.append('<span class="speciality center">' + fenn + '</span>')
				))



	}


	function addDataTeacher(data) { // pass your data in method
		$.ajax({
			type: "POST",
			url: UrlQb+"api/post/zd/qebulaz/getMuellimlerList",
			data: JSON.stringify(data), // now data come in this function
			contentType: "application/json; charset=utf-8",
			crossDomain: true,
			dataType: "json",
			success: function (data, status, jqXHR) {
				var dat = data.tbl[0].r


				for (let index = 0; index < dat.length; index++) {

					var idTc = dat[index]['id'];
					var imgTc = dat[index]['imageUrl'];
					var nameTc = dat[index]['muelliminAdi'];
					var fennTc = dat[index]['tedrisEtdiyiFenn'];

					$('#team-block').append(genTeacherBlock(idTc, imgTc, nameTc, fennTc))
				}


			},

			error: function (jqXHR, status) {
				// error handler
			
				alert('fail' + status.code);
			}
		});
	}

	addDataTeacher();
	//news  post api 
	function genNewsBlokMini(id, title,  Date, imgN,aos) {
		return $('<div>')
			.addClass('col-lg-3 col-md-3 col-sm-12')
			.attr('data-aos','fade-up')
			.attr('data-aos-delay',aos+'00')
			.attr('id', id)
			.append($('<div>')
				.addClass('full blog_img_popular')
				.append('<img class="img-responsive" src="'+UrlQb+'api/get/zdfiles/qebulaz/' + imgN + '" alt="#' + title + '" />')
				.append('<h4 class="data-newssend">' + title + '</h4>')
				
				.append('<span class="newsDate">' + Date + '</span>'))

	}

	function genNewsBlokLarge(id, title, bdy, Date, imgN) {
		return $('<div>')
			.addClass('row news_block_large')
			.attr('id', id)
			.attr('data-aos', 'fade-up')
			.attr('data-aos-delay', '300')
			.append($('<div>')
				.addClass('col-lg-4 col-md-4 col-sm-12')
				.append('<div class="full float-right_img"><img class="data_newsImg" src="'+UrlQb+'api/get/zdfiles/qebulaz/' + imgN + '" alt="#"></div>'))
			.append($('<div>')
				.addClass('data_newsTxt col-lg-8 col-md-8 col-sm-12')
				.append('<h4>' + title + '</h4>')
				.append('<span>' + bdy + '</span>')
				.append('<p>' + Date + '</p>')
			)

	}

  

	function typeNewsGen(){

		var type= ['news','aboutus','bilirsizmi','mmelumatlar']

		for (let index = 0; index < type.length; index++) {
			
			addDataNews(type[index]);

			
		}
	}
	typeNewsGen()

	function addDataNews(typeN) { // pass your data in method
	
		let dtset ={
			"kv": {
				 "newsType":typeN
			   
			} 
		}
		$.ajax({
			type: "POST",
			url: UrlQb+"api/post/zd/qebulaz/getNewsList",
			data: JSON.stringify(dtset), // now data come in this function
			contentType: "application/json; charset=utf-8",
			crossDomain: true,
			dataType: "json",
			success: function (data, status, jqXHR) {
				
				var dat = data.tbl[0].r
                  
                 console.log(data);
				for (let index = 0; index < dat.length; index++) {

					if(typeN==='news'){
						var idNw = dat[index]['id'];
						var imgNw = dat[index]['thumbImg'];
						var titleNw = dat[index]['newsTitle'];
						var inDateNw = convertStDate(dat[index]['insertDate']);
	
						var bodyNw = dat[index]['newsBody'];
	
	                         if(index<8){
								$('#news-mini-block').prepend(genNewsBlokMini(idNw, titleNw,  inDateNw, imgNw,index));
							 }
					
						$('#news-large-block').prepend(genNewsBlokLarge(idNw, titleNw, bodyNw, inDateNw, imgNw));
					}
					if(typeN==='aboutus'){
						var idNw = dat[0]['id'];
						$('#about-text-block').text( dat[0]['newsTitle'])
						$('#about-text-img').attr("src",UrlQb+'api/get/zdfiles/qebulaz/' + dat[0]['thumbImg'])                  
	                      
					}
					if(typeN==='bilirsizmi'){
						var idNw = dat[index]['id'];
						var imgNw = dat[index]['thumbImg'];
						var titleNw = dat[index]['newsTitle'];
						var inDateNw = convertStDate(dat[index]['insertDate']);
	
						var bodyNw = dat[index]['newsBody'];
	
	                       if(index<8){
						$('#blr-mini-block').prepend(genNewsBlokMini(idNw, titleNw,  inDateNw, imgNw,index));

							  }
						$('#blr-large-block').prepend(genNewsBlokLarge(idNw, titleNw, bodyNw, inDateNw, imgNw));
						
					}
					if(typeN==='mmelumatlar'){
						var idNw = dat[index]['id'];
						var imgNw = dat[index]['thumbImg'];
						var titleNw = dat[index]['newsTitle'];
						var inDateNw = convertStDate(dat[index]['insertDate']);
	
						var bodyNw = dat[index]['newsBody'];
	                       
						if(index<8){
							$('#mrql-mini-block').prepend(genNewsBlokMini(idNw, titleNw,  inDateNw, imgNw,index));
						}
	
						
						$('#mrql-large-block').prepend(genNewsBlokLarge(idNw, titleNw, bodyNw, inDateNw, imgNw));
					
					}

					
				}

				pagintionFunc();
			},

			error: function (jqXHR, status) {
				// error handler
			
				alert('fail' + status.code);
			}
		});
	}

	

	//user register send api
	function resetFlud(email) {

		$('#name_input_qb').val('');
		$('#surname_input_qb').val('');
		$('#email_input_qb').val('');
		$('#number_input_qb').val('');
		$('#password_input_qb').val('');
		$('#repassword_input_qb').val('');
		$('#date_select_qb').val('');



		$('.visible_cts_block').css('visibility', 'hidden');

		$('.visible_cts_block').before('<div class="alert alert-success" role="alert">Qeydiyyat uğurla başa çatmışdır.Zəhmət olmasa ' + email + ' adresini yoxlayın</div>');

	}

	function setUserInfoDataBase() {

		var nm = $('#name_input_qb').val();
		var surnm = $('#surname_input_qb').val();
		var eml = $('#email_input_qb').val();
		var numb = $('#number_input_qb').val();
		var pass = $('#password_input_qb').val();
		var repass = $('#repassword_input_qb').val();
		var date = $('#date_select_qb').val();


		let objectUser = {
			"kv": {
				"name": nm,
				"surname": surnm,
				"email": eml,
				"mobile": numb,
				"password": pass,
				"confirmPassword":repass,
				"birthDate": date     
			}

		}

		if (nm && surnm && eml && numb.trim().length > 3) {
			if (pass.trim().length > 3) {

				if (pass == repass) {


					$.ajax({
						type: "POST",
						url: UrlQb+"api/post/zdfn/qebulaz/registration",
						data: JSON.stringify(objectUser), // now data come in this function
						contentType: "application/json; charset=utf-8",
						crossDomain: true,
						dataType: "json",
						success: function (data, status, jqXHR) {
                        console.log(data);
							try {
								
								alertBoxGenerate(data.err[0]['val'],'warning','Xəta')
								data.err[0]['val'];
							} catch (error) {
								resetFlud(eml);
							}
                             
						

						},

						error: function (jqXHR, status) {
							// error handler
							
							alert('fail' + status.code);
						}
					});
				} else {
					alert('Təkrar Parol Düz Qeyd Edilməyib');
				}

			} else {
				alert('Parol Qısadır');
			}


		} else {
			alert('Zəhmət olmasa bütün xanaları doldurun!!!');
		}

	}


	$(document).on('click', '#submit_regstr_qb', function () {

		setUserInfoDataBase()
	})

	
	function uploadFile4Ipo(id) {
		/* var prec = $('.percentTst'); */
	
		var files = document.getElementById(id).files;
		var file_count = files.length;
		var st = "";
		var trc = 0;
		for (var i = 0, f; f = files[i]; i++) {
			//            var file = files[0];
			var file = f;
			var fileext = file['name'].split('.').pop();
			var fname = file['name'].split('.')[0];

			if (files && file) {
				var reader = new FileReader();
				/* prec.css('width', '0%');
				prec.text('0%'); */
				reader.fileName = fname;
				reader.fileExt = fileext;
				reader.fileNo = i;
				
				reader.onload = function (readerEvt) {
						trc++;
					var fname1 = readerEvt.target.fileName;
					var fileext1 = readerEvt.target.fileExt;
					

					var binaryString = readerEvt.target.result;
					var s = uploadFile4IpoCore(fileext1, btoa(binaryString), fname1);
				
					st += s;
					st += (trc < file_count) ? global_var.vertical_seperator : "";

					if (trc === file_count) {

						$('#' + id).attr('fname', st);
					}

				};

				reader.readAsBinaryString(file, fname);
			}
		}
	}

	function uploadFile4IpoCore(fileext, file_base_64, file_name) {
        
		var d = new Object();
		d.file_base_64 = file_base_64;
		d.file_extension = fileext;
		d.file_type = "general";
		d.file_name = file_name;
		conf = JSON.parse('{"kv":{}}');
		conf['kv'] = d;
		
		var dat = JSON.stringify(conf);
		var finalname = "";
		
		$.ajax({
			url: UrlQb+"api/post/zdupload/qebulaz",
			type: "POST",
			data: dat,
			contentType: "application/json",
			crossDomain: true,

			async: false,
			success: function (data) {
				finalname = data.kv.uploaded_file_name;
				updateUserImage(finalname);
				
			},
			error: function () {
			    
			}
		});
		return finalname;
	}
	$(document).on('click', '.hst_panel_usr', function (event) {
		
		historyExamListGen(fkUserCode);
	});
	$(document).on('change', '#profile_change', function (event) {
		var reader = new FileReader();
		reader.onload = function () {
			var output = $('#profile_picture_img');
			output.attr('src', reader.result);
		}
		reader.readAsDataURL(event.target.files[0]);

		uploadFile4Ipo($(this).attr('id'))

	});

	$('#password_input_qb').keyup(function () {
		var pswd = $(this).val();

		//validate the length
		if (pswd.length < 8) {
			$('#length').removeClass('valid').addClass('invalid');
		} else {
			$('#length').removeClass('invalid').addClass('valid');
		}

		//validate letter
		if (pswd.match(/[A-z]/)) {
			$('#letter').removeClass('invalid').addClass('valid');
		} else {
			$('#letter').removeClass('valid').addClass('invalid');
		}

		//validate capital letter
		if (pswd.match(/[A-Z]/)) {
			$('#capital').removeClass('invalid').addClass('valid');
		} else {
			$('#capital').removeClass('valid').addClass('invalid');
		}

		//validate number
		if (pswd.match(/\d/)) {
			$('#number').removeClass('invalid').addClass('valid');
		} else {
			$('#number').removeClass('valid').addClass('invalid');
		}


	}).focus(function () {
		$('#pswd_info').show();
	}).blur(function () {
		$('#pswd_info').hide();
	});



	function histBlockGen(nma,num,vxt,rstid){
		return `<tr data-rstid="${rstid}">

		<th row-header="Table heading"  scope="row">${num}</th>
		<td row-header="Table" id="hst_name_tag">${nma}</td>
		<td row-header="Table heading">${vxt}</td>
		<td row-header="heading"><a href="" data-toggle="modal" data-target="#resultHstoryModal" id="result-return" >Nəticəni göstər</a></td>
      </tr>`
	}

   function  historyExamListGen(usid){


	let datUs = {
		"kv": {
			
			"fkUserId": "" + usid + ""

		}
	}
	$.ajax({
		type: "POST",
		url: UrlQb+"api/post/zdfn/qebulaz/getImtahanResultByUserId",
		data: JSON.stringify(datUs), // now data come in this function
		contentType: "application/json; charset=utf-8",
		crossDomain: true,
		dataType: "json",
		success: function (data, status, jqXHR) {
			$('#history_exam_result_table').empty();
			var dat = data.tbl[0].r;	
			var arra = data.tbl[1].r;	
				
             var ctes = 1
			for (let index = 0; index < dat.length; index++) {
				
				var dj=dat[index]
                var vxt =convertStDate(dj['baslamaTarixi']);
                var ntc =dj['id']; 
                var fkch=dj['fkImtahanNovuId']
               for (let inc = 0; inc < arra.length; inc++) {
				   var tstch= arra[inc]['id']
				   if(fkch===tstch){
                     var nma =arra[inc]['imtahanNovuAdi']
				   }
			   }

				$('#history_exam_result_table').append(histBlockGen(nma,ctes,vxt,ntc));
				ctes++
			}


		},

		error: function (jqXHR, status) {
			// error handler
		
			alert('fail' + status.code);
		}
	});



   }

   $(document).on("click","#result-return", function(){
   
       var IdImt = $(this).parents('tr').attr('data-rstid');
       var nm = $(this).parents('tbody').find('#hst_name_tag').text();
	    examEndFuncHstry(IdImt,fkUserCode,nm);
   })
   function updateUserImage(img){
	let objectUser1 = {
		"kv": {
			"imageUrl": img,
			"fkUserId": fkUserCode,
		
		}

	}



		$.ajax({
			type: "POST",
			url: UrlQb+"api/post/zdfn/qebulaz/updateUserLogoPictureById",
			data: JSON.stringify(objectUser1), // now data come in this function
			contentType: "application/json; charset=utf-8",
			crossDomain: true,
			dataType: "json",
			success: function (data, status, jqXHR) {
				alert('yadda saxlanldi')
			},

			error: function (jqXHR, status) {
				// error handler
			
				alert('fail' + status.code);
			}
		});

	
   }
   function examEndFuncHstry(efkId,UserCode,nameEx){
	var prop = {
		"kv": { 
			 "fkImtahanId": efkId,
			 "fkUserId":UserCode
		} 
	}
	$.ajax({
		type: "POST",
		url: UrlQb + "api/post/zdfn/qebulaz/getImtahanNeticeleriById",
		data: JSON.stringify(prop), // now data come in this function
		contentType: "application/json; charset=utf-8",
		crossDomain: true,
		dataType: "json",
		success: function (data, status, jqXHR) {
		   var dat= data.tbl[0].r[0];
		   $('#result-name1').text(nmFK);
		   $('#result-sunmae1').text(surNmFK);
		  $('#exam_hours1').text(dat['imtahanMuddeti']);
		  $('#variant_exam1').text(dat['cariStatus']);
		  $('#start_date_exam1').text(convertStDate(dat['baslamaTarixi']));
		  $('#start_hours_exam1').text(convertStTime(dat['baslamaSaati']));
		  $('#end_date_exam1').text(convertStDate(dat['bitisTarixi']));
		  $('#end_hours_exam1').text(convertStTime(dat['bitisSaati']));
		  $('#general_result_exam1').text(dat['umumiBal']);
		 
		   $('#exam_nmea_end1').text(nameEx);
		   
		   $('#fenn-resul-body1').empty();
		  var fenn = data.tbl[2].r;
		  var fnm = data.tbl[1].r;
		  var tb 
		  for (let inde = 0; inde < fnm.length; inde++) {
		   if(fnm[inde]['imtahanNovuAdi']===nameEx){

			   tb = fnm[inde];
		   }
			  
		  }
		 for (let index = 0; index < fenn.length; index++) {
			 let ale = fenn[index];
	
			 var s= ale['imtahanSection']
			   $('#fenn-resul-body1').append($('<tr>')
			   .append('<td>'+tb["section"+s+""]+'</td>')
			   .append('<td>'+ale['qapaliSualDogru']+'/'+ale['qapaliSualSay']+'</td>')
			   .append('<td>'+ale['aciqSualDogru']+'/'+ale['aciqSualSay']+'</td>')
			   .append('<td>'+ale['situasiyaSualCem']+'/'+ale['situasiyaSualSay']+'</td>')
			   .append('<td>'+dat['balSection'+ale['imtahanSection']+'']+'</td>')
			   )
			 
		  
		 }
		  
		},

		error: function (jqXHR, status) {
			// error handler

			alert('fail' + status.code);
		}
	}); 
 }

 function pagintionFunc(){
	var items = $("#news-large-block .news_block_large");
    var numItems = items.length;
    var perPage = 5;

    items.slice(perPage).hide();

    $('.pagination-container').pagination({
        items: numItems,
        itemsOnPage: perPage,
        prevText: "&laquo;",
        nextText: "&raquo;",
        onPageClick: function (pageNumber) {
            var showFrom = perPage * (pageNumber - 1);
            var showTo = showFrom + perPage;
            items.hide().slice(showFrom, showTo).show();
        }
    });
	pagintionFunc1();
 }
 function pagintionFunc1(){
	var items = $("#blr-large-block .news_block_large");
    var numItems = items.length;
    var perPage = 5;

    items.slice(perPage).hide();

    $('.pagination-container1').pagination({
        items: numItems,
        itemsOnPage: perPage,
        prevText: "&laquo;",
        nextText: "&raquo;",
        onPageClick: function (pageNumber) {
            var showFrom = perPage * (pageNumber - 1);
            var showTo = showFrom + perPage;
            items.hide().slice(showFrom, showTo).show();
        }
    });
	pagintionFunc2();
 }
 function pagintionFunc2(){
	var items = $("#mrql-large-block .news_block_large");
    var numItems = items.length;
    var perPage = 5;

    items.slice(perPage).hide();

    $('.pagination-container2').pagination({
        items: numItems,
        itemsOnPage: perPage,
        prevText: "&laquo;",
        nextText: "&raquo;",
        onPageClick: function (pageNumber) {
            var showFrom = perPage * (pageNumber - 1);
            var showTo = showFrom + perPage;
            items.hide().slice(showFrom, showTo).show();
        }
    });
	
 }
	// user Info Functions update and accept

	$(document).on("click", '#update_user_btn', function () {

		var nm = $("#update_user_name").val();
		var srnm = $("#update_user_surname").val();
		var mail = $("#update_user_mail").val();
		var mbl = $("#update_user_mobil").val();
		var brthDay = $("#update_user_brthday").val();
		var gndr = $("#update_user_gender").val();
		var grp = $("#update_user_group").val();
		var stts = $("#update_user_status").val();

		let objectUser1 = {
			"kv": {
				"updatedField": 'gender,mobile,name,email,userStatus,birthDate,examGroup,surname',
				"id": userId,
				"name": nm,
				"surname": srnm,
				"email": mail,
				"userStatus": stts,
				"mobile": mbl,
				"birthDate": brthDay,
				"gender": gndr,
				"examGroup": grp,

			}

		}

		if (nm && srnm && mbl.trim().length > 3) {

			$.ajax({
				type: "POST",
				url: UrlQb+"api/post/zdfn/qebulaz/updateUserInfoById",
				data: JSON.stringify(objectUser1), // now data come in this function
				contentType: "application/json; charset=utf-8",
				crossDomain: true,
				dataType: "json",
				success: function (data, status, jqXHR) {
					alert('yadda saxlanldi')
				},

				error: function (jqXHR, status) {
					// error handler
				
					alert('fail' + status.code);
				}
			});

		} else {
			alert('Zəhmət olmasa bütün xanaları doldurun!!!');
		}

	})
	$(document).on("click", '#exit_profile_name', function () {

		localStorage.removeItem('UsId');

		location.reload();


	})

	$(document).on("click", '#sign_in_btn', function () {
		var userNm = $(this).parents('.modal-content').find('#exampleInputEmail1').val();
		var userPass = $(this).parents('.modal-content').find('#exampleInputPassword1').val();
		getUserLogin(userNm, userPass);

		
	})

	function getUserLogin(usNm, pass) {

		let datUs = {
			"kv": {
				"email": "" + usNm + "",
				"password": "" + pass + ""


			}
		}
		$.ajax({
			type: "POST",
			url: UrlQb+"api/post/zdfn/qebulaz/login",
			data: JSON.stringify(datUs), // now data come in this function
			contentType: "application/json; charset=utf-8",
			crossDomain: true,
			dataType: "json",
			success: function (data, status, jqXHR) {
				
				
				var dat = data.kv;
				try {
					var err= data.err[0]['code'];
					if(err==="userNotFound"){
						$('#errorMessage').text('İstifadəçi tapılmadı');
				   return
					}
				  }
				  catch(err) {
					localStorage.setItem('UsId', dat['id']);
					
					$('#exampleModal').modal("toggle");
					
					window.location.reload(true);
				  }
			
							
			   
					
				 
		
			},

			error: function (jqXHR, status) {
							
			}
		});
	}

	function getUserInfoProfile() { // pass your data in method
          
		
		userId = localStorage.getItem('UsId');
		
		if (userId.length !== '') {

			let objectUser1 = {
				"kv": {
				
					"fkUserId": fkUserCode
				
				}
		
			}
			$('#login_btn_data').css('display', 'none');
			$('.top-header #navbar-wd').css("padding-right",'5%')
			$('[data-target="#exampleModal"]').css('display', 'none');
			$('.navbar-custom-menu').css('display', 'block');

			$.ajax({
				type: "POST",
				url: UrlQb+"api/post/zdfn/qebulaz/getUserInfoById",
				//	data: JSON.stringify(data), // now data come in this function
				contentType: "application/json; charset=utf-8",
				crossDomain: true,
				dataType: "json",
			
				data: JSON.stringify(objectUser1),
				success: function (data, status, jqXHR) {
					var dat = data.tbl[0].r

					for (let index = 0; index < dat.length; index++) {

						var idTc = dat[index]['id'];
						var gendr = dat[index]['gender'];
						var exGr = dat[index]['examGroup'];
						var mbl = dat[index]['mobile'];
						var brthDt = dat[index]['birthDate'];
						var nm = dat[index]['name'];
						var srnm = dat[index]['surname'];
						var imgTc = dat[index]['imageUrl'];
						var eml = dat[index]['email'];
						var sts = dat[index]['status'];
						var cty = dat[index]['qeydiyyatCity'];

						if (userId === idTc) {
							nmFK =nm;
							surNmFK=srnm
							$("#user_name_pr").text(nm + " " + srnm);
							$("#city_user_pr").text(cty);
							$("#user_pr_mobile").text(mbl);
							$("#user_pr_mail").text(eml);
							$("#update_user_name").val(nm);
							$("#update_user_surname").val(srnm);
							$("#update_user_mail").val(eml);
							$("#update_user_mobil").val(mbl);
							$("#update_user_brthday").val(brthDt);
							$("#update_user_gender").val(gendr);
							$("#update_user_group").val(exGr);
							$("#update_user_status").val(sts);
							if(imgTc===""){
								$("#profile_picture_img").attr('src', 'images/userprofile.png');
								$('#user_index_img').attr('src', 'images/userprofile.png');
								$('#user_index_img_large').attr('src', 'images/userprofile.png');
								$('#name_index_block').text(nm + ' ' + srnm);
							}else{
								$("#profile_picture_img").attr('src', UrlQb+'api/get/zdfiles/qebulaz/' + imgTc);
								userImageIn(imgTc, nm, srnm);
							}
						
						}


					}



				},

				error: function (jqXHR, status) {
					// error handler
				
					alert('fail' + status.code);
				}
			});
		}
	}

	//User sign in function
	function userImageIn(img, name, srnm) {

		$('#user_index_img').attr('src', UrlQb+'api/get/zdfiles/qebulaz/' + img);
		$('#user_index_img_large').attr('src', UrlQb+'api/get/zdfiles/qebulaz/' + img);
		$('#name_index_block').text(name + ' ' + srnm);



	}

	let lute = true

	$(document).on('click', '.dataRespOpen', function () {

		var respX = $(window).width();

		let tds = $(this).parent().find('td');

		if (respX < 900) {

			if (lute) {


				tds.css('display', 'block');


				lute = false
			} else {
				tds.css('display', 'none');
				lute = true
			}


		}


	})



	function addTableRespBtn() {

		var tds1 = $('table tbody tr th');

		tds1.addClass('dataRespOpen');

	}
	addTableRespBtn();

  
	getUserInfoProfile();

	$(document).on('click','.cnvrtpdfBtn',function(){
		var tst = $(this).attr('data-ide');
		var pdfFileName = 'file.pdf';
var element = document.getElementById(tst);
const options =  {
	margin:       0.2,
	filename:     'Nəticə.pdf',
	image:        { type: 'jpeg', quality: 0.98 },
	html2canvas:  { scale: 2 },
	jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }
  };

html2pdf(element, options);
   
	   var element = document.getElementById(tst);
	   html2pdf().from(element).save()
	   
   })
  
   $(document).on('click','#changePass-UserREg',function(){


	var oldps = $('#exampleInputPasswordOld').val();
	var newps = $('#exampleInputPasswordNew').val();
	var cnewps = $('#exampleInputPasswordReNew').val();
	
    if(newps===cnewps){
		updatePass(fkUserCode,oldps,newps,cnewps);
	}
	


   })

   function updatePass(id,oldps,newps,cnewps){

	var prop = {
		"kv": { 
			 "fkUserId": id,
			 "oldPassword":oldps,
			 "newPassword":newps,
			 "confirmNewPassword":cnewps
		} 
	}
	$.ajax({
		type: "POST",
		url: UrlQb + "api/post/zdfn/qebulaz/updateUserPasswordById",
		data: JSON.stringify(prop), // now data come in this function
		contentType: "application/json; charset=utf-8",
		crossDomain: true,
		dataType: "json",
		success: function (data, status, jqXHR) {
        
			try{
               var err =data.err[0]
               
			}catch{
				$('#changePasswordModal').modal("toggle");
			}
		  
		  
		},

		error: function (jqXHR, status) {
			// error handler

			alert('fail' + status.code);
		}
	}); 
   }

});


