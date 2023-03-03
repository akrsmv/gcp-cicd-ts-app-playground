#!/env/bin/bash

find . -name "node_modules" -exec rm -rf '{}' +
find . -name "dist" -exec rm -fr '{}' +
find . -name "build" -exec rm -fr '{}' +
find . -name "*.tsbuildinfo" -exec rm -fr '{}' +
echo "cleaned up node_modules, build, dist"