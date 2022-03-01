	
jQuery(document).ready(function ($) { // wait until the document is ready
	$('#send').click(function(){ // when the button is clicked the code executes
		$('.error').fadeOut('slow'); // reset the error messages (hides them)

		var error = false; // we will set this true if the form isn't valid

		var name = $('input#name').val(); // get the value of the input field
		if(name == "" || name == " ") {
			$('#err-name').fadeIn('slow'); // show the error message
			error = true; // change the error state to true
		}

		var email_compare = /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/; // Syntax to compare against input
		var email = $('input#email').val(); // get the value of the input field
		if (email == "" || email == " ") { // check if the field is empty
			$('#err-email').fadeIn('slow'); // error - empty
			error = true;
		}else if (!email_compare.test(email)) { // if it's not empty check the format against our email_compare variable
			$('#err-emailvld').fadeIn('slow'); // error - not right format
			error = true;
		}

		if(error == true) {
			$('#err-form').slideDown('slow');
			return false;
		}

		var data_string = $('#ajax-form').serialize(); // Collect data from form

		$.ajax({
			type: "POST",
			url: $('#ajax-form').attr('action'),
			data: data_string,
			timeout: 6000,
			error: function(request,error) {
				if (error == "timeout") {
					$('#err-timedout').slideDown('slow');
				}
				else {
					$('#err-state').slideDown('slow');
					$("#err-state").html('An error occurred: ' + error + '');
				}
			},
			success: function() {
				$('#ajax-form').slideUp('slow');
				$('#ajaxsuccess').slideDown('slow');
			}
		});

		return false; // stops user browser being directed to the php file
	}); // end click function
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjb250YWN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlx0XHJcbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCQpIHsgLy8gd2FpdCB1bnRpbCB0aGUgZG9jdW1lbnQgaXMgcmVhZHlcclxuXHQkKCcjc2VuZCcpLmNsaWNrKGZ1bmN0aW9uKCl7IC8vIHdoZW4gdGhlIGJ1dHRvbiBpcyBjbGlja2VkIHRoZSBjb2RlIGV4ZWN1dGVzXHJcblx0XHQkKCcuZXJyb3InKS5mYWRlT3V0KCdzbG93Jyk7IC8vIHJlc2V0IHRoZSBlcnJvciBtZXNzYWdlcyAoaGlkZXMgdGhlbSlcclxuXHJcblx0XHR2YXIgZXJyb3IgPSBmYWxzZTsgLy8gd2Ugd2lsbCBzZXQgdGhpcyB0cnVlIGlmIHRoZSBmb3JtIGlzbid0IHZhbGlkXHJcblxyXG5cdFx0dmFyIG5hbWUgPSAkKCdpbnB1dCNuYW1lJykudmFsKCk7IC8vIGdldCB0aGUgdmFsdWUgb2YgdGhlIGlucHV0IGZpZWxkXHJcblx0XHRpZihuYW1lID09IFwiXCIgfHwgbmFtZSA9PSBcIiBcIikge1xyXG5cdFx0XHQkKCcjZXJyLW5hbWUnKS5mYWRlSW4oJ3Nsb3cnKTsgLy8gc2hvdyB0aGUgZXJyb3IgbWVzc2FnZVxyXG5cdFx0XHRlcnJvciA9IHRydWU7IC8vIGNoYW5nZSB0aGUgZXJyb3Igc3RhdGUgdG8gdHJ1ZVxyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBlbWFpbF9jb21wYXJlID0gL14oW2EtejAtOV8uLV0rKUAoW2RhLXouLV0rKS4oW2Etei5dezIsNn0pJC87IC8vIFN5bnRheCB0byBjb21wYXJlIGFnYWluc3QgaW5wdXRcclxuXHRcdHZhciBlbWFpbCA9ICQoJ2lucHV0I2VtYWlsJykudmFsKCk7IC8vIGdldCB0aGUgdmFsdWUgb2YgdGhlIGlucHV0IGZpZWxkXHJcblx0XHRpZiAoZW1haWwgPT0gXCJcIiB8fCBlbWFpbCA9PSBcIiBcIikgeyAvLyBjaGVjayBpZiB0aGUgZmllbGQgaXMgZW1wdHlcclxuXHRcdFx0JCgnI2Vyci1lbWFpbCcpLmZhZGVJbignc2xvdycpOyAvLyBlcnJvciAtIGVtcHR5XHJcblx0XHRcdGVycm9yID0gdHJ1ZTtcclxuXHRcdH1lbHNlIGlmICghZW1haWxfY29tcGFyZS50ZXN0KGVtYWlsKSkgeyAvLyBpZiBpdCdzIG5vdCBlbXB0eSBjaGVjayB0aGUgZm9ybWF0IGFnYWluc3Qgb3VyIGVtYWlsX2NvbXBhcmUgdmFyaWFibGVcclxuXHRcdFx0JCgnI2Vyci1lbWFpbHZsZCcpLmZhZGVJbignc2xvdycpOyAvLyBlcnJvciAtIG5vdCByaWdodCBmb3JtYXRcclxuXHRcdFx0ZXJyb3IgPSB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGVycm9yID09IHRydWUpIHtcclxuXHRcdFx0JCgnI2Vyci1mb3JtJykuc2xpZGVEb3duKCdzbG93Jyk7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgZGF0YV9zdHJpbmcgPSAkKCcjYWpheC1mb3JtJykuc2VyaWFsaXplKCk7IC8vIENvbGxlY3QgZGF0YSBmcm9tIGZvcm1cclxuXHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR0eXBlOiBcIlBPU1RcIixcclxuXHRcdFx0dXJsOiAkKCcjYWpheC1mb3JtJykuYXR0cignYWN0aW9uJyksXHJcblx0XHRcdGRhdGE6IGRhdGFfc3RyaW5nLFxyXG5cdFx0XHR0aW1lb3V0OiA2MDAwLFxyXG5cdFx0XHRlcnJvcjogZnVuY3Rpb24ocmVxdWVzdCxlcnJvcikge1xyXG5cdFx0XHRcdGlmIChlcnJvciA9PSBcInRpbWVvdXRcIikge1xyXG5cdFx0XHRcdFx0JCgnI2Vyci10aW1lZG91dCcpLnNsaWRlRG93bignc2xvdycpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdCQoJyNlcnItc3RhdGUnKS5zbGlkZURvd24oJ3Nsb3cnKTtcclxuXHRcdFx0XHRcdCQoXCIjZXJyLXN0YXRlXCIpLmh0bWwoJ0FuIGVycm9yIG9jY3VycmVkOiAnICsgZXJyb3IgKyAnJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHQkKCcjYWpheC1mb3JtJykuc2xpZGVVcCgnc2xvdycpO1xyXG5cdFx0XHRcdCQoJyNhamF4c3VjY2VzcycpLnNsaWRlRG93bignc2xvdycpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7IC8vIHN0b3BzIHVzZXIgYnJvd3NlciBiZWluZyBkaXJlY3RlZCB0byB0aGUgcGhwIGZpbGVcclxuXHR9KTsgLy8gZW5kIGNsaWNrIGZ1bmN0aW9uXHJcbn0pO1xyXG4iXSwiZmlsZSI6ImNvbnRhY3QuanMifQ==
