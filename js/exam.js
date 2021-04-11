$(document).ready(function () {

    var currentQuestion = 0;
    var viewingAns = 0;
    var correctAnswers = 0;
    var quizOver = false;
    var iSelectedAnswer = [];
    var c = localStorage.getItem('TmEx');
    var t;

    function timedCount() {


        var hours = parseInt(c / 3600) % 24;
        var minutes = parseInt(c / 60) % 60;
        var seconds = c % 60;
        console.log(hours,minutes,seconds)
        var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
        $('#timer').html(result);

        if (c == 0) {
           // displayScore();
            $('#iTimeShow').html('Quiz Time Completed!');
            //$('#timer').html("You scored: " + correctAnswers + " out of: " + questions.length);
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
            url: UrlQb + "api/post/zdfn/qebulaz/" + likn + "",
            data: JSON.stringify(objectUser), // now data come in this function
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            success: function (data, status, jqXHR) {
                var dt = data.kv


                if (typ === 'close') {
                    var quest = dt['questionBody'];
                    var a = dt['answerA'];
                    var b = dt['answerB'];
                    var c = dt['answerC'];
                    var d = dt['answerD'];
                    var e = dt['answerE'];

                    $('#' + fgId + '.quizContainer').append(questGenBlockClose(fgId, quest, a, b, c, d, e));

                }
                if (typ === 'sadesual') {
                    var quest = dt['question'];
                    $('#' + fgId).append(questGenBlockOpen1(quest));
                }
                if (typ === '13aematrix') {
                    var quest = dt['question'];
                    $('#' + fgId).append(questGenBlockOpen2(quest));
                }
                if (typ === 'situasiya') {
                    var quest = dt['question'];
                    $('#' + fgId).append(questGenBlockStus(quest));
                }
            },

            error: function (jqXHR, status) {
                // error handler

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

    function questGenBlockOpen1(quest) {

        return `
        <div class="question_content">${quest}</div>
        <hr>
        <input type="text" class="form-control" name="" id="textOpensimple">
         `

    }

    function questGenBlockOpen2(quest) {

        return `
        <div class="question_content">${quest}</div>
        <hr>
        <div class="col-lg-6">
        <input disabled type="text" name="" class="form-control Input_button_list" id="">
        </div>
       
        <table class='col-lg-6 table_button_list'>
      <thead>
        <th>#</th>
        <th>A</th>
        <th>B</th>
        <th>C</th>
        <th>D</th>
        <th>E</th>
      </thead>
      <tbody>
         <tr>
           <th>1</th>
          <td><input type="checkbox" name="" id="1A"></td>
          <td><input type="checkbox" name="" id="1B"></td>
          <td><input type="checkbox" name="" id="1C"></td>
          <td><input type="checkbox" name="" id="1D"></td>
          <td><input type="checkbox" name="" id="1E"></td>
        </tr>
         <tr>
           <th>2</th>
          <td><input type="checkbox" name="" id=""></td>
          <td><input type="checkbox" name="" id=""></td>
          <td><input type="checkbox" name="" id=""></td>
          <td><input type="checkbox" name="" id=""></td>
          <td><input type="checkbox" name="" id=""></td>
        </tr>
         <tr>
           <th>3</th>
          <td><input type="checkbox" name="" id=""></td>
          <td><input type="checkbox" name="" id=""></td>
          <td><input type="checkbox" name="" id=""></td>
          <td><input type="checkbox" name="" id=""></td>
          <td><input type="checkbox" name="" id=""></td>
        </tr>
        
         
      </tbody>
    </table>
   
         `

    }

    function questGenBlockStus(quest) {

        return `
        <div class="question_content">${quest}</div>
        <hr>
        <textarea class="form-control" name="" id="textsituasiya" cols="30" rows="10"></textarea>
         `

    }

    $(document).on('click', '.number-quest-short-block span', function (e) {
        var datr = $(this).attr('data-numb-type')
        var act1 = $(this).parents('#fenn_list_block').find('.tab-pane.active').find('.active.quizContainer');
        act1.removeClass('active');

        var act = $(this).parents('#fenn_list_block').find('.tab-pane.active').find('#' + datr);
        act.addClass('active');

        act.empty();
        var type = act.attr('data-quest-type');
        var idts = act.attr('id');

        $('.number-quest-short-block').find('span').removeClass('active');
        $(this).addClass('active');
        if (type === 'close') {

            displayCurrentQuestion(type, idts, 'getQapaliSualBodyById')
        }
        if (type === 'sadesual') {
            displayCurrentQuestion(type, idts, 'getAciqSualBodyById')
        }
        if (type === '13aematrix') {
            displayCurrentQuestion(type, idts, 'getAciqSualBodyById')
        }
        if (type === 'situasiya') {
            displayCurrentQuestion(type, idts, 'getAciqSualBodyById')
        }
        setTimeout(function () {
            var hgt = $('#fenn_list_block').height();
            $('.answer_card_body').css('height', hgt + 'px');
        }, 500)

    })

    $(this).find(".preButton").on("click", function () {



        var act1 = $(this).parents('#fenn_list_block').find('.tab-pane.active').find('.active.quizContainer');
        var fkr = act1.index();
        console.log(fkr);
        if (fkr !== 1) {
            act1.prev().addClass('active');

            act1.removeClass('active');

            var act = $(this).parents('#fenn_list_block').find('.tab-pane.active').find('.active.quizContainer');
            act.empty();
            var type = act.attr('data-quest-type');
            var idts = act.attr('id');
            $('.number-quest-short-block').find('span').removeClass('active');
            $('[data-numb-type="' + idts + '"]').addClass('active');
            if (type === 'close') {

                displayCurrentQuestion(type, idts, 'getQapaliSualBodyById')
            }
            if (type === 'open') {
                displayCurrentQuestion(type, idts, 'getAciqSualBodyById')
            }
            if (type === 'situasiya') {
                displayCurrentQuestion(type, idts, 'getAciqSualBodyById')
            }
            setTimeout(function () {
                var hgt = $('#fenn_list_block').height();
                $('.answer_card_body').css('height', hgt + 'px');
            }, 500)
        }

    });


    // On clicking next, display the next question
    $(document).on('click', ".nextButton", function () {



        var act1 = $(this).parents('#fenn_list_block').find('.active').find('.quizContainer.active');


        if (act1.next().addClass('active')) {
            act1.removeClass('active');

            var act = $(this).parents('#fenn_list_block').find('.active').find('.quizContainer.active');
            act.empty();
            var type = act.attr('data-quest-type');
            var idts = act.attr('id');
            $('.number-quest-short-block').find('span').removeClass('active');
            $('[data-numb-type="' + idts + '"]').addClass('active');

            if (type === 'close') {

                displayCurrentQuestion(type, idts, 'getQapaliSualBodyById')
            }
            if (type === 'open') {
                displayCurrentQuestion(type, idts, 'getAciqSualBodyById')
            }
            if (type === 'situasiya') {
                displayCurrentQuestion(type, idts, 'getAciqSualBodyById')
            }
            setTimeout(function () {
                var hgt = $('#fenn_list_block').height();
                $('.answer_card_body').css('height', hgt + 'px');
            }, 500)
        }


    });

    $(document).on('click', '#un_checked_btn', function () {

        $('#fenn_list_block .active .active .data_cardAns').prop('checked', false);
        var art=$('#fenn_list_block .active .quizContainer.active').attr('id');
         console.log(art);
        var anscr = $('#table_answer_card .active').find('tr[data-numcard=' + art + ']');

        anscr.find('td span').removeClass('checkAns');
    })
    $(document).on('click', 'li.question_answers .data_cardAns', function () {

        var art = $(this).parents('.quizContainer').attr('id');
        var val = $(this).val();

        var anscr = $('#table_answer_card .active').find('tr[data-numcard=' + art + ']');

        anscr.find('td span').removeClass('checkAns');
        anscr.find('td').eq(val).find('span').addClass('checkAns');
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



    function activeAddClass() {



        $('#fenn_list_block .active .quizContainer').first().addClass('active');
        $('#fenn_list_block .active .number-quest-short-block span').first().click();
        /* 	var idts = $('#fenn_list_block .active .quizContainer').first().attr('id');
		var type = $('#fenn_list_block .active .quizContainer').first().attr('data-quest-type');


		if (type === 'close') {

			displayCurrentQuestion(type, idts, 'getQapaliSualBodyById')
		}
		if (type === 'open') {
			displayCurrentQuestion(type, idts, 'getAciqSualBodyById')
		}
		if (type === 'situasiya') {
			displayCurrentQuestion(type, idts, 'getAciqSualBodyById')
		}
 */
    };

    $(document).on('click', '#list_fenn_short li', function () {

        let id = $(this).find('a').attr('href');
        var s2 = id.substring(1);
        console.log(s2);
        $('#table_answer_card tbody').removeClass('active')
        $('#table_answer_card [mid=' + s2 + ']').addClass('active');
        $('.custom_tab_content #' + s2 + '').find(".number-quest-short-block span:first-child").click();

    })


    function genListFennName(nm, id, st) {
        return `
	  <li role="presentation" class="exam_fenn ">
	  <a href="#${id}" aria-controls="home" role="tab" class="${st}" data-toggle="tab">${nm}</a></li>
	  `
    }

    function genListFennBlock(nm, st) {
        return `<div role="tabpanel " class="tab-pane  ${st}" id="${nm}">
	  <div class="number-quest-short-block"></div>
	</div>
	  `
    }

    function genListAnswerBlock(id, st) {
        return `<tbody mid='${id}' class="${st}">

		</tbody>
	  `
    }
    var listFnm = [];

    startExamBlockGen();

    function startExamBlockGen() {
        var gId = localStorage.getItem('idExam');
        $.ajax({
            type: "POST",
            url: UrlQb + "api/post/zd/qebulaz/getImtahanTreeList",
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
                        var blockid = 873642734
                        for (let inx = 0; inx < fenn_arr.length; inx++) {



                            if (fenn_arr[inx] === '') {


                            } else {
                                listFnm.push(blockid);

                                if (inx === 0) {

                                    $('#list_fenn_short').append(genListFennName(fenn_arr[inx], blockid, 'active'));
                                    $('#fenn_list_block').prepend(genListFennBlock(blockid, 'active'));
                                    $('#table_answer_card').prepend(genListAnswerBlock(blockid, 'active'));


                                } else {
                                    $('#list_fenn_short').append(genListFennName(fenn_arr[inx], blockid, ''));
                                    $('#fenn_list_block').prepend(genListFennBlock(blockid, ''));
                                    $('#table_answer_card').prepend(genListAnswerBlock(blockid, ''));
                                }

                            }
                            blockid++
                        }

                        //ilst.append(genExamBlock(idTc, nameTc,imgTc));


                    }

                }

                timedCount()
                startQuestBlockGen(gId)
            },

            error: function (jqXHR, status) {
                // error handler

                alert('fail' + status.code);
            }
        });

    }


    function startQuestBlockGen(idg) {


        for (let ixe = 0; ixe < listFnm.length; ixe++) {
            var sctNm = listFnm[ixe]
            var exdat1 = {
                "kv": {
                    "fkImtahanNovuId": idg,
                    "fkUserId": 444
                }
            }



            startQuestBlockGenCore(exdat1, ixe, sctNm);



        }
        setTimeout(function () {

            activeAddClass();
        }, 1000);




    }

    function startQuestBlockGenCore(exdat1, ixe, sctNm) {



        $.ajax({
            type: "POST",
            url: UrlQb + "api/post/zdfn/qebulaz/abituriyentImtahaninTeskili",
            data: JSON.stringify(exdat1), // now data come in this function
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            success: function (data, status, jqXHR) {
                var ir = ixe + 1
                var dat = data.kv['section' + ir + 'QapaliSuallar'].split(',')
                let cnt = 1
                for (let ix = 0; ix < dat.length; ix++) {

                    $('#' + sctNm).append(
                        $('<div>').addClass('quizContainer')
                        .attr('id', dat[ix])
                        .attr('data-quest-type', 'close')
                    )


                    $('#table_answer_card [mid=' + sctNm + ']').append($('<tr>')
                        .attr('data-numCard', dat[ix])
                        .append('<th>' + cnt + '</th>')
                        .append('<td><span>A</span></td>')
                        .append('<td><span>B</span></td>')
                        .append('<td><span>C</span></td>')
                        .append('<td><span>D</span></td>')
                        .append('<td><span>E</span></td>'));
                    if (cnt === 1) {
                        $('#' + sctNm + ' .number-quest-short-block').append(
                            $('<span>').text(cnt)
                            .addClass('active')
                            .attr('data-numb-type', dat[ix])
                        )
                        cnt++
                    } else {

                        $('#' + sctNm + ' .number-quest-short-block').append(
                            $('<span>').text(cnt)
                            .attr('data-numb-type', dat[ix]))


                        cnt++
                    }


                }
                var dat1 = data.tbl[ixe].r

                for (let ix1 = 0; ix1 < dat1.length; ix1++) {

                    $('#' + sctNm).append(
                        $('<div>').addClass('quizContainer')
                        .attr('id', dat1[ix1]['id'])
                        .attr('data-quest-type', dat1[ix1]['questionType'])
                    )
                    $('#table_answer_card [mid=' + sctNm + ']').append($('<tr>')
                        .attr('data-numCard', dat1[ix1]['id'])
                        .append('<th>' + cnt + '</th>')
                        .append('<td>-</td>')
                        .append('<td>-</td>')
                        .append('<td>-</td>')
                        .append('<td>-</td>')
                        .append('<td>-</td>'));
                    if (cnt === 1) {
                        $('#' + sctNm + ' .number-quest-short-block').append(
                            $('<span>').text(cnt)
                            .addClass('active')
                            .attr('data-numb-type', dat1[ix1]['id'])
                        )
                        cnt++
                    } else {

                        $('#' + sctNm + ' .number-quest-short-block').append(
                            $('<span>').text(cnt)
                            .attr('data-numb-type', dat1[ix1]['id']))

                        cnt++
                    }


                }
                var dat2 = data.kv['section' + ir + 'SituasiyaSuallar'].split(',')

                for (let ix2 = 0; ix2 < dat2.length; ix2++) {

                    $('#' + sctNm).append(
                        $('<div>').addClass('quizContainer')
                        .attr('id', dat2[ix2])
                        .attr('data-quest-type', 'situasiya')
                    )

                    $('#table_answer_card [mid=' + sctNm + ']').append($('<tr>')
                        .attr('data-numCard', dat2[ix2])
                        .append('<th>' + cnt + '</th>')
                        .append('<td>-</td>')
                        .append('<td>-</td>')
                        .append('<td>-</td>')
                        .append('<td>-</td>')
                        .append('<td>-</td>'));
                    if (cnt === 1) {
                        $('#' + sctNm + ' .number-quest-short-block').append(
                            $('<span>').text(cnt)
                            .addClass('active')
                            .attr('data-numb-type', dat2[ix2])
                        )
                        cnt++
                    } else {

                        $('#' + sctNm + ' .number-quest-short-block').append(
                            $('<span>').text(cnt)
                            .attr('data-numb-type', dat2[ix2]))

                        cnt++
                    }


                }

            },

            error: function (jqXHR, status) {
                // error handler

                alert('fail' + status.code);
            }
        });

    }
    //answer card generate 



})