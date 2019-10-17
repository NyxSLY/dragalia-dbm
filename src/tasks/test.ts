import { index } from "@/assets/timeline";
import { wait } from "@/utils/wait";


export function test(): void{
  main()
}

export function main(): void {

  setTimeout(function(){toastLog(index.claw.name)}, index.claw.time*1000)
  setTimeout(function(){toastLog(index.fart.name)}, index.fart.time*1000)
  console.log('111')
  //await wait(999e3)
  //toastLog(index.claw.name);
  //toastLog(index.whirl.name);
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
