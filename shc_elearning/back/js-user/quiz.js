  // the selector will match all input controls of type :checkbox
  // and attach a click event handler
  $("input:checkbox").on('click', function() {
      // in the handler, 'this' refers to the box clicked on
      var $box = $(this);
      if ($box.is(":checked")) {
        // the name of the box is retrieved using the .attr() method
        // as it is assumed and expected to be immutable
        var group = "input:checkbox[name='" + $box.attr("name") + "']";
        // the checked state of the group/box on the other hand will change
        // and the current value is retrieved using .prop() method
        $(group).prop("checked", false);
        $box.prop("checked", true);
      } else {
        $box.prop("checked", false);
      }
  });

  function cek_answer(curr_id){
      var answer = '';
      if($('#checkbox_' + curr_id + '_a').is(':checked')){
        answer = 'a';
      }else if($('#checkbox_' + curr_id + '_b').is(':checked')){
        answer = 'b';
      }else if($('#checkbox_' + curr_id + '_c').is(':checked')){
        answer = 'c';
      }else if($('#checkbox_' + curr_id + '_d').is(':checked')){
        answer = 'd';
      }else{
        answer = 'not_answered';
      }

      return answer;
  }

  $('.goto-btn').click(function(){
      var goto_id      = $(this).attr('goto_id');

      $('.question').each(function () {

          var id = $(this).attr('id');
          $('#' + id).hide();

      });

      $('.goto-btn').each(function () {
          $(this).removeClass('bg-blue-400')
                 .removeClass('bg-blue-grey-400')
                 .addClass('bg-blue-grey-400');
      });

      $('#goto-btn-' + goto_id).removeClass('bg-blue-grey-400')
                               .addClass('bg-blue-400')
                               .css('color','#fff');
      $('#question-' + goto_id).fadeIn( "fast" );
  });

  $('.next-btn').click(function(){
      var curr_id      = $(this).attr('curr_id');
      var next_id      = $(this).attr('next_id');
      var prev_id      = $(this).attr('prev_id');
      var urlUpdatePos = $(this).attr('urlUpdatePos');
      //alert(curr_id + ":" + cek_answer(curr_id));
      //alert(urlUpdatePos);
      var answer = cek_answer(curr_id);
      if(answer !== 'not_answered'){
          $.post( urlUpdatePos, { question_id : curr_id,answer : cek_answer(curr_id) } );

          $('#goto-btn-' + curr_id).removeClass('bg-blue-grey-400')
                                   .addClass('bg-green-400')
                                   .css('color','#fff');
      }

      $('.goto-btn').each(function () {
          $(this).removeClass('bg-blue-400')
                 .removeClass('bg-blue-grey-400')
                 .addClass('bg-blue-grey-400');
      });

      $('#goto-btn-' + next_id).removeClass('bg-blue-grey-400')
                               .addClass('bg-blue-400')
                               .css('color','#fff');




      $('#question-' + curr_id).hide();
      $('#question-' + next_id).fadeIn( "fast" );
  });

  $('.prev-btn').click(function(){
      var curr_id = $(this).attr('curr_id');
      var next_id = $(this).attr('next_id');
      var prev_id = $(this).attr('prev_id');
      var urlUpdatePos = $(this).attr('urlUpdatePos');
      //alert(cek_answer(curr_id));
      //alert(curr_id + ":" + cek_answer(curr_id));

      var answer = cek_answer(curr_id);
      if(answer !== 'not_answered'){
          $.post( urlUpdatePos, { question_id : curr_id,answer : cek_answer(curr_id) } );

          $('#goto-btn-' + curr_id).removeClass('bg-blue-grey-400')
                                   .addClass('bg-green-400')
                                   .css('color','#fff');
      }

      $('.goto-btn').each(function () {
          $(this).removeClass('bg-blue-400')
                 .removeClass('bg-blue-grey-400')
                 .addClass('bg-blue-grey-400');
      });

      $('#goto-btn-' + prev_id).removeClass('bg-blue-grey-400')
                               .addClass('bg-blue-400')
                               .css('color','#fff');

      $('#question-' + curr_id).hide();
      $('#question-' + prev_id).fadeIn("fast");
  });

  $('.last-btn').click(function(){
      var curr_id = $(this).attr('curr_id');
      var urlUpdatePos = $(this).attr('urlUpdatePos');

      var answer = cek_answer(curr_id);
      if(answer !== 'not_answered'){
          $.post( urlUpdatePos,
                  { question_id : curr_id,answer : cek_answer(curr_id) }
          ).done(function( data ) {
            //alert(data);
            window.location.href = base + 'participator/classroom/' + data;
          });
          //http://localhost/diklatonline/participator/classroom/kelas-a

      }

  });
