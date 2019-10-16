import { index } from "@/assets/timeline";

export function test(): void {
  setTimeout(() => toastLog, index.claw.time, index.claw.name);
  setTimeout(() => toastLog, index.fart.time, index.fart.name);
  toastLog(index.claw.name);
  toastLog(index.whirl.name);
}

// export function test(): void {
//   const fro: number = 1;
//   const to: number = 10;
//   let current: number = fro;
//   let timerId: number;

//   function go(): void {
//     console.log(current.toString());
//     if (current === to) {
//       clearInterval(timerId);
//     }
//     current += 1;
//   }

//   go();
//   timerId = setInterval(go, 1000);
// }
