var request = new XMLHttpRequest();
var username = "ryan.a.best";
var key = "QCZeqOIewtlwmxUdKgxc"
var secret = "fAwVNoAFCOTZIlgANbVtmMVTXpQrzzKn"
var token = "fDZcwmTQFeXTxWzGgDTIapLGZwbaYEueynnmtXFn"
var per_page = 25;
var requesturl = "https://api.discogs.com/users/" + username + "/collection/folders/0/releases?per_page=" + per_page + "&key=" + key + "&secret=" + secret + "&token=" + token
request.open("GET",requesturl,false);
request.send();
var jsondata = JSON.parse(request.response);
var items = jsondata["pagination"]["items"];
var loopsneeded = jsondata["pagination"]["pages"];
var loopsneeded = 1;

var collection = [];

for (i=loopsneeded;i<loopsneeded+1;i++) {
  var requesturl = "https://api.discogs.com/users/" + username + "/collection/folders/0/releases?page=" + (i+1) + '&per_page=' + per_page; + "&key=" + key + "&secret=" + secret + "&token=" + token
  request.open("GET",requesturl,false);
  request.send();
  var jsondata = JSON.parse(request.response);
  var releases = jsondata["releases"];
  for (j=0;j<releases.length;j++) {
    collection.push(releases[j]);
  };
};

var collection_cleaned = [];
var genres_and_styles = [];
var tracklists = [];
var release_id;

/*
for (i=0;i<collection.length;i++) {
  console.log(collection[i]["id"]);
  //console.log((i+1) + ". ");
};
*/

function colldata() {
  for (i=0;i<collection.length;i++) {
        var release_id = collection[i]["id"];
    var release_url = "https://api.discogs.com/releases/" + release_id + "?key=" + key + "&secret=" + secret + "&token=" + token;
    request.open("GET",release_url,false);
    request.send();
    var release = JSON.parse(request.response);
    for (i=0;i<release["genres"].length;i++) {
      genres_and_styles.push({id: release["id"], gos: release["genres"][i]})
    };
    for (i=0;i<release["styles"].length;i++) {
      genres_and_styles.push({id: release["id"], gos: release["styles"][i]})
    };
    /*
    collection_cleaned.push(
      {id: collection[i]["id"], artist: collection[i]["basic_information"]["artists"][0]["name"], album: collection[i]["basic_information"]["title"], cover: collection[i]["basic_information"]["cover_image"], video: release["videos"][0]["uri"]}
    )*/
  }
}

colldata();

for (i=0;i<genres_and_styles.length;i++) {
  console.log(genres_and_styles[i]["id"] + ", " + genres_and_styles[i]["gos"])
};

//document.getElementbyId('test').innerHTML = collection_cleaned.toString();
//console.log(collection.length);
//console.log(collection);
