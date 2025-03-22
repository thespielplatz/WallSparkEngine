# Wall Spark Engine

[![MIT License Badge](docs/img/license-badge.svg)](LICENSE)

<img src="docs/img/logo.png" align="left" width="75px" style="margin-right:16px;"/>
The Wall Spark Engine is a versatile pixel rendering and game engine designed for creating stunning animations or interactive games on wall-mounted pixel displays. It integrates effortlessly with [WLED](https://kno.wled.ge/) for seamless control and vibrant visual effects.
<br clear="left"/>

## Features

- Rendering on Console & WLED display (via UDP)
- Rendering/GameEngine with basics
- Config via config.json
- Example: Simple Clock & armv6 (Raspberry PI Zero I)

## Roadmap

- **Milestone BlockClock** - Add the same functionality of BlockClock code of [BlockClock Repo](https://github.com/thespielplatz/tspi-blockclock)
- **Milestone Web UI** - t.b.d.
- **Milestone Example: Tetris Game with Socket.games** - t.b.d.

Too see the full roadmap or the milestones more in detail --> [Roadmap page](https://thespielplatz.notion.site/Wall-Spark-Roadmap-11a5896652c4805589b2e5b6cde2bb28) (*Single source of truth*).

## How to run an example

### Setup Repo & WSE

- install node lts

```bash
git clone git@github.com:thespielplatz/WallSparkEngine.git
npm i
```

### Setup example

To run an example e.g. `basic-clock`

```bash
# Start in project root
npm i
# If you have a armv6 architecture use
npm i --ignore-scripts

# Copy a config file into the example directory
cp config.json.example example/basic-clock/config.json

cd example/basic-clock/
npm i
```

### Setup armv6 example

```bash
# Start in project root
npm i --ignore-scripts

# Copy a config file into the example directory
cp config.json.example example/basic-clock-armv6/config.json

cd example/basic-clock-armv6/
npm i

### Run output on console

The default config in config.json.example is to run the output in the console. Run the basic example from example directory:

```bash
npm run main
```

### Run output on WLED display

- Setup you display with [WLED](https://kno.wled.ge/) and connect it to the same wifi
- Change the `host` in `config.json` with the ip address of your wled display.
- Change `active` to `true`

## How to run your own example

Just copy the most basic project e.g.

```bash
cp examples/basic-clock examples/mything
cd examples/mything
npm i
```

Start changing things.

## Project Notes

- Examples: ts-node was used instead of tsc/tsx, because the target device was an Raspberry PI Zero with armv6 architecture.

## Dev Notes

Typescript guide: <https://www.totaltypescript.com/how-to-create-an-npm-package>

## Support

If you like this project, give it a star! If you love it, fork it and take it out for dinner. 🌟🍽️ And hey, why not [send some tip love?](https://thespielplatz.com/tip-jar)
