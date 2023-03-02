#!/env/bin/bash

find . -name "node_modules" -exec rm -rf '{}' +
find . -name "package-lock.json" -exec rm -rf '{}' +
find . -name "dist" -exec rm -fr '{}' +
echo "cleaned up node_modules package-locks and dist"