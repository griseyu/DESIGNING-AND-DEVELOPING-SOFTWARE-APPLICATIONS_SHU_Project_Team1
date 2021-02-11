function selectProductType(value) {
  var x = document.forms["ProductTypeForm"]["productType"].value;
  var SI = document.getElementById("SkinCareIngredients");
  var HI = document.getElementById("hairCareIngredients");
  var MI = document.getElementById("makeupIngredients");

  switch (x) {
    case "Hair Care":
      //   alert("You picked Hair Care");
      SI.style.display = "none";
      HI.style.display = "block";
      MI.style.display = "none";
      break;
    case "Make Up":
      //   alert("You picked Make Up");
      SI.style.display = "none";
      HI.style.display = "none";
      MI.style.display = "block";
      break;
    case "Skin Care":
      //   alert("You picked Skin Care");
      SI.style.display = "block";
      HI.style.display = "none";
      MI.style.display = "none";
      break;
    default:
      alert("Please make a selection");
  }
}

// function letsGo (); {
//   alert("Button Clicked")
// }

function printChecked() {
  var skinItems = document.getElementsByName("skinIngredients");
  var hairItems = document.getElementsByName("hairIngredients");
  var makeupItems = document.getElementsByName("muIngredients");
  var selectedItems = "";
  // var selectedItemsHair = "";
  for (var i = 0; i < skinItems.length; i++) {
    if (skinItems[i].type == "checkbox" && skinItems[i].checked == true)
      selectedItems += skinItems[i].value + "\n";
    // alert(selectedItems);
  }
  for (var i = 0; i < hairItems.length; i++) {
    if (hairItems[i].type == "checkbox" && hairItems[i].checked == true)
      selectedItems += hairItems[i].value + "\n";
    // alert(selectedItems);
  }
  for (var i = 0; i < makeupItems.length; i++) {
    if (makeupItems[i].type == "checkbox" && makeupItems[i].checked == true)
      selectedItems += makeupItems[i].value + "\n";
    // alert(selectedItems);
  }

  alert(selectedItems);
}

// function printCheckedHair() {
//   var items2 = document.getElementsByName("hairIngredients");
//   var selectedItems2 = "";
//   for (var i = 0; i < items2.length; i++) {
//     if (items2[i].type == "checkbox" && items2[i].checked == true)
//       selectedItems2 += items2[i].value + "\n";
//   }
//   alert(selectedItems2);
// }


/* Animated Progress Bar for results*/

var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}
