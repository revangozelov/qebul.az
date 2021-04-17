$(document).ready(function () {
     
    var fkImtID ;
    var c = localStorage.getItem('TmEx');
     var nameEx=localStorage.getItem('nameExam')
    var t;

    function timedCount() {
          
        

        var hours = parseInt(c / 3600) % 24;
        var minutes = parseInt(c / 60) % 60;
        var seconds = c % 60;
       
        var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
        $('#timer').html(result);

        if (c == 0) {

            examEndFuncCore();
            return false;

        }


        c = c - 1;
        t = setTimeout(function () {
            timedCount();
            localStorage.TmEx=c;
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
                if (typ === '13acmatrix') {
                    var quest = dt['question'];
                    $('#' + fgId).append(questGenBlockOpen3(quest));
                }
                if (typ === '09onluqkesir') {
                    var quest = dt['question'];
                    $('#' + fgId).append(questGenBlockOpen4(quest));
                }
                if (typ === 'situasiya') {
                    var quest = dt['question'];
                    var crs = dt['answer'];
                  
                    $('#' + fgId).append(questGenBlockStus(quest,crs));
                }

                var hgt = $('#fenn_list_block').height();
                $('.answer_card_body').css('height', hgt + 'px');
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
          <li class="question_answers"><span>A)</span><input type="radio" data-fkAns="A" class="resultFk data_cardAns radio-inline" value="0" name="dynradio${id}">${a}</li>
          <li class="question_answers"><span>B)</span><input type="radio" data-fkAns="B" class="resultFk data_cardAns  radio-inline" value="1" name="dynradio${id}">${b}</li>
          <li class="question_answers"><span>C)</span><input type="radio" data-fkAns="C" class="resultFk data_cardAns  radio-inline" value="2" name="dynradio${id}">${c}</li>
          <li class="question_answers"><span>D)</span><input type="radio" data-fkAns="D" class="resultFk data_cardAns  radio-inline" value="3" name="dynradio${id}">${d}</li>
          <li class="question_answers"><span>E)</span><input type="radio" data-fkAns="E" class="resultFk data_cardAns  radio-inline" value="4" name="dynradio${id}">${e}</li>
        </ul>
         `

    }

    function questGenBlockOpen1(quest) {

        return `
        <div class="question_content">${quest}</div>
        <hr>
        <input type="text" class="resultFk form-control" name="" id="textOpensimple">
         `

    }

    function questGenBlockOpen2(quest) {

        return `
        <div class="question_content">${quest}</div>
        <hr>
        <div class="col-lg-6">
        <input disabled type="text" name="" class="resultFk form-control Input_button_list" id="">
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
      <tr data-vall="1">
      <th>1</th>
       <td><input type="checkbox" name="" value="A"></td>
       <td><input type="checkbox" name="" value="B"></td>
       <td><input type="checkbox" name="" value="C"></td>
       <td><input type="checkbox" name="" value="D"></td>
       <td><input type="checkbox" name="" value="E"></td>
   
      </tr>
      <tr data-vall="2">
      <th>1</th>
       <td><input type="checkbox" name="" value="A"></td>
       <td><input type="checkbox" name="" value="B"></td>
       <td><input type="checkbox" name="" value="C"></td>
       <td><input type="checkbox" name="" value="D"></td>
       <td><input type="checkbox" name="" value="E"></td>
   
      </tr>
      <tr data-vall="3">
      <th>3</th>
       <td><input type="checkbox" name="" value="A"></td>
       <td><input type="checkbox" name="" value="B"></td>
       <td><input type="checkbox" name="" value="C"></td>
       <td><input type="checkbox" name="" value="D"></td>
       <td><input type="checkbox" name="" value="E"></td>
   
      </tr>
        
         
      </tbody>
    </table>
   
         `

    }
    function questGenBlockOpen3(quest) {

        return `
        <div class="question_content">${quest}</div>
        <hr>
        <div class="col-lg-6">
        <input disabled type="text" name="" class="resultFk form-control Input_button_list" id="">
        </div>
       
        <table class='col-lg-6 table_button_list'>
      <thead>
        <th>#</th>
        <th>A</th>
        <th>B</th>
        <th>C</th>
        
      </thead>
      <tbody>
         <tr data-vall="1">
           <th>1</th>
           <td><input type="checkbox" name="" value="A"></td>
           <td><input type="checkbox" name="" value="B"></td>
           <td><input type="checkbox" name="" value="C"></td>
        
        </tr>
         <tr data-vall="2">
           <th>2</th>
          <td><input type="checkbox" name="" value="A"></td>
          <td><input type="checkbox" name="" value="B"></td>
          <td><input type="checkbox" name="" value="C"></td>
          
        </tr>
         <tr data-vall="3">
           <th>3</th>
           <td><input type="checkbox" name="" value="A"></td>
           <td><input type="checkbox" name="" value="B"></td>
           <td><input type="checkbox" name="" value="C"></td>
        
        </tr>
        
         
      </tbody>
    </table>
   
         `

    }
    function questGenBlockOpen4(quest) {

        return `
        <div class="question_content">${quest}</div>
        <hr>
        <div class="col-lg-6">
        <input disabled type="text" name="" class="resultFk form-control Input_button_list" id="">
        </div>
       
        <table class='col-lg-6 table_button_list'>
      <thead>
        <th>#</th>
        <th>A</th>
        <th>B</th>
        <th>C</th>
        
      </thead>
      <tbody>
         <tr data-vall="1">
           <th>1</th>
           <td><input type="checkbox" name="" value="A"></td>
           <td><input type="checkbox" name="" value="B"></td>
           <td><input type="checkbox" name="" value="C"></td>
        
        </tr>
         <tr data-vall="2">
           <th>2</th>
          <td><input type="checkbox" name="" value="A"></td>
          <td><input type="checkbox" name="" value="B"></td>
          <td><input type="checkbox" name="" value="C"></td>
          
        </tr>
         <tr data-vall="3">
           <th>3</th>
           <td><input type="checkbox" name="" value="A"></td>
           <td><input type="checkbox" name="" value="B"></td>
           <td><input type="checkbox" name="" value="C"></td>
        
        </tr>
        
         
      </tbody>
    </table>
   
         `

    }

    function questGenBlockStus(quest,crs) {

        return `
        <div class="question_content">${quest}</div>
        <hr>
        <input type="radio" name="result" data-fkans="0" class="resultFk">
        <span class="situasiya_bl">0 Bal</span>
  
        <input type="radio" name="result" data-fkans="1" class="resultFk">
        <span class="situasiya_bl">1 Bal</span>
        
        <input type="radio" name="result" data-fkans="2" class="resultFk">
        <span class="situasiya_bl">2 Bal</span>
      
       
        <button class="show_answer btn btn-primary">Düzgün Cavab</button>
        <br>
        <span class="correct_answer">${crs}</span>
        
         `

    }

    function generateBlockQuestInside(type,idts){
        if (type === 'close') {

            displayCurrentQuestion(type, idts, 'getQapaliSualBodyById')
        }
        if (type === 'sadesual') {
            displayCurrentQuestion(type, idts, 'getAciqSualBodyById')
        }
        if (type === '13aematrix') {
            displayCurrentQuestion(type, idts, 'getAciqSualBodyById')
        }
        if (type === '13acmatrix') {
            displayCurrentQuestion(type, idts, 'getAciqSualBodyById')
        }
        if (type === '09onluqkesir') {
            displayCurrentQuestion(type, idts, 'getAciqSualBodyById')
        }
        if (type === 'cedvel') {
            displayCurrentQuestion(type, idts, 'getAciqSualBodyById')
        }
        if (type === 'situasiya') {
            displayCurrentQuestion(type, idts, 'getAciqSualBodyById')
        }
    }

    $(document).on('click',".table_button_list tbody tr td input",function(){

        var vl = $(this).parents('tbody').find('tr');
        var ale=[];
      
        for (let index = 0; index < vl.length; index++) {
                var ts= $(vl[index]).find('input')
                ale.push($(vl[index]).attr('data-vall'));

                for (let i = 0; i < ts.length; i++) {

                    if($(ts[i]).is(':checked')){



                        ale.push($(ts[i]).val());
                        
        
                       }
                    
                }
                ale.push(',');
        }
        
        $(this).parents(".quizContainer").find('.resultFk').val(ale.join(""));
    })
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
        generateBlockQuestInside(type,idts);
        setTimeout(function () {
            var hgt = $('#fenn_list_block').height();
            $('.answer_card_body').css('height', hgt + 'px');
        }, 500)
        setBackQuestionHst(fkImtID,idts,act);
    })

    $(document).on('change','.resultFk', function(){
        var lstId = $(this).parents('.quizContainer').attr('id');
      
        var typ = $(this).attr('type');
        if(typ==='radio'){
            var chkAns1 = $(this).attr('data-fkans');
            examQuestionUpdate(fkImtID,lstId,chkAns1,fkUserCode);
          
            return
        }
        if(typ==='text'){
            var chkAns = $(this).val();
            examQuestionUpdate(fkImtID,lstId,chkAns,fkUserCode);
           
            return
        }
        
       
    })
    $(document).on('click','.show_answer', function(){
        
        $(this).parent().find('.correct_answer').css('display','inline-block');
       
    })

    $(this).find(".preButton").on("click", function () {



        var act1 = $(this).parents('#fenn_list_block').find('.tab-pane.active').find('.active.quizContainer');
        var fkr = act1.index();
        
        if (fkr !== 1) {
            act1.prev().addClass('active');
  
            act1.removeClass('active');

            var act = $(this).parents('#fenn_list_block').find('.tab-pane.active').find('.active.quizContainer');
            act.empty();
            var type = act.attr('data-quest-type');
            var idts = act.attr('id');
           
            $('.number-quest-short-block').find('span').removeClass('active');
            $('[data-numb-type="' + idts + '"]').addClass('active');
            generateBlockQuestInside(type,idts);
           
            setBackQuestionHst(fkImtID,idts,act);
        }

    });


    // On clicking next, display the next question
    $(document).on('click', ".nextButton", function () {



        var act1 = $(this).parents('#fenn_list_block').find('.active').find('.quizContainer.active');


          act1.next().addClass('active')
            act1.removeClass('active');

            var act = $(this).parents('#fenn_list_block').find('.active').find('.quizContainer.active');
            act.empty();
            var type = act.attr('data-quest-type');
            var idts = act.attr('id');
               
           
           
            $('.number-quest-short-block').find('span').removeClass('active');
            $('[data-numb-type="' + idts + '"]').addClass('active');

            generateBlockQuestInside(type,idts);
           
            setBackQuestionHst(fkImtID,idts,act);
        


    });

    $(document).on('click', '#un_checked_btn', function () {

        $('#fenn_list_block .active .active .data_cardAns').prop('checked', false);
        var art=$('#fenn_list_block .active .quizContainer.active').attr('id');
        
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
    $(document).on('click', '#end_exam_finished', function () {

        if(confirm("İmtahanı Sonlandırmaq istədiyinizdən əminsiniz?")){
            examEndFuncCore();
        }
      
    })



    function activeAddClass() {

        $('#fenn_list_block .active .quizContainer').first().addClass('active');
        $('#fenn_list_block .active .number-quest-short-block span').first().click();
  
    };
    $(document).on('click', '#list_fenn_short li', function () {

        let id = $(this).find('a').attr('href');
        var s2 = id.substring(1);
        
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
               
                var dat = data.tbl[0].r;
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
                        $('#exam_namea').text(nameEx);

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
                    "fkUserId": fkUserCode
                }
            }



            startQuestBlockGenCore(exdat1, ixe, sctNm);



        }
        setTimeout(() => {
            activeAddClass();
        }, 1000);
       
    }

    function startQuestBlockGenCore(exdat1, ixe, sctNm) {



        $.ajax({
            type: "POST",
            url: UrlQb + "api/post/zdfn/qebulaz/startAbituriyentExam",
            data: JSON.stringify(exdat1), // now data come in this function
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            success: function (data, status, jqXHR) {
                 fkImtID = data.kv['fkImtahanId'];
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

    function examQuestionUpdate(fkId,fkQstId,cvb,Usid){

        var prop = {
            "kv": {
                
                 "fkImtahanId": fkId,
                  "fkSualId": fkQstId,
                  "cavab":cvb,
                 "fkImtID":Usid       
            } 
        }

        $.ajax({
            type: "POST",
            url: UrlQb + "api/post/zdfn/qebulaz/updateImtahanSuallarByImtahanIdAndSualId",
            data: JSON.stringify(prop), // now data come in this function
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            success: function (data, status, jqXHR) {
             
         

            },

            error: function (jqXHR, status) {
                // error handler

                alert('fail' + status.code);
            }
        }); 
    }

     function setBackQuestionHst(efkId,slId,tol){
        var prop = {
            "kv": { 
                 "fkImtahanId": efkId,
                 "fkSualId":slId
            } 
        }
        $.ajax({
            type: "POST",
            url: UrlQb + "api/post/zdfn/qebulaz/getImtahanSuallarListByImtahanId",
            data: JSON.stringify(prop), // now data come in this function
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            success: function (data, status, jqXHR) {
               var typ= data.kv['sualType'] ;
               var cb= data.kv['cavab'] ;
            
             returnDataAnswer(tol,cb,typ)
            },

            error: function (jqXHR, status) {
                // error handler

                alert('fail' + status.code);
            }
        }); 
     }
     function returnDataAnswer(tol,cb,typ){
      
        console.log(tol,cb,typ);
        if(typ==="qapali"){
           
             tol.find('.question_answers [data-fkans="'+cb+'"]').attr('checked', true);
              
        }
        if(typ==="situasiya"){
            tol.find('.resultFk').val(cb);
            //tol.find('[data-fkans="'+cb+'"]').attr('checked', true);
        }
        if(typ==="aciq"){
            tol.find('.resultFk').val(cb)
        }
         
     }




     function examEndFuncCore(){

        $('#exam_cont_page').css('display',"none");
        $('#result_cont_page').css('display',"block");
        examEndFunc1(fkImtID,fkUserCode);
         
        localStorage.removeItem('idExam1');
        localStorage.removeItem('idExam');
        localStorage.removeItem('TmEx');
        c=0
         }

     function examEndFunc(efkId,UserCode){
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
               console.log(data);
              $('#exam_hours').text(dat['imtahanMuddeti']);
              $('#variant_exam').text(dat['cariStatus']);
              $('#start_date_exam').text(convertStDate(dat['baslamaTarixi']));
              $('#start_hours_exam').text(convertStTime(dat['baslamaSaati']));
              $('#end_date_exam').text(convertStDate(dat['bitisTarixi']));
              $('#end_hours_exam').text(convertStTime(dat['bitisSaati']));
              $('#general_result_exam').text(dat['umumiBal']);
              $('#exam_nmea_end').text(nameEx);

            
            },

            error: function (jqXHR, status) {
                // error handler

                alert('fail' + status.code);
            }
        }); 
     }
     function examEndFunc1(efkId,UserCode){
        var prop = {
            "kv": { 
                 "fkImtahanId": efkId,
                 "fkUserId":UserCode
            } 
        }
        $.ajax({
            type: "POST",
            url: UrlQb + "api/post/zdfn/qebulaz/calculateAbituriyentImtahanNeticesi",
            data: JSON.stringify(prop), // now data come in this function
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            success: function (data, status, jqXHR) {
                examEndFunc(fkImtID,fkUserCode)
           
            
            },

            error: function (jqXHR, status) {
                // error handler

                alert('fail' + status.code);
            }
        }); 
     }


})


/* html2pdf(element, {
    margin: [10, 5, 0, -60],
    filename: '<?= $dadosboleto["numero_documento"] . '-' . $dadosboleto["sacado_nome"] ?>.pdf',
    image: {type: 'jpeg', quality: 0.98},
    html2canvas: {dpi: 300, letterRendering: true, width: 1300, height: 1000, windowWidth: 1000, windowHeight: 1000},
    jsPDF: {unit: 'mm', format: 'a4', orientation: 'portrait'}
}); */