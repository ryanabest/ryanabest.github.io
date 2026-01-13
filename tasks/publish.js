const ghpages = require('gh-pages');

ghpages.publish('dist', {
  nojekyll: true,
  dotfiles: true,
  // Skip deployment status checks to prevent hanging
  silent: false,
  remove: '.',
  history: false
}, (err) => {
  if (err) {
    console.error('Deployment failed:', err);
    process.exit(1);
  } else {
    console.log('Files pushed to gh-pages branch successfully!');
    console.log('GitHub Pages will deploy shortly.');
  }
});
