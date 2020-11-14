#### Webpack stats obfuscate

###### ZERO DEPENDENCIES LIBRARY

- Gather stats of your build by webpack:
```
webpack --profile --json > stats.json
```

- Generate random string with length 16

- Run script like this
```
KEY=$string32 node ./src/index.js $pathToStats obfuscateStats
```
```
KEY=$string32 node ./src/index.js $pathToEncryptedStats decryptStats
```

How it was:
![](images/before.jpg?raw=true "Base stats")

And the result:
![](images/after.jpg?raw=true "Encrypted stats")
