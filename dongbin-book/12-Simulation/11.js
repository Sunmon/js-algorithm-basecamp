/**
 * @name 뱀
 * @link 동빈북 12-5
 * @date 2021-10-22
 * @ref https://www.acmicpc.net/problem/3190
 * @author sunmon
 * @description 접근방법:
 */

const fs = require("fs");

const lineReader = (dir) => {
  const file = fs.readFileSync(dir, "utf8").split(/\r?\n/);
  let line = 0;
  return () => file[line++];
};

const solution = () => {
  const input = lineReader("./input.txt");
  const N = Number(input());
  const K = Number(input());

  const board = Array.from(Array(N + 1), () => new Array(N + 1).fill(0));
  for (let i = 0; i < K; i++) {
    const [x, y] = input().split(" ").map(Number);
    board[x][y] = 2; // 사과
  }

  const L = Number(input());
  const queue = [];
  for (let i = 0; i < L; i++) {
    const [X, C] = input().split(" ");
    queue.push([Number(X), C]);
  }
  console.log(move(board, queue, N));
};

const direction = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
]; // N E S W

const move = (board, queue, n) => {
  const snake = [[1, 1]]; // snake[-1] 이 머리
  let [x, y, dir] = [1, 1, 1]; // 뱀 머리, 방향
  let time = 0;
  board[1][1] = 1;

  while (++time) {
    const [nx, ny] = [x + direction[dir][0], y + direction[dir][1]];
    if (nx <= 0 || ny <= 0 || nx > n || ny > n) break;
    if (board[nx][ny] === 1) break;

    snake.push([nx, ny]);
    [x, y] = [nx, ny];

    if (board[nx][ny] !== 2) {
      const tail = snake.shift();
      board[tail[0]][tail[1]] = 0;
    }

    board[nx][ny] = 1;

    // 이동 및 방향전환
    if (queue[0] && queue[0][0] === time) {
      const [t, nd] = queue.shift();
      dir = nd === "D" ? (dir + 1) % 4 : (dir - 1 + 4) % 4;
    }
  }

  return time;
};

solution();
