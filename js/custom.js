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
	/* ..............................................
	    Scroll To Top
	    ................................................. */
	$(window).on('scroll', function () {
		if ($(window).scrollTop() > 50) {
			$('.top-header').addClass('fixed-menu');
			$('.top-header').css('top', '0');
		} else {
			$('.top-header').removeClass('fixed-menu');
			$('.top-header').css('top', '10px');
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
	$(".data_picker").datepicker();
	//open and close tab menu
	$('.nav-tabs-dropdown')
		.on("click", "li:not('.active') a", function (event) {
			$(this).closest('ul').removeClass("open");
		})
		.on("click", "li.active a", function (event) {
			$(this).closest('ul').toggleClass("open");
		});





	$(document).on('click', '#notification_btn', function () {
		$('.notification').toggle('fast');
		$('.blip').css('display', 'none');
	})
	$(document).on('click', '#notification_close', function () {

		$('.notification').toggle('fast')
	})



});





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
}, {
	question: "6. Which software company developed JavaScript?",
	choices: ["Mozilla", "Netscape", "Sun Microsystems", "Oracle"],
	correctAnswer: 1
}, {
	question: "7. What would be the result of 3+2+'7'?",
	choices: ["327", "12", "14", "57"],
	correctAnswer: 3
}, {
	question: "8. Look at the following selector: $('div'). What does it select?",
	choices: ["The first div element", "The last div element", "All div elements", "Current div element"],
	correctAnswer: 2
}, {
	question: "9. How can a value be appended to an array?",
	choices: ["arr(length).value;", "arr[arr.length]=value;", "arr[]=add(value);", "None of these"],
	correctAnswer: 1
}, {
	question: "10. What will the code below output to the console? console.log(1 +  +'2' + '2');",
	choices: ["'32'", "'122'", "'13'", "'14'"],
	correctAnswer: 0
}];


var currentQuestion = 0;
var viewingAns = 0;
var correctAnswers = 0;
var quizOver = false;
var iSelectedAnswer = [];
var c = localStorage.getItem('TmEx');
var t;
//quiz template 
function timedCount() {

	if (c == 180) {
		return false;
	}

	var hours = parseInt(c / 3600) % 24;
	var minutes = parseInt(c / 60) % 60;
	var seconds = c % 60;
	var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
	$('#timer').html(result);

	if (c == 0) {
		displayScore();
		$('#iTimeShow').html('Quiz Time Completed!');
		//$('#timer').html("You scored: " + correctAnswers + " out of: " + questions.length);
		c = 185;
		$(document).find(".preButton").text("View Answer");
		$(document).find(".nextButton").html('<i class="fas fa-redo"></i>');
		quizOver = true;
		return false;

	}


	c = c - 1;
	t = setTimeout(function () {
		timedCount();
		localStorage.setItem('TmEx', c)
	}, 1000);
	// This displays the current question AND the choices

}

function displayCurrentQuestion(typ, fgId, likn) {

	let objectUser = {
		"kv": {
			"id": fgId,

		}
	}
	$.ajax({
		type: "POST",
		url: "https://app.sourcedagile.com/api/post/zdfn/qebulaz/" + likn + "",
		data: JSON.stringify(objectUser), // now data come in this function
		contentType: "application/json; charset=utf-8",
		crossDomain: true,
		dataType: "json",
		success: function (data, status, jqXHR) {
			var dt = data.kv

			var quest = dt['questionBody'];
			if (typ === 'close') {

				var a = dt['answerA'];
				var b = dt['answerB'];
				var c = dt['answerC'];
				var d = dt['answerD'];
				var e = dt['answerE'];

				$('#' + fgId + '.quizContainer').append(questGenBlockClose(fgId, quest, a, b, c, d, e));

			}
			if (typ === 'open') {
				$('#' + fgId).append(questGenBlockOpen(quest));
			}
			if (typ === 'stuasiya') {
				$('#' + fgId).append(questGenBlockStus(quest));
			}
		},

		error: function (jqXHR, status) {
			// error handler
			console.log(jqXHR);
		}
	});

}

function questGenBlockClose(id, quest, a, b, c, d, e) {

	return `
	<div class="question_content"> ${quest}</div>
	<hr>
	<ul class="choiceList">
	  <li class="question_answers"><span>A)</span><input type="radio" class="data_cardAns radio-inline" value="0" name="dynradio${id}">${a}</li>
	  <li class="question_answers"><span>B)</span><input type="radio" class="data_cardAns  radio-inline" value="1" name="dynradio${id}">${b}</li>
	  <li class="question_answers"><span>C)</span><input type="radio" class="data_cardAns  radio-inline" value="2" name="dynradio${id}">${c}</li>
	  <li class="question_answers"><span>D)</span><input type="radio" class="data_cardAns  radio-inline" value="3" name="dynradio${id}">${d}</li>
	  <li class="question_answers"><span>E)</span><input type="radio" class="data_cardAns  radio-inline" value="4" name="dynradio${id}">${e}</li>
	</ul>
	 `

}

function questGenBlockOpen(quest) {

	return `
	<div class="question_content">${quest}</div>
	<hr>
	<ul class="choiceList">

	</ul>
	 `

}

function questGenBlockStus(quest) {

	return `
	<div class="question_content">${quest}</div>
	<hr>
	<ul class="choiceList">

	</ul>
	 `

}


$(document).ready(function () {
	// Display the first question

	

	$(this).find(".preButton").on("click", function () {

		var act1 = $(this).parents('#fenn_list_block').find('.tab-pane.active').find('.active.quizContainer');

		act1.before().addClass('active');

		act1.removeClass('active');

		var act = $(this).parents('#fenn_list_block').find('.tab-pane.active').find('.active.quizContainer');
		var type = act.attr('data-quest-type');
		var idts = act.attr('id');

		if (type === 'close') {

			displayCurrentQuestion(type, idts, 'getQapaliSualBodyById')
		}
		if (type === 'open') {
			displayCurrentQuestion(type, idts, 'getAciqSualBodyById')
		}
		if (type === 'stuasiya') {
			displayCurrentQuestion(type, idts, '')
		}

	});


	// On clicking next, display the next question
	$(document).on('click',".nextButton", function () {



		var act1 = $(this).parents('#fenn_list_block').find('.active').find('.quizContainer.active');

		act1.after().addClass('active');
		act1.removeClass('active');

		var act =$(this).parents('#fenn_list_block').find('.active').find('.quizContainer.active');

		var type = act.attr('data-quest-type');
		var idts = act.attr('id');
		console.log(act);
		if (type === 'close') {

			displayCurrentQuestion(type, idts, 'getQapaliSualBodyById')
		}
		if (type === 'open') {
			displayCurrentQuestion(type, idts, 'getAciqSualBodyById')
		}
		if (type === 'stuasiya') {
			displayCurrentQuestion(type, idts, '')
		}







	});

	$(document).on('click', '#un_checked_btn', function () {

		$('.question_answers input').prop('checked', false)
	})



	function resetQuiz() {
		currentQuestion = 0;
		correctAnswers = 0;
		hideScore();
	}

	function displayScore() {
		$(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
		$(document).find(".quizContainer > .result").show();
	}

	function hideScore() {
		$(document).find(".result").hide();
	}

	// This displays the current question AND the choices
	function viewResults() {

		if (currentQuestion == 10) {
			currentQuestion = 0;
			return false;
		}
		if (viewingAns == 1) {
			return false;
		}

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


		for (i = 0; i < numChoices; i++) {
			choice = questions[currentQuestion].choices[i];

			if (iSelectedAnswer[currentQuestion] == i) {
				if (questions[currentQuestion].correctAnswer == i) {
					$('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
				} else {
					$('<li style="border:2px solid red;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
				}
			} else {
				if (questions[currentQuestion].correctAnswer == i) {
					$('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
				} else {
					$('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' + ' ' + choice + '</li>').appendTo(choiceList);
				}
			}
		}

		currentQuestion++;

		setTimeout(function () {
			viewResults();
		}, 3000);
	}

});



let userId = '';

//user info set 
$(document).ready(function () {

	function activeAddClass() {



		$('#fenn_list_block .active .quizContainer').first().addClass('active');
		var idts = $('#fenn_list_block .active .quizContainer').first().attr('id');
		var type = $('#fenn_list_block .active .quizContainer').first().attr('data-quest-type');


		if (type === 'close') {

			displayCurrentQuestion(type, idts, 'getQapaliSualBodyById')
		}
		if (type === 'open') {
			displayCurrentQuestion(type, idts, 'getAciqSualBodyById')
		}
		if (type === 'stuasiya') {
			displayCurrentQuestion(type, idts, '')
		}

	};

	$(document).on('click', '#imtahan_list_index div', function () {

		let id = $(this).attr('id')
		$("imtahan_list_inside").empty();
		addExamList(id)

	})
	$(document).on('click', '#imtahan_list_inside div', function () {

		let id = $(this).attr('id')
		window.location.href = 'exam.html';

		localStorage.setItem('idExam', id)


	})

	function genListFennName(nm, st) {
		return `
	  <li role="presentation" class="exam_fenn ">
	  <a href="#${nm.trim()}" aria-controls="home" role="tab" class="${st}" data-toggle="tab">${nm}</a></li>
	  `
	}

	function genListFennBlock(nm, st) {
		return `<div role="tabpanel " class="tab-pane  ${st}" id="${nm.trim()}">
	  <div class="number-quest-short-block"></div>
	</div>
	  `
	}
	var listFnm = [];

	startExamBlockGen();

	function startExamBlockGen() {
		var gId = localStorage.getItem('idExam');
		$.ajax({
			type: "POST",
			url: "https://app.sourcedagile.com/api/post/zd/qebulaz/getImtahanTreeList",
			// now data come in this function
			contentType: "application/json; charset=utf-8",
			crossDomain: true,
			dataType: "json",
			success: function (data, status, jqXHR) {
				var dat = data.tbl[0].r

				for (let index = 0; index < dat.length; index++) {
					var idTc = dat[index]['id'];
					if (gId === idTc) {
						var fenn_arr = [];
						var sect1 = dat[index]['section1'];
						var sect2 = dat[index]['section2'];
						var sect3 = dat[index]['section3'];
						var sect4 = dat[index]['section4'];
						var sect5 = dat[index]['section5'];
						fenn_arr.push(sect1, sect2, sect3, sect4, sect5)

						for (let inx = 0; inx < fenn_arr.length; inx++) {

							if (fenn_arr[inx] === '') {


							} else {
								listFnm.push(fenn_arr[inx])
								if (inx === 0) {

									$('#list_fenn_short').append(genListFennName(fenn_arr[inx], 'active'));
									$('#fenn_list_block').prepend(genListFennBlock(fenn_arr[inx], 'active'));

								} else {
									$('#list_fenn_short').append(genListFennName(fenn_arr[inx], ''));
									$('#fenn_list_block').prepend(genListFennBlock(fenn_arr[inx], ''));

								}
							}

						}

						//ilst.append(genExamBlock(idTc, nameTc,imgTc));


					}

				}

				timedCount()
				startQuestBlockGen(gId)
			},

			error: function (jqXHR, status) {
				// error handler
				console.log(jqXHR);
				alert('fail' + status.code);
			}
		});

	}


	function startQuestBlockGen(idg) {


		for (let ixe = 0; ixe < listFnm.length; ixe++) {
			var exdat1 = {
				"kv": {
					"fkImtahanNovuId": idg,
					"section": ixe
				}
			}



			startQuestBlockGenCore(exdat1, ixe);



		}
		setTimeout(function () {

			activeAddClass();
		}, 1000);




	}

	function startQuestBlockGenCore(exdat1, ixe) {



		$.ajax({
			type: "POST",
			url: "https://app.sourcedagile.com/api/post/zdfn/qebulaz/getSuallarByImtahanNovuAndSection",
			data: JSON.stringify(exdat1), // now data come in this function
			contentType: "application/json; charset=utf-8",
			crossDomain: true,
			dataType: "json",
			success: function (data, status, jqXHR) {
				var dat = data.kv['qapaliSuallar'].split(',')
				let cnt = 1
				for (let ix = 0; ix < dat.length; ix++) {

					$('#' + listFnm[ixe].trim()).append(
						$('<div>').addClass('quizContainer')
						.attr('id', dat[ix])
						.attr('data-quest-type', 'close')
					)


					$('.answer_card_body tbody').append($('<tr>')
						.attr('data-numCard', dat[ix])
						.append('<th>' + cnt + '</th>')
						.append('<td><span>A</span></td>')
						.append('<td><span>B</span></td>')
						.append('<td><span>C</span></td>')
						.append('<td><span>D</span></td>')
						.append('<td><span>E</span></td>'));
					if (cnt === 1) {
						$('#' + listFnm[ixe] + ' .number-quest-short-block').append(
							$('<span>').text(cnt)
							.addClass('active')
							.attr('data-numb-type', dat[ix])
						)
						cnt++
					} else {

						$('#' + listFnm[ixe] + ' .number-quest-short-block').append(
							$('<span>').text(cnt)
							.attr('data-numb-type', dat[ix]))


						cnt++
					}


				}
				var dat1 = data.kv['aciqSuallar'].split(',')

				for (let ix = 0; ix < dat1.length; ix++) {

					$('#' + listFnm[ixe].trim()).append(
						$('<div>').addClass('quizContainer')
						.attr('id', dat[ix])
						.attr('data-quest-type', 'open')
					)
					$('.answer_card_body tbody').append($('<tr>')
						.attr('data-numCard', dat[ix])
						.append('<th>' + cnt + '</th>')
						.append('<td>-</td>')
						.append('<td>-</td>')
						.append('<td>-</td>')
						.append('<td>-</td>')
						.append('<td>-</td>'));
					if (cnt === 1) {
						$('#' + listFnm[ixe] + ' .number-quest-short-block').append(
							$('<span>').text(cnt)
							.addClass('active')
							.attr('data-numb-type', dat[ix])
						)
						cnt++
					} else {

						$('#' + listFnm[ixe] + ' .number-quest-short-block').append(
							$('<span>').text(cnt)
							.attr('data-numb-type', dat[ix]))

						cnt++
					}


				}
				var dat2 = data.kv['situasiyaSuallar'].split(',')

				for (let ix = 0; ix < dat2.length; ix++) {

					$('#' + listFnm[ixe].trim()).append(
						$('<div>').addClass('quizContainer')
						.attr('id', dat[ix])
						.attr('data-quest-type', 'stuasiya')
					)

					$('.answer_card_body tbody').append($('<tr>')
						.attr('data-numCard', dat[ix])
						.append('<th>' + cnt + '</th>')
						.append('<td>-</td>')
						.append('<td>-</td>')
						.append('<td>-</td>')
						.append('<td>-</td>')
						.append('<td>-</td>'));
					if (cnt === 1) {
						$('#' + listFnm[ixe] + ' .number-quest-short-block').append(
							$('<span>').text(cnt)
							.addClass('active')
							.attr('data-numb-type', dat[ix])
						)
						cnt++
					} else {

						$('#' + listFnm[ixe] + ' .number-quest-short-block').append(
							$('<span>').text(cnt)
							.attr('data-numb-type', dat[ix]))

						cnt++
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
	//answer card generate 

	getUserInfoProfile();
	//teacher post api 

	function genExamBlock(id, nam, img) {

		return `<div id='${id}' class="col-md-4" data-aos="zoom-in" data-aos-delay="200">
	   <div class="full1 blog_img_popular">
		   <img class="img-responsive" src="https://app.sourcedagile.com/api/get/files/${img}" alt="#" />
		   <h4>${nam}</h4>
	   </div>
      </div>`

	}



	function addExamList(gId) {

		$.ajax({
			type: "POST",
			url: "https://app.sourcedagile.com/api/post/zd/qebulaz/getImtahanTreeList",
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
						localStorage.setItem('TmEx', time)
						ilst.append(genExamBlock(idTc, nameTc, imgTc));


					}

				}
				ilst.css('display', 'flex');
				$('#imtahan_list_index').css('display', 'none');

			},

			error: function (jqXHR, status) {
				// error handler
				console.log(jqXHR);
				alert('fail' + status.code);
			}
		});
	}

	function genTeacherBlock(id, img, name, fenn) {

		return $('<div>')
			.addClass('col-sm-6 col-lg-4 col-xl-3')
			.attr('id', id)
			.append($('<div>')
				.addClass('single-person')
				.append($('<div>')
					.addClass('person-image')
					.append('<img src="https://app.sourcedagile.com/api/get/files/' + img + '" alt="">'))
				.append($('<div>')
					.addClass('person-info')
					.append('<h3 class="full-name center">' + name + '</h3>')
					.append('<span class="speciality center">' + fenn + '</span>')
				))



	}


	function addDataTeacher(data) { // pass your data in method
		$.ajax({
			type: "POST",
			url: "https://app.sourcedagile.com/api/post/zd/qebulaz/getMuellimlerList",
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
				console.log(jqXHR);
				alert('fail' + status.code);
			}
		});
	}

	addDataTeacher();
	//news  post api 
	function genNewsBlokMini(id, title, bdy, Date, imgN) {
		return $('<div>')
			.addClass('col-lg-3 col-md-3 col-sm-12')
			.attr('id', id)
			.append($('<div>')
				.addClass('full blog_img_popular')
				.append('<img class="img-responsive" src="https://app.sourcedagile.com/api/get/files/' + imgN + '" alt="#' + title + '" />')
				.append('<h4 class="data-newssend">' + title + '</h4>')
				.append('<p>' + bdy + '</p>')
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
				.append('<div class="full float-right_img"><img class="data_newsImg" src="https://app.sourcedagile.com/api/get/files/' + imgN + '" alt="#"></div>'))
			.append($('<div>')
				.addClass('data_newsTxt col-lg-8 col-md-8 col-sm-12')
				.append('<h4>' + title + '</h4>')
				.append('<span>' + bdy + '</span>')
				.append('<p>' + Date + '</p>')
			)

	}

	function addDataNews(data) { // pass your data in method
		$.ajax({
			type: "POST",
			url: "https://app.sourcedagile.com/api/post/zd/qebulaz/getNewsList",
			data: JSON.stringify(data), // now data come in this function
			contentType: "application/json; charset=utf-8",
			crossDomain: true,
			dataType: "json",
			success: function (data, status, jqXHR) {
				var dat = data.tbl[0].r


				for (let index = 0; index < dat.length; index++) {

					var idNw = dat[index]['id'];
					var imgNw = dat[index]['thumbImg'];
					var titleNw = dat[index]['newsTitle'];
					var inDateNw = dat[index]['insertDate'];

					var bodyNw = dat[index]['newsBody'];

					$('#news-mini-block').prepend(genNewsBlokMini(idNw, titleNw, bodyNw, inDateNw, imgNw));
					$('#news-large-block').prepend(genNewsBlokLarge(idNw, titleNw, bodyNw, inDateNw, imgNw));
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
	function resetFlud(email) {

		$('#name_input_qb').val('');
		$('#surname_input_qb').val('');
		$('#email_input_qb').val('');
		$('#number_input_qb').val('');
		$('#password_input_qb').val('');
		$('#repassword_input_qb').val('');
		$('#status_select_qb').val('');



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

		if (nm && surnm && eml && numb.trim().length > 3) {
			if (pass.trim().length > 3) {

				if (pass == repass) {


					$.ajax({
						type: "POST",
						url: "https://app.sourcedagile.com/api/post/zd/qebulaz/insertNewUser",
						data: JSON.stringify(objectUser), // now data come in this function
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

	function updateProgress(evt) {

		var prec = $('.percentTst');
		var percentLoaded = Math.round((evt.loaded / evt.total) * 100);

		prec.css("width", percentLoaded + '%');
		prec.text(percentLoaded + '%');

	}

	function uploadFile4Ipo(id) {
		var prec = $('.percentTst');
		var r = "";
		var that = this;
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
				prec.css('width', '0%');
				prec.text('0%');
				reader.fileName = fname;
				reader.fileExt = fileext;
				reader.fileNo = i;
				reader.onprogress = updateProgress;
				reader.onloadstart = function (e) {
					$('#progress_bar').addClass('loading');
				}
				reader.onload = function (readerEvt) {
					prec.css('width', '100%');
					prec.text('100%');

					setTimeout(function () {
						$('#progress_bar').removeClass('loading');
					}, 2000);
					trc++;
					var fname1 = readerEvt.target.fileName;
					var fileext1 = readerEvt.target.fileExt;
					var fileNo = readerEvt.target.fileNo;

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
			url: "https://app.sourcedagile.com/api/post/upload",
			type: "POST",
			data: dat,
			contentType: "application/json",
			async: false,
			success: function (data) {
				finalname = data.kv.uploaded_file_name;
				console.log('okey');
			},
			error: function () {
				console.log('fail');
			}
		});
		return finalname;
	}
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
				url: "https://app.sourcedagile.com/api/post/zd/qebulaz/updateUserInfo",
				data: JSON.stringify(objectUser1), // now data come in this function
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

		} else {
			alert('Zəhmət olmasa bütün xanaları doldurun!!!');
		}

	})
	$(document).on("click", '#exit_profile_name', function () {

		localStorage.UserName = '';

		location.reload()

	})

	$(document).on("click", '#sign_in_btn', function () {
		var userNm = $(this).parents('.modal-content').find('#exampleInputEmail1').val();
		var userPass = $(this).parents('.modal-content').find('#exampleInputPassword1').val();
		getUserLogin(userNm, userPass)

		$('#exampleModal').modal("toggle");
	})

	function getUserLogin(usNm, pass) {

		let datUs = {
			"kv": {
				"username": "" + usNm + "",
				"password": "" + pass + ""


			}
		}
		$.ajax({
			type: "POST",
			url: "https://app.sourcedagile.com/api/post/zdfn/qebulaz/login",
			data: JSON.stringify(datUs), // now data come in this function
			contentType: "application/json; charset=utf-8",
			crossDomain: true,
			dataType: "json",
			success: function (data, status, jqXHR) {
				var dat = data.kv;

				// $('#user_from_sub').submit();
				localStorage.UserName = dat['userCode'];
				getUserInfoProfile();
			},

			error: function (jqXHR, status) {
				// error handler
				console.log(jqXHR);
				alert('fail' + status.code);
			}
		});
	}

	function getUserInfoProfile() { // pass your data in method

		userId = localStorage.UserName;
		if (userId.length > 0) {


			$('#login_btn_data').css('display', 'none');
			$('[data-target="#exampleModal"]').css('display', 'none');
			$('.navbar-custom-menu').css('display', 'block');

			$.ajax({
				type: "POST",
				url: "https://app.sourcedagile.com/api/post/zdfn/qebulaz/getUserList",
				//	data: JSON.stringify(data), // now data come in this function
				contentType: "application/json; charset=utf-8",
				crossDomain: true,
				dataType: "json",
				success: function (data, status, jqXHR) {
					var dat = data.tbl[0].r


					for (let index = 0; index < dat.length; index++) {

						var idTc = dat[index]['userCode'];
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
							$("#profile_picture_img").attr('src', 'https://app.sourcedagile.com/api/get/files/' + imgTc);
							userImageIn(imgTc, nm, srnm);
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
	}

	//User sign in function
	function userImageIn(img, name, srnm) {

		$('#user_index_img').attr('src', 'https://app.sourcedagile.com/api/get/files/' + img);
		$('#user_index_img_large').attr('src', 'https://app.sourcedagile.com/api/get/files/' + img);
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
	addTableRespBtn()

});


AOS.init();