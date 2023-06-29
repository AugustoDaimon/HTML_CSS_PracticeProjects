$(document).ready(function() {
  $('#formId').submit(function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Send the form data using AJAX
    $.ajax({
      url: googleFormsUrl,
      method: 'POST',
      data: $(this).serialize(),
      success: function(response) {
        // Handle the success response
      },
      error: function(xhr, status, error) {
        // Handle any errors
      }
    });

    // Optionally, you can perform any other actions or show a success message on the page

    // Clear the form fields if needed
    $(this).trigger('reset');
  });
});