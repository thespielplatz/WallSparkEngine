/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
declare module 'jetty' {

  class Jetty {
    constructor(output: NodeJS.WriteStream);

    reset(): this;
    clear(): this;
    moveTo(coords: [number, number]): this;
    rgb(color: [number, number, number]): this;
    text(message: string): this;
  }

  export = Jetty;
}
