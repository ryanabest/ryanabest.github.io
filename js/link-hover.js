let twitter  = document.getElementById("twitter-thumb")
let linkedIn = document.getElementById("linkedin-thumb")
let tableau  = document.getElementById("tableau-thumb")
let gitHub   = document.getElementById("github-thumb")

twitter.addEventListener("mouseover",function(event) {
  twitter.src = "../../assets/social-icons/twitter-red.png"
})

twitter.addEventListener("mouseout",function(event) {
  twitter.src = "../../assets/social-icons/twitter.png"
})

linkedIn.addEventListener("mouseover",function(event) {
  linkedIn.src = "../../assets/social-icons/linkedin-red.png"
})

linkedIn.addEventListener("mouseout",function(event) {
  linkedIn.src = "../../assets/social-icons/linkedin.png"
})

tableau.addEventListener("mouseover",function(event) {
  tableau.src = "../../assets/social-icons/tableau-red.png"
})

tableau.addEventListener("mouseout",function(event) {
  tableau.src = "../../assets/social-icons/tableau.png"
})

gitHub.addEventListener("mouseover",function(event) {
  gitHub.src = "../../assets/social-icons/github-red.png"
})

gitHub.addEventListener("mouseout",function(event) {
  gitHub.src = "../../assets/social-icons/github.png"
})
