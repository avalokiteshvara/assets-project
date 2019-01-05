
function signin(){
	$('#alert-signin-success').hide();

    $(".required input").each(function(){
        if ($.trim($(this).val()).length === 0){

            $(this).parent().addClass("has-error");
            $('#username').focus();
            alert("Mohon isi semua kolom yang diperlukan (*)");

           	return false;
        }else{
            $(this).parent().removeClass("has-error");
        }
    });



	$.post( base + 'signin', {
		username: $('#username').val(),
		password: $('#password').val() })
	 .done(function( data ) {
	   if (data.status !== 'not_found') {
	        location.reload(true);
	   }
	});
}

$('#username').keypress(function (e) {
	 if (e.which == 13)
	 {
	 	$('#password').focus();
	 }
});

$('#password').keypress(function (e) {
	 if (e.which == 13)
	 {
	 	signin();
        return false;
	 }
});

$("#submit").click(function() {
	signin();
});
