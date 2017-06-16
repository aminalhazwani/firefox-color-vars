# Firefox Colors

The purpose of this repository is to serve Firefox Colors in different formats based on your needs. These series of gulp tasks generate the different files starting from a `.yaml`.

## Dependencies / Installation

Install Node. If you use homebrew, do:

```bash
$ brew install node
```

Otherwise, you can download and install from [here](http://nodejs.org/download/). At the time of writing the Node version being use is 7.5.

Install Gulp globally:

```
$ npm install -g gulp
```

Clone the repository:

```
$ git clone git@github.com:FirefoxUX/firefox-color-vars.git
```

Install the dependencies:

```
$ cd firefox-color-vars
$ npm install
```

This runs through all dependencies listed in `package.json` and downloads them to a `node_modules` folder in your project directory.

## Gulp commands

Convert `.yaml` to `.json`

```
$ gulp yaml2json
```

Convert `.yaml` to `.scss`

```
$ gulp yaml2sass
```

Convert `.yaml` to `.css`

```
$ gulp yaml2css
```

All of the above combined

```
$ gulp colors
```

## To Do

- [ ] yaml2clr
- [ ] yaml2ase
- [ ] npm module