# C++ COMPONENT DEFINER
## _A DX-Platform plugin to get insight of what's inside_



[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

## 1. Description
### 1.1 The purpose behind this tool 

The purpose of this tool is to group all the C++ relevant files into a components. This tool can be used either as a standalone tool or a plugin developed for the DX Platform.The programming language we used to develop this tool is javascript with the help of the yargs npm package.


## Features ✨

- For now you can group your C++ files into components. 

## Why is this useful

The standalone use can give you some ideas of how the files are grouped togheter but including the plugin into DX platform can help you visualize, in a fancy manner, how the C++ files group into well defined components.

- ⚡  Track system evolution based on how files are added in the components
- ⚡  Track  component bugs 
- ⚡  Get an overview  on how many components live in your appliocation

## Instalation

⚠️⚠️⚠️ Before Installing the tool you'll need npm and node installed on your machine, asor you can as well install only:

 -- [NODE JS](https://nodejs.org/en/) 🔎 (at least version 10)

 -- [NPM](https://www.npmjs.com/) 🔎 (get the latest version)

Or

 -- [DOCKER](https://www.docker.com/) 🔎

To run with node:
Clone this repo and after that:
```sh
cd cloned_project_folder
npm i -g
ces-cpp-component-definer --of result.json --ftg filesToGroup.txt
```

To get the docker image you can use: 
```sh
docker pull alexprapugicu/ces-cpp-component-definer
```
## 3 Usage

#### 3.1 Running from node
The standalone tool, after ```npm i -g``` should be used as it follows:
- use the command ```ces-cpp-component-definer --of jsonFile.json --ftg textfile.txt```

#### 3.2 Running from docker
 - ```docker pull alexprapugicu/ces-cpp-component-definer```

The tool will generate a list of object in json format which represent the components. They will follow the format of 
```javascript
class Component {
  constructor(fullyQualifiedName, files) {
    this.fullyQualifiedName = fullyQualifiedName;
    this.files = files;
  }
}
```
So all the read files from the text file will be mapped to the coresponding structure.

here's a snippet of what a result should look like: 
```javascript
{
    "fullyQualifiedName": "plugins",
    "files": [
      "plugins/authproxy/authproxy.cc",
      "plugins/authproxy/Makefile.inc",
      "plugins/authproxy/utils.cc",
      "plugins/authproxy/utils.h"
    ]
}
```

The filesToGroup text file should be in this format: 

```text
  include/tscpp/api/RemapPlugin.h
  include/tscpp/api/Request.h
  include/tscpp/api/Response.h
  include/tscpp/api/Stat.h
  include/tscpp/api/Transaction.h
  include/tscpp/api/TransactionPlugin.h
```


## 4 Contributing
Any contribution is welcomed , just take into account that this represents an university prject with slow development.

## 5 Authors and aknowledgment
For this project :

-- 🔔 [Alex Prapugicu](https://github.com/AlexPrapugicu)

-- 🔔 [Darius Andreascec](https://github.com/dariusandreascec)


## 6 License

#### -- [License](https://github.com/AlexPrapugicu/CES/blob/master/LICENSE)
