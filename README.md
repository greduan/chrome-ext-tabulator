# <img src="images/icon48.png" alt="Tabulator icon"> Tabulator

**Tabulator is a free open-source light-weight alternative to OneTab.**

Tabulator is a free Google Chrome extension that helps reduce tab clutter and
memory usage by saving all your open tabs into lists which can be restored at
another time.

![Screenshot of the button, Dashboard and Options pages](/images/screenshot.png)

## Features

- Light and fast, small footprint and low CPU usage.
- Very easy to use.

## Development

First you must build the JS files:

```sh
nvm i   # will use .nvmrc version
nvm use # will use .nvmrc version
yarn
npx webpack
```

Then you can load it as an unbundled extension in Chromium.

## Credits

- [Eduardo Lavaque][el] (@greduan): Original code and ongoing support
- [Xavi Esteve][xe] (@luckyshot): New features, improvements, bug fixes
- [Jared Forsyth][jf] (@jaredly): New features, improvements, bug fixes

## License

This project is licensed under the [permissive][per] [ISC license][lic]. You
can find the license information in this project in the `LICENSE` file.

[xe]: https://xaviesteve.com
[el]: https://greduan.com
[jf]: http://jaredforsyth.com
[per]: https://en.wikipedia.org/wiki/Permissive_free_software_licence
[lic]: https://en.wikipedia.org/wiki/ISC_license
