# Wall Spark Engine

[![MIT License Badge](docs/img/license-badge.svg)](LICENSE)

The Wall Spark Engine is a versatile pixel rendering and game engine designed for creating stunning animations or interactive games on wall-mounted pixel displays. It integrates effortlessly with [WLED](https://kno.wled.ge/) for seamless control and vibrant visual effects.

## Roadmap

- **Milestone lab10** - Display the time & add a background image
- **Milestone BlockClock** - Add the same functionality of BlockClock code of [BlockClock Repo](https://github.com/thespielplatz/tspi-blockclock)
- **Milestone Web UI** - t.b.d.
- **Milestone Example: Tetris Game with Socket.games** - t.b.d.

Too see the full roadmap or the milestones more in detail --> [Roadmap page](https://thespielplatz.notion.site/Wall-Spark-Roadmap-11a5896652c4805589b2e5b6cde2bb28) (*Single source of truth*).

## How to run

*This section is a first draft, because "how to run" was not thought yet.*

### Setup

- Setup you display with [WLED](https://kno.wled.ge/) and connect it to the same wifi
- install node lts

```bash
git clone git@github.com:thespielplatz/WallSparkEngine.git
npm i
cp config.json.example config.json
```

### Run output on console

The default config in config.json.example is to run the output in the console. Run the basic example from example directory:

```bash
npm run example-basic
```

### Run output on WLED display

- Change the `host` in `config.json` with the ip address of your wled display.
- Change `active` to `true`

## Support

If you like this project, give it a star! If you love it, fork it and take it out for dinner. 🌟🍽️ And hey, why not [send some tip love?](https://thespielplatz.com/tip-jar)
