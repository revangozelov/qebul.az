$(document).ready(function () {

    var fkImtID;
    var c;
    var nameEx = localStorage.getItem('nameExam')
    var fennNameBlock=[];
    fkImtID = localStorage.getItem('fkCnt');

    function imtahanTimeContineAsync(fkImtID, fkUserCode) {

        var prop = {
            "kv": {
                "fkImtahanId": fkImtID,
                "fkUserId": fkUserCode,
            }
        }
        $.ajax({
            type: "POST",
            url: UrlQb + "/api/post/zdfn/qebulaz/getImtahanInfo",
            data: JSON.stringify(prop),
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            success: function (data, status, jqXHR) {

                var dtime = data.kv['baslamaSaati'];
                var dDate = data.kv['baslamaTarixi'];

                var ar = dDate.slice(0, 4);
                var ar1 = dDate.slice(4, 6);
                var ar2 = dDate.slice(6, 8);
                var fns1 = ar1 + "/" + ar2 + "/" + ar;

                var arr = dtime.slice(0, 2);
                var arr1 = dtime.slice(2, 4);
                var arr2 = dtime.slice(4, 6);
                var fns = arr + ":" + arr1 + ':' + arr2;

                var start_actual_time = fns1 + " " + fns;
                var end_actual_time;
                localStorage.setItem('TmEx', new Date())

           
            },

            error: function (jqXHR, status) {
                // error handler

                alert('fail' + status.code);
            }
        });
    }

    function timedCount() {
       if(localStorage.getItem('TmEx')===null){
           return
       }
        var start_actual_time = new Date(localStorage.getItem('TmEx'));

        var dt = new Date();
        var end_actual_time = dt.getMonth() + 1 + '/' + dt.getDate() + '/' + dt.getFullYear() + " " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();

        var diff = new Date(end_actual_time) - new Date(start_actual_time);

        var diffSeconds = diff / 1000;

        c = (localStorage.getItem('straduy')) - (diffSeconds);

        var hours = parseInt(c / 3600) % 24;
        var minutes = parseInt(c / 60) % 60;
        var seconds = c % 60;

        var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
        $('#timer').html(result);
                
        if (c < 0) {
             
            examEndFuncCore();
            return false;

        }


        c = c - 1;
        t = setTimeout(function () {
            timedCount();
            //localStorage.setItem('TmEx',c);
        }, 1000);
        // This displays the current question AND the choices

    }

    function displayCurrentQuestion(typ, fgId, likn, tol, incS) {

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
                  
                
                    $('#' + fgId).empty();

                    $('#' + fgId + '.quizContainer').append(questGenBlockClose(fgId, quest, a, b, c, d, e));

                }
                if (typ === 'sadesual') {
                    var quest = dt['question'];
                    $('#' + fgId).empty();
                    $('#' + fgId).append(questGenBlockOpen1(quest));
                }
                if (typ === '13aematrix') {
                    var quest = dt['question'];
                    $('#' + fgId).empty();
                    $('#' + fgId).append(questGenBlockOpen2(quest));
                }
                if (typ === '13acmatrix') {
                    var quest = dt['question'];
                    $('#' + fgId).empty();
                    $('#' + fgId).append(questGenBlockOpen3(quest));
                }
                if (typ === '09onluqkesir') {
                    var quest = dt['question'];
                    $('#' + fgId).empty();
                    $('#' + fgId).append(questGenBlockOpen4(quest));
                }
                if (typ === 'situasiya') {
                    var quest1 = dt['question'];
                    var quest = dt['situasiya' + incS];
                    var crs = dt["situasiyaCavab" + incS];
                    $('#' + fgId + '_' + incS).empty();
                    $('#' + fgId + '_' + incS).append(questGenBlockStus(quest1 + "<br>" + quest, crs));
                    fgId = fgId + '_' + incS;
                    var editor = new FroalaEditor('#correct_block')
                }

                var hgt = $('#fenn_list_block').height();
                $('.answer_card_body').css('height', hgt + 'px');
                setBackQuestionHst(fkImtID, fgId, tol);
            },

            error: function (jqXHR, status) {
                // error handler

            }
        });

    }

    function questGenBlockClose(id, quest, a, b, c, d, e) {

        a = $(a).html();
        b = $(b).html();
        c = $(c).html();
        d = $(d).html();
        e = $(e).html();
        return `
        <div class="question_content"> ${quest}</div>
        <hr>
        <ul class="choiceList">
          <li class="question_answers"><input type="radio" data-fkAns="A" class="resultFk data_cardAns radio-inline" value="0" name="dynradio${id}"><span class="span-anscrd">A)</span>${a}</li>
          <li class="question_answers"><input type="radio" data-fkAns="B" class="resultFk data_cardAns  radio-inline" value="1" name="dynradio${id}"><span class="span-anscrd">B)</span>${b}</li>
          <li class="question_answers"><input type="radio" data-fkAns="C" class="resultFk data_cardAns  radio-inline" value="2" name="dynradio${id}"><span class="span-anscrd">C)</span>${c}</li>
          <li class="question_answers"><input type="radio" data-fkAns="D" class="resultFk data_cardAns  radio-inline" value="3" name="dynradio${id}"><span class="span-anscrd">D)</span>${d}</li>
          <li class="question_answers"><input type="radio" data-fkAns="E" class="resultFk data_cardAns  radio-inline" value="4" name="dynradio${id}"><span class="span-anscrd">E)</span>${e}</li>
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
       
        <table id='table_answer_openedB' class='col-lg-6 table_button_list'>
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
      <th>2</th>
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
       
        <table id='table_answer_openedB' class='col-lg-6 table_button_list'>
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
       
        <table id='table_answer_openedO' class="table_button_list" >
        <tbody>
                                        <tr>
                                                <td style="" class="td-1">
                    <span>0</span>
                    <input type="checkbox" id="open0017161" value="0">
                    <label for="open0017161"></label>
                </td>
                                                <td style="" class="td-2">
                    <span>0</span>
                    <input type="checkbox" id="open0117161" value="0">
                    <label for="open0117161"></label>
                </td>
                                                <td style="" class="td-3">
                    <span>0</span>
                    <input type="checkbox" id="open0217161" value="0">
                    <label for="open0217161"></label>
                </td>
                                                <td style="" class="td-4">
                    <span>0</span>
                    <input type="checkbox" id="open0317161" value="0">
                    <label for="open0317161"></label>
                </td>
                                                <td style="" class="td-5">
                    <span>0</span>
                    <input type="checkbox" id="open0417161" value="0">
                    <label for="open0417161"></label>
                </td>
                                                <td style="" class="td-6">
                    <span>0</span>
                    <input type="checkbox" id="open0517161" value="0">
                    <label for="open0517161"></label>
                </td>
                                            </tr>
                                        <tr>
                                                <td style="" class="td-1">
                    <span>1</span>
                    <input type="checkbox" id="open1017161" value="1">
                    <label for="open1017161"></label>
                </td>
                                                <td style="" class="td-2">
                    <span>1</span>
                    <input type="checkbox" id="open1117161" value="1">
                    <label for="open1117161"></label>
                </td>
                                                <td style="" class="td-3">
                    <span>1</span>
                    <input type="checkbox" id="open1217161" value="1">
                    <label for="open1217161"></label>
                </td>
                                                <td style="" class="td-4">
                    <span>1</span>
                    <input type="checkbox" id="open1317161" value="1">
                    <label for="open1317161"></label>
                </td>
                                                <td style="" class="td-5">
                    <span>1</span>
                    <input type="checkbox" id="open1417161" value="1">
                    <label for="open1417161"></label>
                </td>
                                                <td style="" class="td-6">
                    <span>1</span>
                    <input type="checkbox" id="open1517161" value="1">
                    <label for="open1517161"></label>
                </td>
                                            </tr>
                                        <tr>
                                                <td style="" class="td-1">
                    <span>2</span>
                    <input type="checkbox" id="open2017161" value="2">
                    <label for="open2017161"></label>
                </td>
                                                <td style="" class="td-2">
                    <span>2</span>
                    <input type="checkbox" id="open2117161" value="2">
                    <label for="open2117161"></label>
                </td>
                                                <td style="" class="td-3">
                    <span>2</span>
                    <input type="checkbox" id="open2217161" value="2">
                    <label for="open2217161"></label>
                </td>
                                                <td style="" class="td-4">
                    <span>2</span>
                    <input type="checkbox" id="open2317161" value="2">
                    <label for="open2317161"></label>
                </td>
                                                <td style="" class="td-5">
                    <span>2</span>
                    <input type="checkbox" id="open2417161" value="2">
                    <label for="open2417161"></label>
                </td>
                                                <td style="" class="td-6">
                    <span>2</span>
                    <input type="checkbox" id="open2517161" value="2">
                    <label for="open2517161"></label>
                </td>
                                            </tr>
                                        <tr>
                                                <td style="" class="td-1">
                    <span>3</span>
                    <input type="checkbox" id="open3017161" value="3">
                    <label for="open3017161"></label>
                </td>
                                                <td style="" class="td-2">
                    <span>3</span>
                    <input type="checkbox" id="open3117161" value="3">
                    <label for="open3117161"></label>
                </td>
                                                <td style="" class="td-3">
                    <span>3</span>
                    <input type="checkbox" id="open3217161" value="3">
                    <label for="open3217161"></label>
                </td>
                                                <td style="" class="td-4">
                    <span>3</span>
                    <input type="checkbox" id="open3317161" value="3">
                    <label for="open3317161"></label>
                </td>
                                                <td style="" class="td-5">
                    <span>3</span>
                    <input type="checkbox" id="open3417161" value="3">
                    <label for="open3417161"></label>
                </td>
                                                <td style="" class="td-6">
                    <span>3</span>
                    <input type="checkbox" id="open3517161" value="3">
                    <label for="open3517161"></label>
                </td>
                                            </tr>
                                        <tr>
                                                <td style="" class="td-1">
                    <span>4</span>
                    <input type="checkbox" id="open4017161" value="4">
                    <label for="open4017161"></label>
                </td>
                                                <td style="" class="td-2">
                    <span>4</span>
                    <input type="checkbox" id="open4117161" value="4">
                    <label for="open4117161"></label>
                </td>
                                                <td style="" class="td-3">
                    <span>4</span>
                    <input type="checkbox" id="open4217161" value="4">
                    <label for="open4217161"></label>
                </td>
                                                <td style="" class="td-4">
                    <span>4</span>
                    <input type="checkbox" id="open4317161" value="4">
                    <label for="open4317161"></label>
                </td>
                                                <td style="" class="td-5">
                    <span>4</span>
                    <input type="checkbox" id="open4417161" value="4">
                    <label for="open4417161"></label>
                </td>
                                                <td style="" class="td-6">
                    <span>4</span>
                    <input type="checkbox" id="open4517161" value="4">
                    <label for="open4517161"></label>
                </td>
                                            </tr>
                                        <tr>
                                                <td style="" class="td-1">
                    <span>5</span>
                    <input type="checkbox" id="open5017161" value="5">
                    <label for="open5017161"></label>
                </td>
                                                <td style="" class="td-2">
                    <span>5</span>
                    <input type="checkbox" id="open5117161" value="5">
                    <label for="open5117161"></label>
                </td>
                                                <td style="" class="td-3">
                    <span>5</span>
                    <input type="checkbox" id="open5217161" value="5">
                    <label for="open5217161"></label>
                </td>
                                                <td style="" class="td-4">
                    <span>5</span>
                    <input type="checkbox" id="open5317161" value="5">
                    <label for="open5317161"></label>
                </td>
                                                <td style="" class="td-5">
                    <span>5</span>
                    <input type="checkbox" id="open5417161" value="5">
                    <label for="open5417161"></label>
                </td>
                                                <td style="" class="td-6">
                    <span>5</span>
                    <input type="checkbox" id="open5517161" value="5">
                    <label for="open5517161"></label>
                </td>
                                            </tr>
                                        <tr>
                                                <td style="" class="td-1">
                    <span>6</span>
                    <input type="checkbox" id="open6017161" value="6">
                    <label for="open6017161"></label>
                </td>
                                                <td style="" class="td-2">
                    <span>6</span>
                    <input type="checkbox" id="open6117161" value="6">
                    <label for="open6117161"></label>
                </td>
                                                <td style="" class="td-3">
                    <span>6</span>
                    <input type="checkbox" id="open6217161" value="6">
                    <label for="open6217161"></label>
                </td>
                                                <td style="" class="td-4">
                    <span>6</span>
                    <input type="checkbox" id="open6317161" value="6">
                    <label for="open6317161"></label>
                </td>
                                                <td style="" class="td-5">
                    <span>6</span>
                    <input type="checkbox" id="open6417161" value="6">
                    <label for="open6417161"></label>
                </td>
                                                <td style="" class="td-6">
                    <span>6</span>
                    <input type="checkbox" id="open6517161" value="6">
                    <label for="open6517161"></label>
                </td>
                                            </tr>
                                        <tr>
                                                <td style="" class="td-1">
                    <span>7</span>
                    <input type="checkbox" id="open7017161" value="7">
                    <label for="open7017161"></label>
                </td>
                                                <td style="" class="td-2">
                    <span>7</span>
                    <input type="checkbox" id="open7117161" value="7">
                    <label for="open7117161"></label>
                </td>
                                                <td style="" class="td-3">
                    <span>7</span>
                    <input type="checkbox" id="open7217161" value="7">
                    <label for="open7217161"></label>
                </td>
                                                <td style="" class="td-4">
                    <span>7</span>
                    <input type="checkbox" id="open7317161" value="7">
                    <label for="open7317161"></label>
                </td>
                                                <td style="" class="td-5">
                    <span>7</span>
                    <input type="checkbox" id="open7417161" value="7">
                    <label for="open7417161"></label>
                </td>
                                                <td style="" class="td-6">
                    <span>7</span>
                    <input type="checkbox" id="open7517161" value="7">
                    <label for="open7517161"></label>
                </td>
                                            </tr>
                                        <tr>
                                                <td style="" class="td-1">
                    <span>8</span>
                    <input type="checkbox" id="open8017161" value="8">
                    <label for="open8017161"></label>
                </td>
                                                <td style="" class="td-2">
                    <span>8</span>
                    <input type="checkbox" id="open8117161" value="8">
                    <label for="open8117161"></label>
                </td>
                                                <td style="" class="td-3">
                    <span>8</span>
                    <input type="checkbox" id="open8217161" value="8">
                    <label for="open8217161"></label>
                </td>
                                                <td style="" class="td-4">
                    <span>8</span>
                    <input type="checkbox" id="open8317161" value="8">
                    <label for="open8317161"></label>
                </td>
                                                <td style="" class="td-5">
                    <span>8</span>
                    <input type="checkbox" id="open8417161" value="8">
                    <label for="open8417161"></label>
                </td>
                                                <td style="" class="td-6">
                    <span>8</span>
                    <input type="checkbox" id="open8517161" value="8">
                    <label for="open8517161"></label>
                </td>
                                            </tr>
                                        <tr>
                                                <td style="" class="td-1">
                    <span>9</span>
                    <input type="checkbox" id="open9017161" value="9">
                    <label for="open9017161"></label>
                </td>
                                                <td style="" class="td-2">
                    <span>9</span>
                    <input type="checkbox" id="open9117161" value="9">
                    <label for="open9117161"></label>
                </td>
                                                <td style="" class="td-3">
                    <span>9</span>
                    <input type="checkbox" id="open9217161" value="9">
                    <label for="open9217161"></label>
                </td>
                                                <td style="" class="td-4">
                    <span>9</span>
                    <input type="checkbox" id="open9317161" value="9">
                    <label for="open9317161"></label>
                </td>
                                                <td style="" class="td-5">
                    <span>9</span>
                    <input type="checkbox" id="open9417161" value="9">
                    <label for="open9417161"></label>
                </td>
                                                <td style="" class="td-6">
                    <span>9</span>
                    <input type="checkbox" id="open9517161" value="9">
                    <label for="open9517161"></label>
                </td>
                                            </tr>
                                        <tr>
                                                <td class="td-1">
                    <span>,</span>
                    <input type="checkbox" id="zero017161" value=",">
                    <label style="left: 3px;" for="zero017161"></label>
                </td>
                                                <td class="td-2">
                    <span>,</span>
                    <input type="checkbox" id="zero117161" value=",">
                    <label style="left: 3px;" for="zero117161"></label>
                </td>
                                                <td class="td-3">
                    <span>,</span>
                    <input type="checkbox" id="zero217161" value=",">
                    <label style="left: 3px;" for="zero217161"></label>
                </td>
                                                <td class="td-4">
                    <span>,</span>
                    <input type="checkbox" id="zero317161" value=",">
                    <label style="left: 3px;" for="zero317161"></label>
                </td>
                                                <td class="td-5">
                    <span>,</span>
                    <input type="checkbox" id="zero417161" value=",">
                    <label style="left: 3px;" for="zero417161"></label>
                </td>
                                                <td class="td-6">
                    <span>,</span>
                    <input type="checkbox" id="zero517161" value=",">
                    <label style="left: 3px;" for="zero517161"></label>
                </td>
                                            </tr>
        </tbody>
    </table>
   
         `

    }

    function questGenBlockStus(quest, crs) {

        return `
        <div class="question_content">${quest}</div>
        <hr>
       
        <div id='correct_block' class="resultFk correct_answer"></div>
        
         `

    }

    function generateBlockQuestInside(type, idts, tol) {
        if (type === 'close') {

            displayCurrentQuestion(type, idts, 'getQapaliSualBodyById', tol)
        }
        if (type === 'sadesual') {
            displayCurrentQuestion(type, idts, 'getAciqSualBodyById', tol)
        }
        if (type === '13aematrix') {
            displayCurrentQuestion(type, idts, 'getAciqSualBodyById', tol)
        }
        if (type === '13acmatrix') {
            displayCurrentQuestion(type, idts, 'getAciqSualBodyById', tol)
        }
        if (type === '09onluqkesir') {
            displayCurrentQuestion(type, idts, 'getAciqSualBodyById', tol)
        }
        if (type === 'cedvel') {
            displayCurrentQuestion(type, idts, 'getAciqSualBodyById', tol)
        }
        if (type === 'situasiya') {
            var arr = idts.split('_');
            displayCurrentQuestion(type, arr[0], 'getSituasiyaSualBodyById', tol, arr[1])
        }
    }

    $(document).on('click', "#table_answer_openedB tbody tr td input", function () {

        var vl = $(this).parents('tbody').find('tr');
        var ale = [];

        for (let index = 0; index < vl.length; index++) {
            var ts = $(vl[index]).find('input')
            ale.push($(vl[index]).attr('data-vall'));

            for (let i = 0; i < ts.length; i++) {

                if ($(ts[i]).is(':checked')) {



                    ale.push($(ts[i]).val());


                }

            }
            ale.push(',');
        }
        $(this).parents(".quizContainer").find('.resultFk').change();
        $(this).parents(".quizContainer").find('.resultFk').val(ale.join(""));
    })
    $(document).on('click', "#table_answer_openedO tbody tr td input", function () {

        var vl = $(this).parents('tbody').find('tr td input');
        var ale = [];

        for (let index = 0; index < vl.length; index++) {
            // var ts= $(vl[index]).find('input')
            // ale.push($(vl[index]).attr('data-vall'));

            // for (let i = 0; i < ts.length; i++) {

            if ($(vl[index]).is(':checked')) {



                ale.push($(vl[index]).val());


            }

            // }

        }
        $(this).parents(".quizContainer").find('.resultFk').change();
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
        generateBlockQuestInside(type, idts, act);
        setTimeout(function () {
            var hgt = $('#fenn_list_block').height();
            $('.answer_card_body').css('height', hgt + 'px');
        }, 500)

    })

    $(document).on('change', '.resultFkSt', function () {
        var lstId = $(this).parents('.stContainer').attr('id');

        var typ = $(this).attr('type');
        if (typ === 'radio') {
            var chkAns1 = $(this).attr('data-fkans');
            examQuestionUpdate(fkImtID, lstId, chkAns1, fkUserCode);

            return
        }
        

    })

    $(document).on('change', '.resultFk', function () {
        var lstId = $(this).parents('.quizContainer').attr('id');

        var typ = $(this).attr('type');
        if (typ === 'radio') {
            var chkAns1 = $(this).attr('data-fkans');
            examQuestionUpdate(fkImtID, lstId, chkAns1, fkUserCode);

            return
        }
        if (typ === 'text') {
            var chkAns = $(this).val();
            examQuestionUpdate(fkImtID, lstId, chkAns, fkUserCode);

            return
        }

    })

    $(document).on('focusout', '.resultFk .fr-view', function () {
        var lstId = $(this).parents('.quizContainer').attr('id');

        var typ = $(this).attr('type');
        if (typ === undefined) {
            var chkAns = $(this).html();
           localStorage.setItem(lstId,chkAns)
              

            return
        }



    })
    $(document).on('click', '.show_answer', function () {

        $(this).parent().find('.correct_answer').css('display', 'inline-block');

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
            generateBlockQuestInside(type, idts, act);


        }

    });


    // On clicking next, display the next question
    $(document).on('click', ".nextButton", function () {



        var act1 = $(this).parents('#fenn_list_block').find('.active').find('.quizContainer.active');


        act1.next().addClass('active');
        act1.removeClass('active');

        var act = $(this).parents('#fenn_list_block').find('.active').find('.quizContainer.active');


        if (act.length === 0) {

            var acte = $('#list_fenn_short li a.active');


            acte.parent().next().find('a').click();
            return
        }

        act.empty();
        var type = act.attr('data-quest-type');
        var idts = act.attr('id');



        $('.number-quest-short-block').find('span').removeClass('active');
        $('[data-numb-type="' + idts + '"]').addClass('active');

        generateBlockQuestInside(type, idts, act);





    });

    $(document).on('click', '#un_checked_btn', function () {

        $('#fenn_list_block .active .active .data_cardAns').prop('checked', false);
        var art = $('#fenn_list_block .active .quizContainer.active').attr('id');

        var anscr = $('#table_answer_card .active').find('tr[data-numcard=' + art + ']');

        anscr.find('td span').removeClass('checkAns');
        examQuestionUpdate(fkImtID, art, '', fkUserCode)
    })
    $(document).on('click', 'li.question_answers .data_cardAns', function () {

        var art = $(this).parents('.quizContainer').attr('id');
        var val = $(this).val();

        var anscr = $('#table_answer_card .active').find('tr[data-numcard=' + art + ']');

        anscr.find('td span').removeClass('checkAns');
        anscr.find('td').eq(val).find('span').addClass('checkAns');
    })

    function genListFennName1(nm, id, st) {
        return `
	  <li role="presentation" class="exam_fenn ">
	  <a href="#${id}" aria-controls="home" role="tab" class="${st}" data-toggle="tab">${nm}</a></li>
	  `
    }

    function genListFennBlock1(nm, st, quest) {
        return `<div role="tabpanel " class="tab-pane row ${st}" id="${nm}" >

	      
	</div>
	  `
    }

    function situasiyaBalChocieGen(fkid, as, st,imSc) {
  
        var prop = {
            "kv": {
                "id": fkid,
            }
        }
        $.ajax({
            type: "POST",
            url: UrlQb + "/api/post/zdfn/qebulaz/getSituasiyaSualBodyById",
            data: JSON.stringify(prop),
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            async: false,
            success: function (data, status, jqXHR) {
                var fnm 
                  
                fnm =fennNameBlock[0].kv["imtahanSection"+imSc]
              
                $("#sty_fenn_short").append(genListFennName1(fnm , fkid + 'st', st));
                $("#sty_list_block").append(genListFennBlock1(fkid + 'st', st, data.kv.question));

              
                
                var als = [28, 29, 30];

                for (let index = 0; index < als.length; index++) {
                     
                    var hast = index + 1
                    var sl1=data.kv["situasiya"+hast];
                    var dzc1=data.kv["situasiyaCavab"+hast];

                  
                  situasiyaBalChocieCore(fkid + '_'+(index+1),sl1,dzc1,fkid,als[index]);

                }

            

            },

            error: function (jqXHR, status) {
                // error handler

                alert('fail' + status.code);
            }
        });

    }

    function situasiyaBalChocie(fkid) {

        var prop = {
            "kv": {
                "fkImtahanId": fkid,
            }
        }
        $.ajax({
            type: "POST",
            url: UrlQb + "/api/post/zdfn/qebulaz/getImtahanSuallarListByImtahanId",
            data: JSON.stringify(prop),
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            success: function (data, status, jqXHR) {
                var asa = 0;
              
                try {

                    var datas = data.tbl[0].r;
                    
                    for (let index = 0; index < datas.length; index++) {

                        var stas = datas[index].sualType
                          
                        if (stas === "situasiya") {

                            var arr1 = datas[index].fkSualId;
                            var arr = datas[index].fkSualId.split('_');

                         
                            if (arr1 === arr[0] + "_1") {
                                var imtSect = datas[index].imtahanSection;

                                asa++
                                if (asa === 1) {
                                    situasiyaBalChocieGen(arr[0], asa, 'active',imtSect);
                                    

                                } else {
                                    situasiyaBalChocieGen(arr[0], asa, '',imtSect);
                                   
                                }
                               
                               
                            }



                        }

                    }
                    $('#stuasiya-test-popup').modal("toggle");
                 
                } catch (error) {
                    if (confirm("İmtahanı Sonlandırmaq istədiyinizdən əminsiniz?")) {
                       // examEndFuncCore();
                    }
                }
            },
            complete: function(dht){
               
                $('#preloader2').hide();
            },

            error: function (jqXHR, status) {
                // error handler

                alert('fail' + status.code);
            }
        });

    }

    function situasiyaBalChocieCore(fkslId,sl,cb,fkid,bl) {
                 console.log(fkslId)
    
                ela = localStorage.getItem(fkslId);
                console.log(ela)
                 if(ela===null){
                    ela = "Cavab Qeyd Edilməyib"
                 }
                $("#" + fkid + 'st').append($('<div>')
                     .addClass('stContainer')
                     .attr('id',fkid+"_"+bl)
                    .append('<div class="st_sual_block col-12" ><h1>Sual '+bl+'</h1>' + sl + '</div>')
                    .append('<div class="st_sual_block col-6 yourBl"><h1>Qeyd Edilən Cavab</h1>' + ela + '</div>')
                    .append('<div class="st_sual_block col-6  correctBl"><h1>Düzgün Cavab</h1>' + cb + '</div>')
                  
                    .append($("<div>").addClass('card_balchc')
                    .append('<input type="radio" name="resultSt'+fkid+bl+'" data-fkans="0" class="resultFkSt"><span class="situasiya_bl">0 Bal</span>')
                    .append('<input type="radio" name="resultSt'+fkid+bl+'" data-fkans="1" class="resultFkSt"><span class="situasiya_bl">1 Bal</span>')
                    .append('<input type="radio" name="resultSt'+fkid+bl+'" data-fkans="2" class="resultFkSt"><span class="situasiya_bl">2 Bal</span>')
                ));
               
        


    }

    $(document).on('click', '#end_exam_finished', function () {

        var typeExn = localStorage.getItem('data-tyEx');
        if(typeExn === "abtr"){
            $('#preloader2').show();
            $('#sty_list_block').find('.tab-pane').remove();
            $('#sty_fenn_short').empty();
            situasiyaBalChocie(fkImtID);
        }else{

            if (confirm("İmtahanı Sonlandırmaq istədiyinizdən əminsiniz?")) {
                $('#preloader2').show();
    
                examEndFuncCore();
              
             
            }
        }
   

    })
    $(document).on('click', '#end_exam_last_fin', function () {

        if (confirm("İmtahanı Sonlandırmaq istədiyinizdən əminsiniz?")) {
            $('#preloader2').show();

            examEndFuncCore();
          
            $('#stuasiya-test-popup').modal("toggle");
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

  
    startExamBlockGen()

    function startExamBlockGen() {
        $('#preloader2').show();
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
                        var blockid = 873642734;
                        fennNameBlock.push({
                            "kv":{
                            "imtahanSection1": sect1,
                            "imtahanSection2": sect2,
                            "imtahanSection3": sect3,
                            "imtahanSection4": sect4,
                            "imtahanSection5": sect5,
                        }})

                         
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


                startQuestBlockGen(gId);
              
            },

            error: function (jqXHR, status) {
                // error handler

                alert('fail' + status.code);
            }
        });

    }

  

    function imtahanTimeContine(fkImtID, fkUserCode, sctNm, ixe) {

        var prop = {
            "kv": {
                "fkImtahanId": fkImtID,
                "fkUserId": fkUserCode,
            }
        }
        $.ajax({
            type: "POST",
            url: UrlQb + "/api/post/zdfn/qebulaz/getImtahanInfo",
            data: JSON.stringify(prop),
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            success: function (data, status, jqXHR) {

                var dtime = data.kv['baslamaSaati'];
                var dDate = data.kv['baslamaTarixi'];

                var ar = dDate.slice(0, 4);
                var ar1 = dDate.slice(4, 6);
                var ar2 = dDate.slice(6, 8);
                var fns1 = ar1 + "/" + ar2 + "/" + ar;

                var arr = dtime.slice(0, 2);
                var arr1 = dtime.slice(2, 4);
                var arr2 = dtime.slice(4, 6);
                var fns = arr + ":" + arr1;

                var start_actual_time = fns1 + " " + fns;
                var end_actual_time;

                start_actual_time = new Date(start_actual_time);
                end_actual_time = new Date();

                var diff = end_actual_time - start_actual_time;

                var diffSeconds = diff / 1000;
                var HH = Math.floor(diffSeconds / 3600);
                var MM = Math.floor(diffSeconds % 3600) / 60;

                var formatted = ((HH < 10) ? ("" + HH) : HH) + "." + ((MM < 10) ? ("0" + MM) : MM)

                c = (localStorage.getItem('straduy')) - (formatted.slice(0, 4) * 3600 + 150);

                if (localStorage.getItem('straduy') > (formatted.slice(0, 4) * 3600) + 150) {
                    continueExamBlockGen(fkImtID, sctNm, ixe);
                } else {
                          
                    alert('Sizin İmtahan vaxtı bitmişdir');
                    $('#exam_cont_page').css('display', "none");
                    $('#result_cont_page').css('display', "block");
                    examEndFuncHstryCore(fkImtID, fkUserCode,'');
                   
                   
                    localStorage.clear();
                    localStorage.setItem("UsId",fkUserCode);
                
                    return
                }
                
            },

            error: function (jqXHR, status) {
                // error handler

                alert('fail' + status.code);
            }
        });
    }
    function examEndFuncHstryCore(efkId, UserCode, nameEx) {
		var prop = {
			"kv": {
				"fkImtahanId": efkId,
				"fkUserId": UserCode
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
				var dat = data.tbl[0].r[0];
				$('#result-name').text(nmFK);
				$('#result-sunmae').text(surNmFK);
				$('#exam_hours').text(dat['imtahanMuddeti']);
				$('#variant_exam').text(dat['cariStatus']);
				$('#start_date_exam').text(convertStDate(dat['baslamaTarixi']));
				$('#start_hours_exam').text(convertStTime(dat['baslamaSaati']));
				$('#end_date_exam').text(convertStDate(dat['bitisTarixi']));
				$('#end_hours_exam').text(convertStTime(dat['bitisSaati']));
				$('#general_result_exam').text(dat['umumiBal']);

				$('#exam_nmea_end').text(nameEx);

				$('#fenn-resul-body').empty();
				var fenn = data.tbl[2].r;
				var fnm = data.tbl[1].r;
				var tb
				for (let inde = 0; inde < fnm.length; inde++) {
					if (fnm[inde]['imtahanNovuAdi'] === nameEx) {

						tb = fnm[inde];
					}

				}
				for (let index = 0; index < fenn.length; index++) {
					let ale = fenn[index];

					var s = ale['imtahanSection']
					$('#fenn-resul-body').append($('<tr>')
						.append('<td>' + tb["section" + s + ""] + '</td>')
						.append('<td>' + ale['qapaliSualDogru'] + '/' + ale['qapaliSualSay'] + '</td>')
						.append('<td>' + ale['aciqSualDogru'] + '/' + ale['aciqSualSay'] + '</td>')
						.append('<td>' + ale['situasiyaSualCem'] + '/' + ale['situasiyaSualSay'] + '</td>')
						.append('<td>' + dat['balSection' + ale['imtahanSection'] + ''] + '</td>')
					)


				}

			},

			error: function (jqXHR, status) {
				// error handler

				alert('fail' + status.code);
			}
		});
	}

    function continueExamBlockGen(fkid, sctNm, ixe) {

        var prop = {
            "kv": {
                "fkImtahanId": fkid,
            }
        }
        $.ajax({
            type: "POST",
            url: UrlQb + "/api/post/zdfn/qebulaz/getImtahanSuallarListByImtahanId",
            data: JSON.stringify(prop),
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            success: function (data, status, jqXHR) {

                var dat1 = data.tbl[0].r;
                dat = dat1.reverse()
                var ir = ixe + 1
                let cnt = 1


                for (let ix = 0; ix < dat.length; ix++) {
                    var ate = dat[ix]['imtahanSection']


                    if (ir == ate) {
                        var atyp = dat[ix]['sualType'];

                        if (atyp === "situasiya") {

                            $('#' + sctNm).append(
                                $('<div>').addClass('quizContainer')
                                .attr('id', dat[ix]['fkSualId'])
                                .attr('data-quest-type', 'situasiya')
                            )

                            $('#table_answer_card [mid=' + sctNm + ']').append($('<tr>')
                                .attr('data-numCard', dat[ix]['fkSualId'])
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
                                    .attr('data-numb-type', dat[ix]['fkSualId'])
                                )
                                cnt++
                            } else {

                                $('#' + sctNm + ' .number-quest-short-block').append(
                                    $('<span>').text(cnt)
                                    .attr('data-numb-type', dat[ix]['fkSualId']))

                                cnt++
                            }

                        }

                        if (atyp === "qapali") {
                            var cvb = dat[ix]['cavab'];
                            $('#' + sctNm).append(
                                $('<div>').addClass('quizContainer')
                                .attr('id', dat[ix]['fkSualId'])
                                .attr('data-quest-type', 'close')
                            )


                            if (cvb === "A") {
                                $('#table_answer_card [mid=' + sctNm + ']').append($('<tr>')
                                    .attr('data-numCard', dat[ix]['fkSualId'])
                                    .append('<th>' + cnt + '</th>')
                                    .append('<td><span class="checkAns">A</span></td>')
                                    .append('<td><span>B</span></td>')
                                    .append('<td><span>C</span></td>')
                                    .append('<td><span>D</span></td>')
                                    .append('<td><span>E</span></td>'));
                            }
                            if (cvb === "B") {
                                $('#table_answer_card [mid=' + sctNm + ']').append($('<tr>')
                                    .attr('data-numCard', dat[ix]['fkSualId'])
                                    .append('<th>' + cnt + '</th>')
                                    .append('<td><span >A</span></td>')
                                    .append('<td><span class="checkAns">B</span></td>')
                                    .append('<td><span>C</span></td>')
                                    .append('<td><span>D</span></td>')
                                    .append('<td><span>E</span></td>'));
                            }
                            if (cvb === "C") {
                                $('#table_answer_card [mid=' + sctNm + ']').append($('<tr>')
                                    .attr('data-numCard', dat[ix]['fkSualId'])
                                    .append('<th>' + cnt + '</th>')
                                    .append('<td><span >A</span></td>')
                                    .append('<td><span>B</span></td>')
                                    .append('<td><span class="checkAns">C</span></td>')
                                    .append('<td><span>D</span></td>')
                                    .append('<td><span>E</span></td>'));
                            }
                            if (cvb === "D") {
                                $('#table_answer_card [mid=' + sctNm + ']').append($('<tr>')
                                    .attr('data-numCard', dat[ix]['fkSualId'])
                                    .append('<th>' + cnt + '</th>')
                                    .append('<td><span >A</span></td>')
                                    .append('<td><span>B</span></td>')
                                    .append('<td><span >C</span></td>')
                                    .append('<td><span class="checkAns">D</span></td>')
                                    .append('<td><span>E</span></td>'));
                            }
                            if (cvb === "E") {
                                $('#table_answer_card [mid=' + sctNm + ']').append($('<tr>')
                                    .attr('data-numCard', dat[ix]['fkSualId'])
                                    .append('<th>' + cnt + '</th>')
                                    .append('<td><span >A</span></td>')
                                    .append('<td><span>B</span></td>')
                                    .append('<td><span >C</span></td>')
                                    .append('<td><span >D</span></td>')
                                    .append('<td><span class="checkAns">E</span></td>'));
                            }
                            if (cvb === "") {
                                $('#table_answer_card [mid=' + sctNm + ']').append($('<tr>')
                                    .attr('data-numCard', dat[ix]['fkSualId'])
                                    .append('<th>' + cnt + '</th>')
                                    .append('<td><span >A</span></td>')
                                    .append('<td><span>B</span></td>')
                                    .append('<td><span >C</span></td>')
                                    .append('<td><span >D</span></td>')
                                    .append('<td><span >E</span></td>'));
                            }

                            if (cnt === 1) {
                                $('#' + sctNm + ' .number-quest-short-block').append(
                                    $('<span>').text(cnt)
                                    .addClass('active')
                                    .attr('data-numb-type', dat[ix]['fkSualId'])
                                )
                                cnt++
                            } else {

                                $('#' + sctNm + ' .number-quest-short-block').append(
                                    $('<span>').text(cnt)
                                    .attr('data-numb-type', dat[ix]['fkSualId']))


                                cnt++
                            }

                        } else {
                            var dat2 = data.tbl[1].r;
                            for (let index = 0; index < dat2.length; index++) {

                                if (dat[ix]['fkSualId'] === dat2[index]['id']) {


                                    $('#' + sctNm).append(
                                        $('<div>').addClass('quizContainer')
                                        .attr('id', dat[ix]['fkSualId'])
                                        .attr('data-quest-type', dat2[index]['questionType'])
                                    )
                                    $('#table_answer_card [mid=' + sctNm + ']').append($('<tr>')
                                        .attr('data-numCard', dat[ix]['fkSualId'])
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
                                            .attr('data-numb-type', dat[ix]['fkSualId'])
                                        )
                                        cnt++
                                    } else {

                                        $('#' + sctNm + ' .number-quest-short-block').append(
                                            $('<span>').text(cnt)
                                            .attr('data-numb-type', dat[ix]['fkSualId']))

                                        cnt++
                                    }

                                }
                            }


                        }



                    }


                }
               
            },complete: function(dht){
               
                $('#preloader2').hide();
            },

            error: function (jqXHR, status) {
                // error handler

                alert('fail' + status.code);
            }
        });

    }


    function startQuestBlockGen(idg) {
        if (fkImtID === null) {
            var exdat1 = {
                "kv": {
                    "fkImtahanNovuId": idg,
                    "fkUserId": fkUserCode
                }
            }
            c = localStorage.getItem('TmEx');
            timedCount();
            startQuestBlockGenCore(exdat1);

        } else {
            timedCount();
            alert('Davam Etməkdə olan İmtahanınız var. Zəhmət olmasa Ya qaldıqınız yerdən davam edin ya da imtahanı sonlandırın ');

            for (let ixe = 0; ixe < listFnm.length; ixe++) {
                var sctNm = listFnm[ixe]


                imtahanTimeContine(fkImtID, fkUserCode, sctNm, ixe);


            }

        }



        setTimeout(() => {
            activeAddClass();
        }, 1000);

    }

    
    function startQuestBlockGenCore(exdat1) {
          var qrdApi = localStorage.getItem('data-tyEx')
         
            if(qrdApi ==="abtr"){
                     startQuestBlokAbtr(exdat1,"startAbituriyentExam")
            }
            if(qrdApi === "ortmkt"){
                 
                     startQuestBlokFenn(exdat1,"startFenlerUzreExam")
            }
    

    }
     function startQuestBlokAbtr(exdat1,apiName){
        $.ajax({
            type: "POST",
            url: UrlQb + "api/post/zdfn/qebulaz/"+apiName,
            data: JSON.stringify(exdat1), // now data come in this function
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            success: function (data, status, jqXHR) {




                fkImtID = data.kv['fkImtahanId'];
                localStorage.setItem('fkCnt', fkImtID);

                for (let ixe = 0; ixe < listFnm.length; ixe++) {
                    var sctNm = listFnm[ixe];

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

                        var array = ['1', '2', '3']
                        for (let index = 0; index < array.length; index++) {
                            $('#' + sctNm).append(
                                $('<div>').addClass('quizContainer')
                                .attr('id', dat2[ix2] + '_' + array[index])
                                .attr('data-quest-type', 'situasiya')
                            )

                            $('#table_answer_card [mid=' + sctNm + ']').append($('<tr>')
                                .attr('data-numCard', dat2[ix2] + '_' + array[index])
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
                                    .attr('data-numb-type', dat2[ix2] + '_' + array[index])
                                )
                                cnt++
                            } else {

                                $('#' + sctNm + ' .number-quest-short-block').append(
                                    $('<span>').text(cnt)
                                    .attr('data-numb-type', dat2[ix2] + '_' + array[index]))

                                cnt++
                            }

                        }

                    }
                }



                imtahanTimeContineAsync(fkImtID, fkUserCode);
              

            },
            complete: function(dht){
               
                $('#preloader2').hide();
            },

            error: function (jqXHR, status) {
                // error handler

                alert('fail' + status.code);
            }
        }); 
     }
     function startQuestBlokFenn(exdat1,apiName){
        $.ajax({
            type: "POST",
            url: UrlQb + "api/post/zdfn/qebulaz/"+apiName,
            data: JSON.stringify(exdat1), // now data come in this function
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            success: function (data, status, jqXHR) {




                fkImtID = data.kv['fkImtahanId'];
                localStorage.setItem('fkCnt', fkImtID);

                for (let ixe = 0; ixe < listFnm.length; ixe++) {
                    var sctNm = listFnm[ixe]




                    console.log(data)

                    
                    var dat = data.kv['section1FenlerUzreSuallar'].split(',')
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
                   
                }



                imtahanTimeContineAsync(fkImtID, fkUserCode);
              

            },
            complete: function(dht){
               
                $('#preloader2').hide();
            },

            error: function (jqXHR, status) {
                // error handler

                alert('fail' + status.code);
            }
        }); 
     }
    function examQuestionUpdate(fkId, fkQstId, cvb, Usid) {

        var prop = {
            "kv": {

                "fkImtahanId": fkId,
                "fkSualId": fkQstId,
                "cavab": cvb,
                "fkImtID": Usid
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

    function setBackQuestionHst(efkId, slId, tol) {
        var prop = {
            "kv": {
                "fkImtahanId": efkId,
                "fkSualId": slId
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
                var typ = data.kv['sualType'];
                var cb = data.kv['cavab'];

                returnDataAnswer(tol, cb, typ)

            },

            error: function (jqXHR, status) {
                // error handler

                alert('fail' + status.code);
            }
        });
    }

    function returnDataAnswer(tol, cb, typ) {

       var stul= localStorage.getItem(tol.attr('id'))

        var tip2 = tol.attr('data-quest-type')

        if (typ === "qapali") {

            tol.find('.question_answers [data-fkans="' + cb + '"]').attr('checked', true);

        }
        if (typ === "situasiya") {
            tol.find('.resultFk').find('.fr-view').empty();
            tol.find('.resultFk').find('.fr-view').append(stul);
           
            //tol.find('[data-fkans="' + cb + '"]').attr('checked', true);
        }
        if (tip2 === "sadesual") {
            tol.find('.resultFk').val(cb);

        }

        examMatrixReturnAns();


    }




    function examEndFuncCore() {
        $('#preloader2').show();
        $('#exam_cont_page').css('display', "none");
        $('#result_cont_page').css('display', "block");
        var qrdApi = localStorage.getItem('data-tyEx')
        examEndFunc1(fkImtID, fkUserCode,qrdApi);
      
        localStorage.clear();
        localStorage.setItem("UsId",fkUserCode);

    }

    function examEndFunc(efkId, UserCode,qrdApi) {
        var prop = {
            "kv": {
                "fkImtahanId": efkId,
                "fkUserId": UserCode
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
              
                var dat = data.tbl[0].r[0];
                      

                console.log(data);
         
                $('#exam_hours').text(dat['imtahanMuddeti']);
                $('#result-name').text(nmFK);
                $('#result-sunmae').text(surNmFK);
                $('#variant_exam').text(dat['cariStatus']);
                $('#start_date_exam').text(convertStDate(dat['baslamaTarixi']));
                $('#start_hours_exam').text(convertStTime(dat['baslamaSaati']));
                $('#end_date_exam').text(convertStDate(dat['bitisTarixi']));
                $('#end_hours_exam').text(convertStTime(dat['bitisSaati']));
                $('#general_result_exam').text(dat['umumiBal']);
                $('#exam_nmea_end').text(nameEx);
                if(qrdApi ==="abtr"){
                    var fenn = data.tbl[2].r;
                    var fnm = data.tbl[1].r;
                    var tb;
                    
                    for (let inde = 0; inde < fnm.length; inde++) {
                        if (fnm[inde]['imtahanNovuAdi'] === nameEx) {
    
                            tb = fnm[inde];
                        }
    
                    }
                    for (let index = 0; index < fenn.length; index++) {
                        let ale = fenn[index];
    
                        var s = ale['imtahanSection'];
               
    
                        
                            $('#fenn-resul-body').append($('<tr>')
                            .append('<td>' + tb['section' + s + ''] + '</td>')
                            .append('<td>' + ale['qapaliSualDogru'] + '/' + ale['qapaliSualSay'] + '</td>')
                            .append('<td>' + ale['aciqSualDogru'] + '/' + ale['aciqSualSay'] + '</td>')
                            .append('<td>' + ale['situasiyaSualCem'] + '/' + ale['situasiyaSualSay'] + '</td>')
                            .append('<td>' + dat['balSection' + ale['imtahanSection'] + ''] + '</td>')
                        )
                        
                      
                       
    
    
                    }
                   
                }
                if(qrdApi === "ortmkt"){
                    var kj = data.kv
                   if(dat.dogruCavablar===""){

                    var jsl = 0;
                   }else{
                       var jsl = dat.dogruCavablar
                   }
                            $(".stTypeQuestth").hide();
                            $(".openTypeQuestth").hide();
                            $('#fenn-resul-body').append($('<tr>')
                            .append('<td>' + nameEx + '</td>')
                            .append('<td>' + jsl + '/50</td>')
                            .append('<td>' + dat.balSection1 + '</td>'))
                    
                }
                
             
                $('#preloader2').hide();
            },
            complete: function(dht){
               
             
            },

            error: function (jqXHR, status) {
                // error handler

                alert('fail' + status.code);
            }
        });
    }

    function examEndFunc1(efkId, UserCode,qrdApi) {
   
        if(qrdApi ==="abtr"){
         var aplAnm= "calculateAbituriyentImtahanNeticesi"

        }
        if(qrdApi === "ortmkt"){
            var aplAnm= "calculateFennUzreImtahanNeticesi"
       
        }
        var prop = {
            "kv": {
                "fkImtahanId": efkId,
                "fkUserId": UserCode
            }
        }


        $.ajax({
            type: "POST",
            url: UrlQb + "api/post/zdfn/qebulaz/"+aplAnm,
            data: JSON.stringify(prop), // now data come in this function
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            dataType: "json",
            success: function (data, status, jqXHR) {
                examEndFunc(fkImtID, fkUserCode,qrdApi)
            

            },

            error: function (jqXHR, status) {
                // error handler

                alert('fail' + status.code);
            }
        });
    }

    function examMatrixReturnAns() {



        var csn = $('.resultFk').val();





    }





})