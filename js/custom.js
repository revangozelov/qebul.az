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


	});

	$(window).on('load',function () {
		$(".tab .nav ul li").click(function() {
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

		  
		  function bioText() {
			bio.oldText = bio.text();
		  
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

	if(nm,surnm,eml,numb,stts.trim().length > 3){
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
						
						console.log('sended');
					  
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

   $(document).ready(function(){
	
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
	
});