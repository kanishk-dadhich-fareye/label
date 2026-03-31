###########################################################################Code deploy
Label Generation FRONEND REACTJS

Release process (NPM PUBLISH STEPS):

Step 1: This is one time setup only
export NPM_TOKEN={NPM Token Value}
npm config set '//registry.npmjs.org/:_authToken'="${NPM_TOKEN}"

Step 2: checkout to main branch and pull latest code

Step 3: change the version in package.json if it's already published in npm

Step 4: "npm run publish:npm" -- it will delete the existing build folder then create the new build, parse and copies all the files to build folder

Step 5: "cd dist/"

Step 6: "npm publish" -- this will publish the package in @fareye npm repo

Link: https://www.npmjs.com/package/@fareye/label-generation-frontend
