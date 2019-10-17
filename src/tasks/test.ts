import { index } from "@/assets/timeline";
import { ITimeline } from "@/assets/timeline/type";

// export function test(): void {
//   setTimeout(() => {
//     toastLog(timeline.a.name);
//   }, timeline.a.time * 1000);
//   setTimeout(() => {
//     toastLog(`skill: ${timeline.b.name}`);
//   }, timeline.b.time * 1000);
//   console.log(`---start---`);
// }

const adjust_time = 3000

export function test(): void {
  for (const noUse of Object.keys(index)) {
    const skill: ITimeline = index[noUse];
    setTimeout(() => {
      toastLog(`skill: ${skill.name}`);
    }, skill.time * 1000 - adjust_time);
  }
  toastLog(`---start---`);
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
