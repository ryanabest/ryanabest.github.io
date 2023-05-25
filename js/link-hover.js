const twitter = document.getElementById('twitter-thumb');
const linkedIn = document.getElementById('linkedin-thumb');
const gitHub = document.getElementById('github-thumb');
const fte = document.getElementById('fte-thumb');

twitter.addEventListener('mouseover', function (event) {
  twitter.src = '/assets/social-icons/twitter-highlight.png';
});

twitter.addEventListener('mouseout', function (event) {
  twitter.src = '/assets/social-icons/twitter.png';
});

linkedIn.addEventListener('mouseover', function (event) {
  linkedIn.src = '/assets/social-icons/linkedin-highlight.png';
});

linkedIn.addEventListener('mouseout', function (event) {
  linkedIn.src = '/assets/social-icons/linkedin.png';
});

gitHub.addEventListener('mouseover', function (event) {
  gitHub.src = '/assets/social-icons/github-highlight.png';
});

gitHub.addEventListener('mouseout', function (event) {
  gitHub.src = '/assets/social-icons/github.png';
});

fte.addEventListener('mouseover', function (event) {
  fte.src = '/assets/social-icons/fivethirtyeight-highlight.png';
});

fte.addEventListener('mouseout', function (event) {
  fte.src = '/assets/social-icons/fivethirtyeight.png';
});
