var request = new XMLHttpRequest();
var username = "ryan.a.best";
var key = "QCZeqOIewtlwmxUdKgxc"
var secret = "fAwVNoAFCOTZIlgANbVtmMVTXpQrzzKn"
var release_id = [
10105639,
6549215,
649042,
8066727,
578894,
758436,
7383499,
1436340,
464292,
3964901
]
;
/*
var release_url = "https://api.discogs.com/releases/" + release_id + "?key=" + key + "&secret=" + secret;
request.open("GET",release_url,false);
request.send();
var release = JSON.parse(request.response);
console.log(release["tracklist"].length);
*/
/*
var feat = ""

if (release["tracklist"][0]["extraartists"][0]["role"]=="Featuring") {
    feat = " ft. " + release["tracklist"][0]["extraartists"][0]["name"];
};

console.log(feat)
*/

var tracklist = release["tracklist"]

for (r=0;r<release_id.length;r++) {
    var release_url = "https://api.discogs.com/releases/" + release_id[r] + "?key=" + key + "&secret=" + secret;
    request.open("GET",release_url,false);
    request.send();
    var release = JSON.parse(request.response);
    for (i=0;i<tracklist.length;i++) {
        var feat = ""
        if (typeof tracklist[i]["extraartists"] != 'undefined') {
            for (j=0;j<tracklist[i]["extraartists"].length;j++) {
                if (tracklist[i]["extraartists"][j]["role"] == "Featuring") {
                    feat = " ft. " + tracklist[i]["extraartists"][j]["name"];
                }
            }
        }
        if (tracklist[i]["type_"] == "track") {
            console.log(release_id[r] + "," + tracklist[i]["position"] + ',"' + tracklist[i]["title"] + feat + '"')
        }
    }
};
