
// function myFunction() {
//     console.log("heo");
    // var x = document.getElementById("fname").value;
//     document.getElementById("fname").innerHTML = "You selected: " + x;
//   }
// document.getElementById("genderInput").style.visibility = 'hidden';
// document.getElementById("emailInput").style.visibility = 'hidden';
// document.getElementById("passwordInput").style.visibility = 'hidden';
// document.getElementById("numberInput").style.visibility = 'hidden';
// document.getElementById("submitInput").style.visibility = 'hidden';

//   function myFunction() {

//     var x = document.getElementById("fname").value;
//     document.getElementById("demo").innerHTML = "Hi ," + x +'!' + ' Can i know your gender';
//     document.getElementById("fname").type="radio"; 
//     // document.getElementById("fname").style.visibility = 'hidden';

//     emailFunction();
    
// }
// function emailFunction(){
    
//     console.log("hey1");
//     document.getElementById("genderInput").style.visibility = "visible";
//     document.getElementById("genderInput").classList.remove('hidden');
    
//     console.log("hey2");
//   }


//   var currentTab = 0; // Current tab is set to be the first tab (0)
// showTab(currentTab); // Display the current tab

// function showTab(n) {
//   // This function will display the specified tab of the form ...
//   var x = document.getElementsByClassName("tab");
//   x[n].style.display = "block";
//   // ... and fix the Previous/Next buttons:
//   if (n == 0) {
//     document.getElementById("prevBtn").style.display = "none";
//   } else {
//     document.getElementById("prevBtn").style.display = "inline";
//   }
//   if (n == (x.length - 1)) {
//     document.getElementById("nextBtn").innerHTML = "Submit";
//   } else {
//     document.getElementById("nextBtn").innerHTML = "Next";
//   }
//   // ... and run a function that displays the correct step indicator:
//   fixStepIndicator(n)
// }

// function nextPrev(n) {
//   // This function will figure out which tab to display
//   var x = document.getElementsByClassName("tab");
//   // Exit the function if any field in the current tab is invalid:
//   if (n == 1 && !validateForm()) return false;
//   // Hide the current tab:
//   x[currentTab].style.display = "none";
//   // Increase or decrease the current tab by 1:
//   currentTab = currentTab + n;
//   // if you have reached the end of the form... :
//   if (currentTab >= x.length) {
//     //...the form gets submitted:
//     document.getElementById("regForm").submit();
//     return false;
//   }
//   // Otherwise, display the correct tab:
//   showTab(currentTab);
// }

// function validateForm() {
//   // This function deals with validation of the form fields
//   var x, y, i, valid = true;
//   x = document.getElementsByClassName("tab");
//   y = x[currentTab].getElementsByTagName("input");
//   // A loop that checks every input field in the current tab:
//   for (i = 0; i < y.length; i++) {
//     // If a field is empty...
//     if (y[i].value == "") {
//       // add an "invalid" class to the field:
//       y[i].className += " invalid";
//       // and set the current valid status to false:
//       valid = false;
//     }
//   }
//   // If the valid status is true, mark the step as finished and valid:
//   if (valid) {
//     document.getElementsByClassName("step")[currentTab].className += " finish";
//   }
//   return valid; // return the valid status
// }

// function fixStepIndicator(n) {
//   // This function removes the "active" class of all steps...
//   var i, x = document.getElementsByClassName("step");
//   for (i = 0; i < x.length; i++) {
//     x[i].className = x[i].className.replace(" active", "");
//   }
//   //... and adds the "active" class to the current step:
//   x[n].className += " active";
// }




document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('multiStepForm');
  const steps = form.querySelectorAll('.step');
  const prevButton = form.querySelector('.prev');
  const nextButton = form.querySelector('.next');
  let currentStep = 0;

  updateButtons();

  nextButton.addEventListener('click', () => {
      if (validateForm()) {
        console.log("nextButton 12"); 
        let name = steps[0].querySelector("input").value;
        console.log(name);
          steps[currentStep].classList
                              .remove('active');
       
         currentStep++;
         let genderLabel = document.getElementById("genderLabel"); 
         genderLabel.innerHTML = "Hi ," + name +'!' + ' Can i know your gender';

         let emailInput = document.getElementById("emailInput");
         emailInput.innerHTML = name + "!"+ " enter your email"; 

          steps[currentStep].classList
                              .add('active');
                              console.log("nextButton 1"); 
          updateButtons();
      }
  });

  prevButton.addEventListener('click', () => {
      steps[currentStep].classList
                          .remove('active');
      currentStep--;
      steps[currentStep].classList
                          .add('active');
      updateButtons();
  });

  form.addEventListener('submit', (event) => {
      if (!validateForm()) {
          // event.preventDefault();
          console.log("submit");
          let randomNumber = Math.floor((Math.random() * 10000) + 1);
          let registerId = document.getElementById('registerId'); 
          registerId.innerHTML = "Your register Id is :" + randomNumber;
      }
      console.log("submit2");
  });

  function validateForm() {
      const currentInputs = steps[currentStep]
          .querySelectorAll('input, textarea');
      let valid = true;
      currentInputs.forEach(input => {
          if (!input.checkValidity()) {
              input.reportValidity();
              valid = false;
          }
      });
      return valid;
  }

  function updateButtons() {
      if (currentStep === 0) {
          prevButton.style.display = 'none';
      } else {
          prevButton.style.display = 'inline-block';
      }

      if (currentStep === steps.length - 1) {
          nextButton.style.display = 'none';
          form.querySelector('button[type="submit"]')
                .style.display = 'inline-block';
      } else {
          nextButton.style.display = 'inline-block';
          form.querySelector('button[type="submit"]')
                .style.display = 'none';
      }
  }
});