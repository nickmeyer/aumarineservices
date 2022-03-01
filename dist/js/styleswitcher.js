function setActiveStyleSheet(title) {
  var i, a, main;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
      a.disabled = true;
      if(a.getAttribute("title") == title) a.disabled = false;
    }
  }
}

function getActiveStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) return a.getAttribute("title");
  }
  return null;
}

function getPreferredStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1
       && a.getAttribute("rel").indexOf("alt") == -1
       && a.getAttribute("title")
       ) return a.getAttribute("title");
  }
  return null;
}

function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

window.onload = function(e) {
  var cookie = readCookie("style");
  var title = cookie ? cookie : getPreferredStyleSheet();
  setActiveStyleSheet(title);
}

window.onunload = function(e) {
  var title = getActiveStyleSheet();
  createCookie("style", title, 365);
}

var cookie = readCookie("style");
var title = cookie ? cookie : getPreferredStyleSheet();
setActiveStyleSheet(title);












$(document).ready(function() {

 $("select#navigation1").click(function(){

  var type = $(this).attr('value');
  if ($("#css_navigation_style").length > 0){
	  $("#css_navigation_style").remove();
  }
  $("head").append("<link>");
  css = $("head").children(":last");
  css.attr({
    rel:  "stylesheet",
    type: "text/css",
    id: "css_navigation_style",
    href: "css/navigation-style-" + type + ".css"
  });
 })

 



}); 
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzdHlsZXN3aXRjaGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHNldEFjdGl2ZVN0eWxlU2hlZXQodGl0bGUpIHtcclxuICB2YXIgaSwgYSwgbWFpbjtcclxuICBmb3IoaT0wOyAoYSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwibGlua1wiKVtpXSk7IGkrKykge1xyXG4gICAgaWYoYS5nZXRBdHRyaWJ1dGUoXCJyZWxcIikuaW5kZXhPZihcInN0eWxlXCIpICE9IC0xICYmIGEuZ2V0QXR0cmlidXRlKFwidGl0bGVcIikpIHtcclxuICAgICAgYS5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgIGlmKGEuZ2V0QXR0cmlidXRlKFwidGl0bGVcIikgPT0gdGl0bGUpIGEuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEFjdGl2ZVN0eWxlU2hlZXQoKSB7XHJcbiAgdmFyIGksIGE7XHJcbiAgZm9yKGk9MDsgKGEgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImxpbmtcIilbaV0pOyBpKyspIHtcclxuICAgIGlmKGEuZ2V0QXR0cmlidXRlKFwicmVsXCIpLmluZGV4T2YoXCJzdHlsZVwiKSAhPSAtMSAmJiBhLmdldEF0dHJpYnV0ZShcInRpdGxlXCIpICYmICFhLmRpc2FibGVkKSByZXR1cm4gYS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcclxuICB9XHJcbiAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFByZWZlcnJlZFN0eWxlU2hlZXQoKSB7XHJcbiAgdmFyIGksIGE7XHJcbiAgZm9yKGk9MDsgKGEgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImxpbmtcIilbaV0pOyBpKyspIHtcclxuICAgIGlmKGEuZ2V0QXR0cmlidXRlKFwicmVsXCIpLmluZGV4T2YoXCJzdHlsZVwiKSAhPSAtMVxyXG4gICAgICAgJiYgYS5nZXRBdHRyaWJ1dGUoXCJyZWxcIikuaW5kZXhPZihcImFsdFwiKSA9PSAtMVxyXG4gICAgICAgJiYgYS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKVxyXG4gICAgICAgKSByZXR1cm4gYS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcclxuICB9XHJcbiAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUNvb2tpZShuYW1lLHZhbHVlLGRheXMpIHtcclxuICBpZiAoZGF5cykge1xyXG4gICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpKyhkYXlzKjI0KjYwKjYwKjEwMDApKTtcclxuICAgIHZhciBleHBpcmVzID0gXCI7IGV4cGlyZXM9XCIrZGF0ZS50b0dNVFN0cmluZygpO1xyXG4gIH1cclxuICBlbHNlIGV4cGlyZXMgPSBcIlwiO1xyXG4gIGRvY3VtZW50LmNvb2tpZSA9IG5hbWUrXCI9XCIrdmFsdWUrZXhwaXJlcytcIjsgcGF0aD0vXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlYWRDb29raWUobmFtZSkge1xyXG4gIHZhciBuYW1lRVEgPSBuYW1lICsgXCI9XCI7XHJcbiAgdmFyIGNhID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7Jyk7XHJcbiAgZm9yKHZhciBpPTA7aSA8IGNhLmxlbmd0aDtpKyspIHtcclxuICAgIHZhciBjID0gY2FbaV07XHJcbiAgICB3aGlsZSAoYy5jaGFyQXQoMCk9PScgJykgYyA9IGMuc3Vic3RyaW5nKDEsYy5sZW5ndGgpO1xyXG4gICAgaWYgKGMuaW5kZXhPZihuYW1lRVEpID09IDApIHJldHVybiBjLnN1YnN0cmluZyhuYW1lRVEubGVuZ3RoLGMubGVuZ3RoKTtcclxuICB9XHJcbiAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbihlKSB7XHJcbiAgdmFyIGNvb2tpZSA9IHJlYWRDb29raWUoXCJzdHlsZVwiKTtcclxuICB2YXIgdGl0bGUgPSBjb29raWUgPyBjb29raWUgOiBnZXRQcmVmZXJyZWRTdHlsZVNoZWV0KCk7XHJcbiAgc2V0QWN0aXZlU3R5bGVTaGVldCh0aXRsZSk7XHJcbn1cclxuXHJcbndpbmRvdy5vbnVubG9hZCA9IGZ1bmN0aW9uKGUpIHtcclxuICB2YXIgdGl0bGUgPSBnZXRBY3RpdmVTdHlsZVNoZWV0KCk7XHJcbiAgY3JlYXRlQ29va2llKFwic3R5bGVcIiwgdGl0bGUsIDM2NSk7XHJcbn1cclxuXHJcbnZhciBjb29raWUgPSByZWFkQ29va2llKFwic3R5bGVcIik7XHJcbnZhciB0aXRsZSA9IGNvb2tpZSA/IGNvb2tpZSA6IGdldFByZWZlcnJlZFN0eWxlU2hlZXQoKTtcclxuc2V0QWN0aXZlU3R5bGVTaGVldCh0aXRsZSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG5cclxuICQoXCJzZWxlY3QjbmF2aWdhdGlvbjFcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuXHJcbiAgdmFyIHR5cGUgPSAkKHRoaXMpLmF0dHIoJ3ZhbHVlJyk7XHJcbiAgaWYgKCQoXCIjY3NzX25hdmlnYXRpb25fc3R5bGVcIikubGVuZ3RoID4gMCl7XHJcblx0ICAkKFwiI2Nzc19uYXZpZ2F0aW9uX3N0eWxlXCIpLnJlbW92ZSgpO1xyXG4gIH1cclxuICAkKFwiaGVhZFwiKS5hcHBlbmQoXCI8bGluaz5cIik7XHJcbiAgY3NzID0gJChcImhlYWRcIikuY2hpbGRyZW4oXCI6bGFzdFwiKTtcclxuICBjc3MuYXR0cih7XHJcbiAgICByZWw6ICBcInN0eWxlc2hlZXRcIixcclxuICAgIHR5cGU6IFwidGV4dC9jc3NcIixcclxuICAgIGlkOiBcImNzc19uYXZpZ2F0aW9uX3N0eWxlXCIsXHJcbiAgICBocmVmOiBcImNzcy9uYXZpZ2F0aW9uLXN0eWxlLVwiICsgdHlwZSArIFwiLmNzc1wiXHJcbiAgfSk7XHJcbiB9KVxyXG5cclxuIFxyXG5cclxuXHJcblxyXG59KTsgIl0sImZpbGUiOiJzdHlsZXN3aXRjaGVyLmpzIn0=
