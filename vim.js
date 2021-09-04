var button = document.getElementById("run");
var box = document.getElementById("vimurl");
var frame = document.getElementById("vim");

var debug = document.getElementById("debug");

function loadvim(vidd=box.value) {
  if (vidd.match(/\//g).length == 3) { //non weird vimeo url
    var vimid = vidd.slice(vidd.lastIndexOf("/")+1, vidd.length);
    frame.setAttribute("src", "https://player.vimeo.com/video/" + vimid);
  }
}
