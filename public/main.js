// Function to open burger menu
// Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon

function openMenu() {
  console.log("test");
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

//Images on home page - function to move through images
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

async function CreateTableFromJSONhair() {
  // CreateTableFromJSON()
  await fetch(
    "http://localhost:3000/hairCareResultsAPI" + window.location.search
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      appendData(data);
    })
    .catch(function (err) {
      console.log("error: " + err);
    });

  function appendData(data) {
    var col = [];
    for (var i = 0; i < data.length; i++) {
      for (var key in data[i]) {
        if (col.indexOf(key) === -1) {
          col.push(key);
        }
      }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");
    table.setAttribute("class", "styled-table");
    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1); // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
      var th = document.createElement("th"); // TABLE HEADER.
      th.innerHTML = col[i];
      tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < data.length; i++) {
      tr = table.insertRow(-1);

      for (var j = 0; j < col.length; j++) {
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = data[i][col[j]];
      }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("myDataH");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
  }
}

async function CreateTableFromJSONskin() {
  // CreateTableFromJSON()
  await fetch(
    "http://localhost:3000/skinCareResultsAPI" + window.location.search
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      appendData(data);
    })
    .catch(function (err) {
      console.log("error: " + err);
    });

  function appendData(data) {
    var col = [];
    for (var i = 0; i < data.length; i++) {
      for (var key in data[i]) {
        if (col.indexOf(key) === -1) {
          col.push(key);
        }
      }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");
    table.setAttribute("class", "styled-table");
    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1); // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
      var th = document.createElement("th"); // TABLE HEADER.
      th.innerHTML = col[i];
      tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < data.length; i++) {
      tr = table.insertRow(-1);

      for (var j = 0; j < col.length; j++) {
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = data[i][col[j]];
      }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("myDataS");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
  }
}

async function CreateTableFromJSONmakeUp() {
  // CreateTableFromJSON()
  await fetch("http://localhost:3000/makeUpResultsAPI" + window.location.search)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      appendData(data);
    })
    .catch(function (err) {
      console.log("error: " + err);
    });

  function appendData(data) {
    var col = [];
    for (var i = 0; i < data.length; i++) {
      for (var key in data[i]) {
        if (col.indexOf(key) === -1) {
          col.push(key);
        }
      }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");
    table.setAttribute("class", "styled-table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1); // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
      var th = document.createElement("th"); // TABLE HEADER.
      th.innerHTML = col[i];
      tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < data.length; i++) {
      tr = table.insertRow(-1);

      for (var j = 0; j < col.length; j++) {
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = data[i][col[j]];
      }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("myDataM");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
  }
}

function goBack() {
  window.history.back();
}



