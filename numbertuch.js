"use strict";

{
  class Panel {
    constructor(game) {
      this.game = game;
      this.li = document.createElement("li");
      this.li.classList.add("pressed");
      this.li.addEventListener("click", () => {
        this.check();
      });
    }

    getLi() {
      return this.li;
    }

    activate(num) {
      this.li.classList.remove("pressed");
      this.li.textContent = num;
    }

    check() {
      if (this.game.getCurrentNum() === parseInt(this.li.textContent, 10)) {
        this.li.classList.add("pressed");
        this.game.addCurrentNum();

        if (this.game.getCurrentNum() === this.game.getLevel() ** 2 +1) {
          clearTimeout(this.game.getTimeoutId());
        }
      }
    }
  }

  class Board {
    constructor(game) {
      this.game = game;
      this.panels = [];
      for (let i = 1; i < this.game.getLevel() ** 2 +1; i++) {
        this.panels.push(new Panel(this.game));
      }
      this.setup();
    }

    setup() {
      const board = document.getElementById("board");
      this.panels.forEach(panel => {
        board.appendChild(panel.getLi());
      });
    }

    activate() {
      const nums = [];
      for (let i = 1; i < this.game.getLevel() ** 2 +1; i++) {
        nums.push(i);
      }
      this.panels.forEach(panel => {
        const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0];
        panel.activate(num);
      });
    }
  }

  class Game {
    constructor(level) {
      this.level = level;
      this.board = new Board(this);

      this.currentNum = undefined;
      this.startTime = undefined;
      this.timeoutId = undefined;

      const btn = document.getElementById("btn");
      btn.addEventListener("click", () => {
        this.start();
      });
      this.setup();
    }

    setup() {
      const container = document.getElementById("container");
      const PANEL_WIDTH = 65;
      const BOARD_PADDING = 10;
      container.style.width = PANEL_WIDTH * this.level + BOARD_PADDING * 2 + "px";
    }

    start() {
      if (typeof this.timeoutId !== "undefined") {
        clearTimeout(this.timeoutId);
      }

      this.currentNum = 1;
      this.board.activate();
      this.startTime = Date.now();
      this.runTimer();
    }

    runTimer() {
      const timer = document.getElementById("timer");
      timer.textContent = ((Date.now() - this.startTime) / 1000).toFixed(2);

      this.timeoutId = setTimeout(() => {
        this.runTimer();
      }, 10);
    }

    addCurrentNum() {
      this.currentNum++;
    }

    getCurrentNum() {
      return this.currentNum;
    }

    getTimeoutId() {
      return this.timeoutId;
    }

    getLevel() {
      return this.level;
    }
  }

  new Game(5);
}
