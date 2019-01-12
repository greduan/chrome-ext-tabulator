mkdir -pv dist/{chrome,firefox}

npx webpack

ln -sv ../dist/webpack dist/chrome/dist
ln -sv ../dist/webpack dist/firefox/dist
ln -sv ../../src dist/chrome/src
ln -sv ../../src dist/firefox/src
ln -sv ../../images dist/chrome/images
ln -sv ../../images dist/firefox/images
ln -sv ../../chrome-manifest.json dist/chrome/manifest.json
ln -sv ../../firefox-manifest.json dist/firefox/manifest.json
