var request = new XMLHttpRequest();
var username = "ryan.a.best";
var key = "QCZeqOIewtlwmxUdKgxc"
var secret = "fAwVNoAFCOTZIlgANbVtmMVTXpQrzzKn"
var release_id =
10105639
;

var release_url = "https://api.discogs.com/releases/" + release_id + "?key=" + key + "&secret=" + secret;
request.open("GET",release_url,false);
request.send();
var release = JSON.parse(request.response);

var tracklist = release["tracklist"]

for (i=0;i<tracklist.length;i++) {
    var feat = ""
    if (typeof tracklist[i]["extraartists"] != 'undefined') {
      for (j=0;i<tracklist[i]["extraartists"].length;j++) {
        if (tracklist[i]["extraartists"][j]["role"] == "Featuring") {
          var feat = "ft. " + tracklist[i]["extraartists"][j]["name"]
        } else {
          var feat = ""
        }
      }
    }
    if (tracklist[i]["type_"] == "track") {
        console.log(tracklist[i]["position"] + " " + tracklist[i]["title"] + " " + feat
        )
    }
}
