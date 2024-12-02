
// function myFunction() {
//     console.log("heo");
//     var x = document.getElementById("fname").value;
//     document.getElementById("fname").innerHTML = "You selected: " + x;
//   }
document.getElementById("genderInput").style.visibility = 'hidden';
document.getElementById("emailInput").style.visibility = 'hidden';
document.getElementById("passwordInput").style.visibility = 'hidden';
document.getElementById("numberInput").style.visibility = 'hidden';
document.getElementById("submitInput").style.visibility = 'hidden';

  function myFunction() {

    var x = document.getElementById("fname").value;
    document.getElementById("demo").innerHTML = "Hi ," + x +'!' + ' Can i know your gender';
    document.getElementById("fname").type="radio"; 
    // document.getElementById("fname").style.visibility = 'hidden';

    x.addEventListener("keypress", function(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
        //   document.getElementById("myBtn").click();
        console.log("hi");  
        emailFunction();
        console.log("hi"); 

        }
      });





    
}
function emailFunction(){
    
    console.log("hey1");
    document.getElementById("genderInput").style.visibility = "visible";
    document.getElementById("emailInput").style.visibility = 'visible';
    console.log("hey2");
  }
