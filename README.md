
# NEUMORPH Player

`NEUMORPH Player` is a simple player library for react SPA using [Howler.js](https://howlerjs.com) library for audio functionality

## Installation
Several options to get up and running:

* Clone the repo: git clone https://github.com/KBTheDeveloper/neumorph-player.js.git
* Install with npm: npm install neumorph-player
* Install with Yarn: yarn add neumorph-player

## Usage 
Using as React component
```javascript
    import Player from "neumorph-player";

    <Player theme="dark" tracks={tracksArr} />
```
## Props

### Tracks `Array<Track>` `[]` *`required`*
List of tracks to in a Track format

### Position `String` `"fixed"`
Player position

### Theme `String` `"dark"`
There are 3 themes out of the box: dark, light, and blue




