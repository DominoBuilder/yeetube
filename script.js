var button = document.getElementById("run");
var box = document.getElementById("vidurl");
var frame = document.getElementById("vid");
var vidtitle = document.getElementById("vidtitle");
var vidauthor = document.getElementById("vidauthor");
var pcount = document.getElementById("vnum");
var mfbutton = document.getElementById("mf");

var darkMode = false;
var full = false;

cup = new XMLHttpRequest();
cup.onreadystatechange = function() {
  if(this.readyState == 4 && this.status == 200) {
    pcount.innerHTML = cup.responseText.substring(cup.responseText.indexOf("<body>")+6,cup.responseText.indexOf("</body>"));
  }
}
cup.open("GET", "https://yeetubeserver.williamross6.repl.co/addvisit.php");
cup.send();

var url = window.location.href; // or window.location.href for current url
var captured;
var result = null;
if (url.includes("?v=")) {
captured = /v=([^&]+)/.exec(url)[1]; // Value is in [1] ('384' in our case)
result = captured ? captured : null;
}

if (result !== null) {
  loadvid("v=" + result);
  box.value = "https://www.youtube.com/watch?v=" + result;
}

function setBarPos() {
	if (window.innerWidth < 1035) {
	  box.style.position = "relative";
	  box.style.left = "50px";
	  button.style.left = "50px";
	}
}
setBarPos();
function rickRoll() {
	box.value = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
	window.scrollTo(0, 0); 
	loadvid();
}

function loadvid(vidd=box.value,newTab=false) {
  if (vidd !== "") {
    var boxvalue = vidd;
    if (boxvalue.includes("&")) {
      boxvalue = boxvalue.substring(0,boxvalue.indexOf("&"));
      console.log(boxvalue);
    }
    var vidid = boxvalue.split("=")[boxvalue.split("=").length-1];
    if (newTab) {
      window.open("https://www.youtube.com/embed/" + vidid);
      return;
    }
    frame.setAttribute("src", "https://www.youtube.com/embed/" + vidid);
    //window.history.pushState({}, "" + vidid, "/?v=" + vidid); //changes url to current video watched.
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         var res = xhttp.responseText;
         document.title = res.substring(res.indexOf("<body>")+6, res.indexOf("</body>")) + " - YeeTube beta v0.3";
         vidtitle.innerHTML = res.substring(res.indexOf("<body>")+6, res.indexOf("</body>"));
      }
    };
    xhttp.open("GET", "https://yeetubeserver.williamross6.repl.co/getvidtitle.php?v=" + vidid);
    xhttp.send();
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200) {
        var res = req.responseText;
        vidauthor.innerHTML = "By: " + res.substring(res.indexOf("<body>")+6, res.indexOf("</body>"));
      }
    };
    req.open("GET", "https://yeetubeserver.williamross6.repl.co/getvidposter.php?v=" + vidid);
    req.send();
    var req2 = new XMLHttpRequest();
    req2.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var res = req2.responseText;
        res = res.substring(res.indexOf("<body>")+6, res.indexOf("</body>"));
        document.getElementById("vdesc").innerHTML = "<pre>"+res+"</pre>";
      }
    };
    req2.open("GET", "https://yeetubeserver.williamross6.repl.co/getviddesc.php?v="+vidid);
    req2.send();
  } else if (vidd === "") {
	  box.value = "Please enter a YouTube URL here!";
	  //yes i re-enabled this but its a rick roll now teehee
	  setTimeout(function(){box.value = "To make it easier for you, We will generate one in 2 sec"; setTimeout(function(){rickRoll();}, 2000);}, 2000);  
  }
}

// not sure if this works but ill test it but i might not remember
function generateShareUrl() {
  if (box.value !== "") {
  var boxvalue = box.value;
  var vidid = boxvalue.split("=")[boxvalue.split("=").length-1];
  prompt("Use this share URL to share videos with your friends!\n\nThis is your share URL:", "https://dominobuilder.github.io/yeetube?v=" + vidid);
  }
}

function clearBox() {
  box.value = "";
}

//OH MY GOSH IT FREAKING WORKS!!
function switchMode() {
  var texts = document.getElementsByClassName("w-t");
  var button = document.getElementById("mode");
  var yeee = document.getElementById("yeee");
  var buttons = document.getElementsByTagName("button");
  var tube = document.getElementById("Tube")
  var footerBackground = document.getElementById("FoOtEr")
  var footerBorder = document.getElementById("footer")
  darkMode = !darkMode;

  if (darkMode) {

    document.body.style.backgroundColor = "#000000";

    button.innerText = "Turn on Light Mode";

    for (var k = 0; k < texts.length; k++) {
      texts[k].style.color = "#ffffff";
    }

    yeee.style.borderBottomColor = "#ffffff";

    for (i = 0; i < buttons.length; i++) {
      buttons[i].style.borderColor = "white"
      buttons[i].style.borderColor = "white"
    }

    tube.style.color = "black" // racist xD

    footerBackground.style.backgroundColor = "black"
    footerBorder.style.backgroundColor = "black"
    footerBorder.style.borderColor = "white" //this code racist xD



  } else if (darkMode === false) {

    document.body.style.backgroundColor = "#ffffff";

    button.innerText = "Turn on Dark Mode";

  for (var k = 0; k < texts.length; k++) {
      texts[k].style.color = "#000000";
    }

    yeee.style.borderBottomColor = "black";

    for (i = 0; i < buttons.length; i++) {
      buttons[i].style.borderColor = "black"
      buttons[i].style.color = "black"
    }

    footerBackground.style.backgroundColor = "white"
    footerBorder.style.backgroundColor = "white"//very racist lmao XD
    footerBorder.style.borderColor = "black"

    tube.style.color = "white" //this code is so racist xD 
  } 
      
}

function mobileFull() {
  if (full == false) {
    frame.style.position = "fixed";
    frame.width = window.innerWidth + "";
    frame.height = window.innerHeight + "";
    frame.style.top = "0px";
    frame.style.left = "0px";
    frame.style.zIndex = "10";
    frame.frameBorder = "0";
    document.body.style.margin = "0";
    mf.style.position = "fixed";
    mf.style.top = "0px";
    mf.style.zIndex = "11";
    mf.style.left = "50%";
    mf.style.transform = "translate(-50%,0)";
    full = true;
  } else {
    frame.style.position = "relative";
    frame.width = "560";
    frame.height = "315";
    frame.frameBorder = "1";
    frame.style.zIndex = "0";
    mf.style.zIndex = "1";
    mf.style.position = "relative";
    mf.style.left = "0";
    mf.style.top = "0";
    mf.style.transform = "";
    document.body.style.margin = "8px";
    full = false;
  }
}
