(function($) {
    "use strict";
	
	/* ..............................................
	Loader 
    ................................................. */
	
	$(window).on('load', function() { 
		$('.preloader').fadeOut(); 
		$('#preloader').delay(550).fadeOut('slow'); 
		$('body').delay(450).css({'overflow':'visible'});
		
		MaskedInput({
			elm: document.getElementById('number_input_qb'), // select only by id
			format: '+994 (__) ___-__-__',
			separator: '+994 (   )-'
		 });
		
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

		let bla = true

		$(document).on('click','#link_regstr_login',function(){

			let ths= $(this);
			let pr= $(this).parent().find('span');

			if(bla){
				$('#login_page_block').toggle('fast');
				$('#login_page_block').css('display','flex');
				$('#registr_page_block').toggle('fast');
			    bla=false;
				ths.text('Qeydiyyat');
				pr.text('Qeydiyyatınız Yoxdur?')
			} else{

				$('#login_page_block').toggle('fast');
			    $('#registr_page_block').toggle('fast');
				ths.text('Giriş');
				bla=true;
				pr.text('Qeydiyyatınız var?')
			}
		  
		
         
		})
		$(".data_picker").datepicker();


	});

	$(window).on('load',function () {
		$(".cstmtab .nav ul li").click(function() {
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
		  


	});
	


	
}(jQuery));

// masked_input_1.4-min.js
// angelwatt.com/coding/masked_input.php
(function(a){a.MaskedInput=function(f){if(!f||!f.elm||!f.format){return null}if(!(this instanceof a.MaskedInput)){return new a.MaskedInput(f)}var o=this,d=f.elm,s=f.format,i=f.allowed||"0123456789",h=f.allowedfx||function(){return true},p=f.separator||"/:-",n=f.typeon||"_YMDhms",c=f.onbadkey||function(){},q=f.onfilled||function(){},w=f.badkeywait||0,A=f.hasOwnProperty("preserve")?!!f.preserve:true,l=true,y=false,t=s,j=(function(){if(window.addEventListener){return function(E,C,D,B){E.addEventListener(C,D,(B===undefined)?false:B)}}if(window.attachEvent){return function(D,B,C){D.attachEvent("on"+B,C)}}return function(D,B,C){D["on"+B]=C}}()),u=function(){for(var B=d.value.length-1;B>=0;B--){for(var D=0,C=n.length;D<C;D++){if(d.value[B]===n[D]){return false}}}return true},x=function(C){try{C.focus();if(C.selectionStart>=0){return C.selectionStart}if(document.selection){var B=document.selection.createRange();return -B.moveStart("character",-C.value.length)}return -1}catch(D){return -1}},b=function(C,E){try{if(C.selectionStart){C.focus();C.setSelectionRange(E,E)}else{if(C.createTextRange){var B=C.createTextRange();B.move("character",E);B.select()}}}catch(D){return false}return true},m=function(D){D=D||window.event;var C="",E=D.which,B=D.type;if(E===undefined||E===null){E=D.keyCode}if(E===undefined||E===null){return""}switch(E){case 8:C="bksp";break;case 46:C=(B==="keydown")?"del":".";break;case 16:C="shift";break;case 0:case 9:case 13:C="etc";break;case 37:case 38:case 39:case 40:C=(!D.shiftKey&&(D.charCode!==39&&D.charCode!==undefined))?"etc":String.fromCharCode(E);break;default:C=String.fromCharCode(E);break}return C},v=function(B,C){if(B.preventDefault){B.preventDefault()}B.returnValue=C||false},k=function(B){var D=x(d),F=d.value,E="",C=true;switch(C){case (i.indexOf(B)!==-1):D=D+1;if(D>s.length){return false}while(p.indexOf(F.charAt(D-1))!==-1&&D<=s.length){D=D+1}if(!h(B,D)){c(B);return false}E=F.substr(0,D-1)+B+F.substr(D);if(i.indexOf(F.charAt(D))===-1&&n.indexOf(F.charAt(D))===-1){D=D+1}break;case (B==="bksp"):D=D-1;if(D<0){return false}while(i.indexOf(F.charAt(D))===-1&&n.indexOf(F.charAt(D))===-1&&D>1){D=D-1}E=F.substr(0,D)+s.substr(D,1)+F.substr(D+1);break;case (B==="del"):if(D>=F.length){return false}while(p.indexOf(F.charAt(D))!==-1&&F.charAt(D)!==""){D=D+1}E=F.substr(0,D)+s.substr(D,1)+F.substr(D+1);D=D+1;break;case (B==="etc"):return true;default:return false}d.value="";d.value=E;b(d,D);return false},g=function(B){if(i.indexOf(B)===-1&&B!=="bksp"&&B!=="del"&&B!=="etc"){var C=x(d);y=true;c(B);setTimeout(function(){y=false;b(d,C)},w);return false}return true},z=function(C){if(!l){return true}C=C||event;if(y){v(C);return false}var B=m(C);if((C.metaKey||C.ctrlKey)&&(B==="X"||B==="V")){v(C);return false}if(C.metaKey||C.ctrlKey){return true}if(d.value===""){d.value=s;b(d,0)}if(B==="bksp"||B==="del"){k(B);v(C);return false}return true},e=function(C){if(!l){return true}C=C||event;if(y){v(C);return false}var B=m(C);if(B==="etc"||C.metaKey||C.ctrlKey||C.altKey){return true}if(B!=="bksp"&&B!=="del"&&B!=="shift"){if(!g(B)){v(C);return false}if(k(B)){if(u()){q()}v(C,true);return true}if(u()){q()}v(C);return false}return false},r=function(){if(!d.tagName||(d.tagName.toUpperCase()!=="INPUT"&&d.tagName.toUpperCase()!=="TEXTAREA")){return null}if(!A||d.value===""){d.value=s}j(d,"keydown",function(B){z(B)});j(d,"keypress",function(B){e(B)});j(d,"focus",function(){t=d.value});j(d,"blur",function(){if(d.value!==t&&d.onchange){d.onchange()}});return o};o.resetField=function(){d.value=s};o.setAllowed=function(B){i=B;o.resetField()};o.setFormat=function(B){s=B;o.resetField()};o.setSeparator=function(B){p=B;o.resetField()};o.setTypeon=function(B){n=B;o.resetField()};o.setEnabled=function(B){l=B};return r()}}(window));

AOS.init();

var questions = [{
    question: "1. How do you write 'Hello World' in an alert box?",
    choices: ["msg('Hello World')", "msgBox('Hello World');", "alertBox('Hello World');", "alert('Hello World');"],
    correctAnswer: 3
}, {
    question: "2. How to empty an array in JavaScript?",
    choices: ["arrayList[]", "arrayList(0)", "arrayList.length=0", "arrayList.len(0)"],
    correctAnswer: 2
}, {
    question: "3. What function to add an element at the begining of an array and one at the end?",
    choices: ["push,unshift", "unshift,push", "first,push", "unshift,last"],
    correctAnswer: 1
}, {
    question: "4. What will this output? var a = [1, 2, 3]; console.log(a[6]);",
    choices: ["undefined", "0", "prints nothing", "Syntax error"],
    correctAnswer: 0
}, {
    question: "5. What would following code return? console.log(typeof typeof 1);",
    choices: ["string", "number", "Syntax error", "undefined"],
    correctAnswer: 0
},{
	question: "6. Which software company developed JavaScript?",
    choices: ["Mozilla", "Netscape", "Sun Microsystems", "Oracle"],
    correctAnswer: 1
},{
	question: "7. What would be the result of 3+2+'7'?",
    choices: ["327", "12", "14", "57"],
    correctAnswer: 3
},{
	question: "8. Look at the following selector: $('div'). What does it select?",
    choices: ["The first div element", "The last div element", "All div elements", "Current div element"],
    correctAnswer: 2
},{
	question: "9. How can a value be appended to an array?",
    choices: ["arr(length).value;", "arr[arr.length]=value;", "arr[]=add(value);", "None of these"],
    correctAnswer: 1
},{
	question: "10. What will the code below output to the console? console.log(1 +  +'2' + '2');",
    choices: ["'32'", "'122'", "'13'", "'14'"],
    correctAnswer: 0
}];


var currentQuestion = 0;
var viewingAns = 0;
var correctAnswers = 0;
var quizOver = false;
var iSelectedAnswer = [];
	var c=5550;
	var t;
$(document).ready(function () 
{
    // Display the first question
	displayCurrentQuestion();
	answerCardGen()
    $(this).find(".quizMessage").hide();
    $(this).find(".preButton").attr('disabled', 'disabled');
	
	timedCount();
	
	$(this).find(".preButton").on("click", function () 
	{		
		
       
			if(currentQuestion == 0) { return false; }
	
			if(currentQuestion == 1) {
			  $(".preButton").attr('disabled', 'disabled');
			}
			
				currentQuestion--; // Since we have already displayed the first question on DOM ready

					displayCurrentQuestion();
					
									
		
    });

	
	// On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () 
	{
      
			
            var val = $("input[type='radio']:checked").val();

          
			
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
               
				if (val == questions[currentQuestion].correctAnswer) 
				{
					correctAnswers++;
				}
				iSelectedAnswer[currentQuestion] = val;
				
				currentQuestion++; // Since we have already displayed the first question on DOM ready
				if(currentQuestion >= 1) {
					  $('.preButton').prop("disabled", false);
				}
			
				displayCurrentQuestion();
					
				
			
			
					
			
	
	});
	
	$(document).on('click','#un_checked_btn', function(){
		
		$('.question_answers input').prop('checked', false)
	})
});



function timedCount()
	{
		if(c == 185) 
		{ 
			return false; 
		}
		
		var hours = parseInt( c / 3600 ) % 24;
		var minutes = parseInt( c / 60 ) % 60;
		var seconds = c % 60;
		var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);            
		$('#timer').html(result);
		
		if(c == 0 )
		{
					displayScore();
					$('#iTimeShow').html('Quiz Time Completed!');
					//$('#timer').html("You scored: " + correctAnswers + " out of: " + questions.length);
					c=185;
					$(document).find(".preButton").text("View Answer");
					$(document).find(".nextButton").html('<i class="fas fa-redo"></i>');
					quizOver = true;
					return false;
					
		}
		
	
		c = c - 1;
		t = setTimeout(function()
		{
			timedCount()
		},1000);
	}
	

	//answer card generate 
function  answerCardGen(){

	var numChoices1 = questions.length;
	var ansCardbdy = $('.answer_card_body tbody');
	  
	for (i = 0; i < numChoices1; i++){
		 var tra = $('<tr>')
		             .attr('data-numCard',i+1)
					 .append('<th>'+(i+1)+'</th>')
					 .append('<td><span>A</span></td>')
					 .append('<td><span>B</span></td>')
					 .append('<td><span>C</span></td>')
					 .append('<td><span>D</span></td>')
					
		ansCardbdy.append(tra);

	}
     
}
	
// This displays the current question AND the choices
function displayCurrentQuestion() 
{

	if(c == 185) { c = 360; timedCount(); }
    //console.log("In display current Question");
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question_content");
    var choiceList = $(document).find(".quizContainer > .choiceList");
	var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);
    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();
    var choice;
	
	
    for (i = 0; i < numChoices; i++) 
	{
        choice = questions[currentQuestion].choices[i];
		
		if(iSelectedAnswer[currentQuestion] == i) {
			$('<li class="question_answers" ><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
		} else {
			$('<li class="question_answers" ><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
		}
    }
}

function resetQuiz()
{
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore()
{
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".quizContainer > .result").show();
}

function hideScore() 
{
    $(document).find(".result").hide();
}

// This displays the current question AND the choices
function viewResults() 
{

	if(currentQuestion == 10) { currentQuestion = 0;return false; }
	if(viewingAns == 1) { return false; }

	hideScore();
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question_content");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    // Set the questionClass text to the current question
    $(questionClass).text(question);
    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();
    var choice;
	
	
	for (i = 0; i < numChoices; i++) 
	{
        choice = questions[currentQuestion].choices[i];
		
		if(iSelectedAnswer[currentQuestion] == i) {
			if(questions[currentQuestion].correctAnswer == i) {
				$('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
			} else {
				$('<li style="border:2px solid red;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
			}
		} else {
			if(questions[currentQuestion].correctAnswer == i) {
				$('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
			} else {
				$('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
			}
		}
    }
	
	currentQuestion++;
	
	setTimeout(function()
		{
			viewResults();
		},3000);
}


//open and close tab menu
$('.nav-tabs-dropdown')
    .on("click", "li:not('.active') a", function(event) {  $(this).closest('ul').removeClass("open");
    })
    .on("click", "li.active a", function(event) {        $(this).closest('ul').toggleClass("open");
	});
	




	$(document).on('click','#notification_btn',function(){
		$('.notification').toggle('fast');
		$('.blip').css('display','none');
	})
	$(document).on('click','#notification_close',function(){

		$('.notification').toggle('fast')
	})


	//teacher post api 

	function genTeacherBlock(id,img,name,fenn){

	   return $('<div>')
				  .addClass('col-sm-6 col-lg-4 col-xl-3')
				  .attr('id',id)
				  .append($('<div>')
							.addClass('single-person')
							.append($('<div>')
										.addClass('person-image')
										.append('<img src="https://app.sourcedagile.com/api/get/files/'+img+'" alt="">'))
							.append($('<div>')
										.addClass('person-info')
										.append('<h3 class="full-name center">'+name+'</h3>')
										.append('<span class="speciality center">'+fenn+'</span>')
										))
      
      
		 
	}

  
	function addDataTeacher(data){// pass your data in method
		 $.ajax({
				 type: "POST",
				 url: "https://app.sourcedagile.com/api/post/zd/qebulaz/getMuellimlerList",
				 data: JSON.stringify(data),// now data come in this function
				 contentType: "application/json; charset=utf-8",
				 crossDomain: true,
				 dataType: "json",
				 success: function (data, status, jqXHR) {
					 var dat = data.tbl[0].r
					 
					
					for (let index = 0; index < dat.length; index++) {

						var idTc= dat[index]['id'];
						var imgTc= dat[index]['imageUrl'];
						var nameTc= dat[index]['muelliminAdi'];
						var fennTc= dat[index]['tedrisEtdiyiFenn'];
						
					   $('#team-block').append(genTeacherBlock(idTc,imgTc,nameTc,fennTc))	
					}
					
				   
				 },
	
				 error: function (jqXHR, status) {
					 // error handler
					 console.log(jqXHR);
					 alert('fail' + status.code);
				 }
			  });
		}

		addDataTeacher();
	//news  post api 
	function genNewsBlokMini(id,title,bdy,Date,imgN){
	   return $('<div>')
				.addClass('col-lg-3 col-md-3 col-sm-12')
				.attr('id',id)
				.append($('<div>')
							.addClass('full blog_img_popular')
							.append('<img class="img-responsive" src="https://app.sourcedagile.com/api/get/files/'+imgN+'" alt="#'+title+'" />')
							.append('<h4 class="data-newssend">'+title+'</h4>')
							.append('<p>'+bdy+'</p>')
							.append('<span class="newsDate">'+Date+'</span>'))

	}
	function genNewsBlokLarge(id,title,bdy,Date,imgN){
	   return $('<div>')
				.addClass('row news_block_large')
				.attr('id',id)
				.attr('data-aos','fade-up')
				.attr('data-aos-delay','300')
				.append($('<div>')
							.addClass('col-lg-4 col-md-4 col-sm-12')
							.append('<div class="full float-right_img"><img class="data_newsImg" src="https://app.sourcedagile.com/api/get/files/'+imgN+'" alt="#"></div>'))
				.append($('<div>')
							.addClass('data_newsTxt col-lg-8 col-md-8 col-sm-12')
							.append('<h4>'+title+'</h4>')
							.append('<span>'+bdy+'</span>')
							.append('<p>'+Date+'</p>')
							)

	}

	function addDataNews(data){// pass your data in method
		$.ajax({
				type: "POST",
				url: "https://app.sourcedagile.com/api/post/zd/qebulaz/getNewsList",
				data: JSON.stringify(data),// now data come in this function
				contentType: "application/json; charset=utf-8",
				crossDomain: true,
				dataType: "json",
				success: function (data, status, jqXHR) {
					var dat = data.tbl[0].r
					
				   
				   for (let index = 0; index < dat.length; index++) {

					   var idNw= dat[index]['id'];
					   var imgNw= dat[index]['thumbImg'];
					   var titleNw= dat[index]['newsTitle'];
					   var inDateNw= dat[index]['insertDate'];
					   
					   var bodyNw= dat[index]['newsBody'];
					   
					  $('#news-mini-block').prepend(genNewsBlokMini(idNw,titleNw,bodyNw,inDateNw,imgNw));	
					  $('#news-large-block').prepend(genNewsBlokLarge(idNw,titleNw,bodyNw,inDateNw,imgNw));	
				   }
				   
				  
				},
   
				error: function (jqXHR, status) {
					// error handler
					console.log(jqXHR);
					alert('fail' + status.code);
				}
			 });
	   }

	   addDataNews();

   //user register send api
   function resetFlud(email){
		 
	$('#name_input_qb').val('');
	$('#surname_input_qb').val('');    
	 $('#email_input_qb').val('');
	$('#number_input_qb').val('');
	$('#password_input_qb').val('');
	$('#repassword_input_qb').val('');
	$('#status_select_qb').val('');


	   
	$('.visible_cts_block').css('visibility','hidden');

   $('.visible_cts_block').before('<div class="alert alert-success" role="alert">Qeydiyyat uğurla başa çatmışdır.Zəhmət olmasa '+email+' adresini yoxlayın</div>');

   }
   
   function setUserInfoDataBase(){

       var nm = $('#name_input_qb').val();
       var surnm = $('#surname_input_qb').val();
       var eml = $('#email_input_qb').val();
       var numb = $('#number_input_qb').val();
       var pass = $('#password_input_qb').val();
       var repass = $('#repassword_input_qb').val();
	   var stts = $('#status_select_qb').val();
	      
	  
	   let objectUser = {
		"kv": {
			"api": "insertNewUser",
			"name": nm,
			"surname": surnm,
			"email": eml,
			"userStatus": stts,
			"mobile": numb,
			"password": pass,
			
		}
	  
	}

	if(nm&&surnm&&eml&&numb.trim().length > 3){
		if(pass.trim().length > 3){
			  
			if(pass==repass){

   
				$.ajax({
					type: "POST",
					url: "https://app.sourcedagile.com/api/post/zd/qebulaz/insertNewUser",
					data: JSON.stringify(objectUser),// now data come in this function
					contentType: "application/json; charset=utf-8",
					crossDomain: true,
					dataType: "json",
					success: function (data, status, jqXHR) {
						
						resetFlud(eml);
					  
					},
			
					error: function (jqXHR, status) {
						// error handler
						console.log(jqXHR);
						alert('fail' + status.code);
					}
				 });
			   }else{
				   alert('Təkrar Parol Düz Qeyd Edilməyib');
			   }
			 
		}else{
			alert('Parol Qısadır');
		}
		
			
	}else{
		alert('Zəhmət olmasa bütün xanaları doldurun!!!');
	}
  
   }

   $(document).on('click','#submit_regstr_qb',function(){

	setUserInfoDataBase()
   })

  
   let userId='21020608524507336798' 
   $(document).ready(function(){

	$(document).on('change', '#profile_change',function(event) {
		var reader = new FileReader();
		reader.onload = function(){
		  var output = $('#profile_picture_img');
		  output.attr('src',reader.result);
		}
		reader.readAsDataURL(event.target.files[0]);
	});
	
	$('#password_input_qb').keyup(function() {
		var pswd = $(this).val();
		
		//validate the length
		if ( pswd.length < 8 ) {
			$('#length').removeClass('valid').addClass('invalid');
		} else {
			$('#length').removeClass('invalid').addClass('valid');
		}
		
		//validate letter
		if ( pswd.match(/[A-z]/) ) {
			$('#letter').removeClass('invalid').addClass('valid');
		} else {
			$('#letter').removeClass('valid').addClass('invalid');
		}

		//validate capital letter
		if ( pswd.match(/[A-Z]/) ) {
			$('#capital').removeClass('invalid').addClass('valid');
		} else {
			$('#capital').removeClass('valid').addClass('invalid');
		}

		//validate number
		if ( pswd.match(/\d/) ) {
			$('#number').removeClass('invalid').addClass('valid');
		} else {
			$('#number').removeClass('valid').addClass('invalid');
		}
	
		
	}).focus(function() {
		$('#pswd_info').show();
	}).blur(function() {
		$('#pswd_info').hide();
	});

   // user Info Functions update and accept





	$(document).on("click",'#update_user_btn', function(){

	 var nm= $("#update_user_name").val();
	 var srnm= $("#update_user_surname").val();
	 var mail= $("#update_user_mail").val();
	 var mbl= $("#update_user_mobil").val();
	 var brthDay= $("#update_user_brthday").val();
	 var gndr= $("#update_user_gender").val();
	 var grp= $("#update_user_group").val();
	 var stts= $("#update_user_status").val();

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

	if(nm&&srnm&&mbl.trim().length > 3){
	
				$.ajax({
					type: "POST",
					url: "https://app.sourcedagile.com/api/post/zd/qebulaz/updateUserInfo",
					data: JSON.stringify(objectUser1),// now data come in this function
					contentType: "application/json; charset=utf-8",
					crossDomain: true,
					dataType: "json",
					success: function (data, status, jqXHR) {
								alert('yadda saxlanldi')			  
					},
			
					error: function (jqXHR, status) {
						// error handler
						console.log(jqXHR);
						alert('fail' + status.code);
					}
				 });
			 			
	}else{
		alert('Zəhmət olmasa bütün xanaları doldurun!!!');
	}

	})
	
});
getUserInfoProfile()
function getUserInfoProfile(data){// pass your data in method
	$.ajax({
			type: "POST",
			url: "https://app.sourcedagile.com/api/post/zd/qebulaz/getUserList",
			data: JSON.stringify(data),// now data come in this function
			contentType: "application/json; charset=utf-8",
			crossDomain: true,
			dataType: "json",
			success: function (data, status, jqXHR) {
				var dat = data.tbl[0].r
				
			   
			   for (let index = 0; index < dat.length; index++) {

				   var idTc= dat[index]['id'];
				   var gendr= dat[index]['gender'];
				   var exGr= dat[index]['examGroup'];
				   var mbl= dat[index]['mobile'];
				   var brthDt= dat[index]['birthDate'];
				   var nm= dat[index]['name'];
				   var srnm= dat[index]['surname'];
				   var imgTc= dat[index]['imageUrl'];
				   var eml= dat[index]['email'];
				   var sts= dat[index]['status'];
				   var cty= dat[index]['qeydiyyatCity'];
				  
				   if(userId===idTc){

					  $("#user_name_pr").text(nm+" "+srnm);
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
					  $("#profile_picture_img").attr('src','https://app.sourcedagile.com/api/get/files/'+imgTc);
				   }
				   
				  	
			   }
			   
			  
			},

			error: function (jqXHR, status) {
				// error handler
				console.log(jqXHR);
				alert('fail' + status.code);
			}
		 });
   }
    
