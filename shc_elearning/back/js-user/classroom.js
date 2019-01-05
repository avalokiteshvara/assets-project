/*
  ::::::::::::::::::::: classroom/add-material/(:any) :::::::::::::::::::::::::
*/
var rows_selected = [];
var table = $('#data-add').DataTable({
  'columnDefs': [{
    'targets': 0,
    'searchable': true,
    'orderable': false,
    'className': 'dt-body-center'
  }],
  'order': [
    [1, 'asc']
  ],
  'rowCallback': function(row, data, dataIndex) {
    // Get row ID
    var rowId = data[0];

    // If row ID is in the list of selected row IDs
    if ($.inArray(rowId, rows_selected) !== -1) {
      $(row).find('input[type="checkbox"]').prop('checked', true);
      $(row).addClass('selected');
    }
  }
});

function updateDataTableSelectAllCtrl(table) {
  var $table = table.table().node();
  var $chkbox_all = $('tbody input[type="checkbox"]', $table);
  var $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
  var chkbox_select_all = $('thead input[name="select_all"]', $table).get(0);

  // If none of the checkboxes are checked
  if ($chkbox_checked.length === 0) {
    chkbox_select_all.checked = false;
    if ('indeterminate' in chkbox_select_all) {
      chkbox_select_all.indeterminate = false;
    }

    // If all of the checkboxes are checked
  } else if ($chkbox_checked.length === $chkbox_all.length) {
    chkbox_select_all.checked = true;
    if ('indeterminate' in chkbox_select_all) {
      chkbox_select_all.indeterminate = false;
    }

    // If some of the checkboxes are checked
  } else {
    chkbox_select_all.checked = true;
    if ('indeterminate' in chkbox_select_all) {
      chkbox_select_all.indeterminate = true;
    }
  }

  //alert(rows_selected.toString());
  // var selected_id = [];
  // $.each(rows_selected, function(index, rowId){
  //        // Create a hidden element
  //       //  $(form).append(
  //       //      $('<input>')
  //       //         .attr('type', 'hidden')
  //       //         .attr('name', 'id[]')
  //       //         .val(rowId)
  //       //  );
  //       selected_id.push(rowId);
  // });
  //
  // alert(selected_id.toString());
}



// Handle click on checkbox
$('#data-add tbody').on('click', 'input[type="checkbox"]', function(e) {
  var $row = $(this).closest('tr');

  // Get row data
  var data = table.row($row).data();

  // Get row ID
  var rowId = data[0];

  // Determine whether row ID is in the list of selected row IDs
  var index = $.inArray(rowId, rows_selected);

  // If checkbox is checked and row ID is not in list of selected row IDs
  if (this.checked && index === -1) {
    rows_selected.push(rowId);

    // Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
  } else if (!this.checked && index !== -1) {
    rows_selected.splice(index, 1);
  }

  var val_id = $(this).attr('value');

  if (this.checked) {

    $.post(window.location.href, { act: 'add', id: val_id });
    $row.addClass('selected');

  } else {
    $.post(window.location.href, { act: 'remove', id: val_id });
    $row.removeClass('selected');
  }

  // Update state of "Select all" control
  updateDataTableSelectAllCtrl(table);

  // Prevent click event from propagating to parent
  e.stopPropagation();
});

// Handle click on table cells with checkboxes
$('#data-add').on('click', 'tbody td, thead th:first-child', function(e) {
  $(this).parent().find('input[type="checkbox"]').trigger('click');
});

// Handle click on "Select all" control
$('#data-add thead input[name="select_all"]').on('click', function(e) {
  if (this.checked) {
    $('#data-add tbody input[type="checkbox"]:not(:checked)').trigger('click');
  } else {
    $('#data-add tbody input[type="checkbox"]:checked').trigger('click');
  }

  // Prevent click event from propagating to parent
  e.stopPropagation();
});

// Handle table draw event
table.on('draw', function() {
  // Update state of "Select all" control
  updateDataTableSelectAllCtrl(table);
});


/**
::::::::::::::::::::: classroom/edit-course/(:any)#material_and_quiz :::::::::::
**/

$('.nestable').on('change', function() {
  var nestable = $('.nestable').nestable('serialize');
  var slug = $('#nestable-handles-primary').attr('slug');
  var post_url = $('#nestable-handles-primary').attr('posturl');

  var array_id = [];
  for (var i = 0, l = nestable.length; i < l; i++) {
    array_id.push(nestable[i].id);
  }

  $.post(post_url, {
    list: array_id.toString(),
    slug: slug
  });
});



// $("#add-classroom-participator").click(function() {
//
//   var added_participator = $('#selected-add-participator').val().join();
//   var classroom_id = $(this).attr('classroom_id');
//
//   $.post(base + 'classroom/participator/add_list', {
//     addedparticipator: added_participator,
//     classroomid: classroom_id
//
//   }).done(function(data) {
//     $('#participator-list').val(data.participatorlist);
//     $('#selected-add-participator').select2('val', '');
//   });
//
//   location.reload(true);
// });

// $("#add-classroom-instructor").click(function() {
//
//   // if(isNull($('#selected-add-participator').val())){
//   // 	return false;
//   // }
//
//   var added_instructor = $('#selected-add-instructor').val().join();
//   var classroom_id = $(this).attr('classroom_id');
//
//   $.post(base + 'classroom/instructor/add_list', {
//     addedinstructor: added_instructor,
//     classroomid: classroom_id
//
//   }).done(function(data) {
//     $('#instructor-list').val(data.instructorlist);
//     $('#selected-add-instructor').select2('val', '');
//   });
//
//   location.reload();
// });

//remove instructor id dari instructor list di classroom
// $(".classroom-instructor-remove").click(function() {
//
//   var table = $('#instructor-table').DataTable();
//   var id = $(this).attr("id").replace('instructor-', '');
//   var classroom_id = $('#instructor-list').attr('classroom_id');
//
//   var instructor_list = $('#instructor-list').val().split(',');
//   var i = instructor_list.indexOf(id);
//   if (i != -1) {
//     instructor_list.splice(i, 1);
//   }
//
//   $('#instructor-list').val(instructor_list.join());
//
//   $.post(base + 'classroom/instructor/update_list', {
//     instructorlist: instructor_list.join(),
//     deleted_id: id,
//     classroomid: classroom_id
//
//   }).done(function(data) {
//     table.row('#tr-instructor-' + id).remove().draw(false);
//     $("#selected-add-instructor").append("<option value='" + data.id + "'>" + data.fullname + "</option>");
//   });
//
//   return false;
// });

//remove participator id dari participator list di classroom
// $(".classroom-participator-remove").click(function() {
//   var table = $('#participator-table').DataTable();
//   var id = $(this).attr("id").replace('participator-', '');
//   var classroom_id = $('#instructor-list').attr('classroom_id');
//
//   var participator_list = $('#participator-list').val().split(',');
//   var i = participator_list.indexOf(id);
//   if (i != -1) {
//     participator_list.splice(i, 1);
//   }
//
//   $('#participator-list').val(participator_list.join());
//
//   $.post(base + 'classroom/participator/update_list/', {
//     participatorlist: participator_list.join(),
//     deleted_id: id,
//     classroomid: classroom_id
//
//   }).done(function(data) {
//     // alert('#tr-participator-' + id);
//     table.row('#tr-participator-' + id).remove().draw(false);
//     $("#selected-add-participator").append("<option value='" + data.id + "'>" + data.fullname + "</option>");
//   });
//
//   return false;
// });




//task files


//http://localhost/diklatonline/classroom/edit-course/kelas-a-pelajaran-hari-pertama
//showing bootstrap modal on
$('.modal-materi-quiz').click(function() {
  var data_to_load = $(this).attr('data-to-load');
  //alert(data_to_load);
  $.post(base + 'classroom/get_materi_and_quiz_details',{
    param : data_to_load
  }).done(function(data) {
    $('#show-result-here').html(data);
  });
});
