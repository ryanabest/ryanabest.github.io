const ghpages = require('gh-pages');

ghpages.publish('dist', {
  // Disable deployment status check to avoid stalling
  nojekyll: true,
  dotfiles: true
}, (err) => {
  if (err) {
    console.error('Deployment failed:', err);
    process.exit(1);
  } else {
    console.log('Deployment successful!');
  }
});
