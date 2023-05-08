var list = document.querySelector("ul");
var yourName = document.getElementById("yourName").value;
var yourMessage = document.getElementById("yourMessage").value;
var submitButton = document.getElementById("submitMessage");
// var newLI = document.createElement("li");
var form = document.getElementById("myForm");


submitButton.addEventListener("click", e => {
  e.preventDefault()
  var yourName = document.getElementById("yourName").value;
  var yourMessage = document.getElementById("yourMessage").value;
  const listItem = document.createElement("li")
  listItem.innerHTML = yourName + "<br>" + yourMessage 
  list.append(listItem)
  form.reset();
})