var index = require("./assets/timeline/index.ts");

var window = floaty.window(
    <vertical padding="16">
        <text id="text" textSize="18sp" textColor="#000000" text='${str}' />
        <button id='start' text="开始" bg="#77ffffff" />
    </vertical>

);


window.exitOnClose();

window.text.click(()=>{
    window.setAdjustEnabled(!window.isAdjustEnabled());
});

// setInterval(()=>{
//     //对控件的操作需要在UI线程中执行
//     ui.run(function(){
//         window.text.setText(countdown());
//     });
// }, 1000);


var fromMin = 4;
var fromSec = 60;
var current_min = fromMin;
var current_sec = fromSec;
var str = util.format("剩余时间: %d:%d\n", current_min, current_sec);
var timerId = 0

export function dbm(){
    setInterval(()=>{
        ui.run(function(){
            function go() {
                str = util.format("剩余时间: %d:%d\n", current_min, current_sec);
                //str += index.a.skill + ": " + util.format("%d:%d\n", index.a.time.minute, index.a.time.second);
                if (current_min == 0 & current_sec == 0){
                    clearInterval(timerID);
                }
                if(current_sec > 0){
                    current_sec -= 1;
                } else{
                    current_min -= 1;
                    current_sec = current_sec + 60 - 1;
                }
            }
            go();
            window.text.setText(str)
            //window.progress_value.setText((current_sec+1).toString())
            //window.progress.setProgress(current_sec+1)
        })
    }, 1000)
    
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


// var window = floaty.window(
//     <vertical padding="16">
//         <text id="text" textSize="18sp" textColor="#000000" text='${str}' />

//         <horizontal gravity="center" marginTop="24">
//         <text id="progress_value" textColor="black" textSize="18sp" margin="8" text="0"/>
//         <progressbar  id="progress" w="*" style="@style/Base.Widget.AppCompat.ProgressBar.Horizontal"/>
//         </horizontal>

//         <text textSize="18sp" textColor="#000000" text=index.a.skill />

//     </vertical>

// );
