// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation')

    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false && (contentModules < 5)) {
          event.preventDefault()
          event.stopPropagation()
          form.classList.add('was-validated')
          displaySubmitError();
        }
        else if(form.checkValidity() === true && contentModules < 5) {
          event.preventDefault();
          displaySubmitError()
        } 
        else if(form.checkValidity() === false && contentModules >= 5) {
          event.preventDefault()
          event.stopPropagation()
          form.classList.add('was-validated')
        }
        else {
          event.preventDefault();
          submitForm();
        }
      }, false)
    })
  }, false)
}())



var netPrice = 0
var listPrice = 0

var contentModules = 0
var numSpecialPopulation = 0

function updatePrice() {
  if (contentModules >= 5) {
    $("#net-price").html("$" + netPrice.toFixed(2))
    $("#list-price").html("$" + (1.25 * netPrice).toFixed(2))
    $("#error-message").remove();
    $("#error-message-submit").remove();
  } else {
    $("#error-message").remove();
    errorMessage();
    $("#net-price").html("$0.00")
    $("#list-price").html("$0.00")
  }
}

function addModule() {
  contentModules += 1
  netPrice += 3.20
}

function removeModule() {
  contentModules -= 1
  netPrice -= 3.20
}

function addACES() {
  netPrice += 5.00
}

function removeACES() {
  netPrice -= 5.00
}

function addSpecialPopulation() {
  numSpecialPopulation += 1
}

function removeSpecialPopulation() {
  numSpecialPopulation -= 1
}

$(".content-module").change(function () {
  // this will contain a reference to the checkbox   
  if (this.checked) {
    // the checkbox is now checked 
    addModule();
    updatePrice();
  } else {
    // the checkbox is now no longer checked
    removeModule();
    updatePrice();
  }
});

$(".ACES").change(function () {
  if (this.checked) {
    addACES();
    updatePrice();
  } else {
    removeACES();
    updatePrice();
  }
});

$(".button-clear").click(function () {
  $("#custom-form").trigger("reset");
  contentModules = 0;
  netPrice = 0;
  updatePrice();
});

function errorMessage() {
  $("#price-list").append("<li id='error-message' class='list-group-item d-flex justify-content-between'>Please select a minimum of 5 content modules</li>")
  $("#error-message").show()
};

$(".special-population").change(function () {
  if (this.checked) {
    addSpecialPopulation()
    if (numSpecialPopulation >= 3) {
      netPrice += 3;
      updatePrice();
    } else {
      updatePrice();
    }
  } else {
    removeSpecialPopulation()
    if (numSpecialPopulation >= 2) {
      netPrice -= 3;
      updatePrice();
    }
  }
});

function displaySubmitError() {
  $("#content-header").append("<p id='error-message-submit'>You must select at least 5 content modules</p>");
  // $(".content-module-label:not(:checked)").addClass("red");
}

var $form = $('form#custom-form'),
  url = 'https://script.google.com/macros/s/AKfycbxbU4MU3ZqEn-MhGqmCGfhu3s-l988VNvETAECVAxwG0ryvmIb1/exec'

// write function to send data to email/GoogleSheets
function submitForm() {
  var jqxhr = $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: $form.serialize()
    , success: function () {
      $("body").html("<div class='container'><div class='py-5 text-center'><h2>Thank you</h2><p class='lead'>We will be in touch soon.</p><p class='lead' style='font-size: 14px'>Back to <a href='index.html'>form</a>.</p></div></div>")
    }
  });
};