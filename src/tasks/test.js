import { timeline } from "@/assets/timeline/";
import layout from "@/tasks/layout.xml";


export function dbm(){
    const fromMin = 4;
    const fromSec = 59;
    let current_min = fromMin;
    let current_sec = fromSec;
    let str = util.format("剩余时间: %d:%d\n", 5, '00');
    var timerId;
    var window = floaty.window(layout);
    var numOfSkills = Object.keys(timeline).length;
    ui.run(function(){window.text.setText(str)})
    window.exitOnClose();

    window.start.on("click", ()=>{
        toast("傻瓜! ");
        if(window.start.getText() == '开始'){
            window.start.setText('RESET');
            timerId = start();
            // toastLog(timeline[Object.keys(timeline)[0]].name);
        } else {
            clearInterval(timerId) // like pause
            let str = util.format("剩余时间: %d:%d\n", 5, '00');
            current_min = fromMin;
            current_sec = fromSec;
            ui.run(function(){window.text.setText(str)})
            str += timeline.a.name + ": " + util.format("%d:%d\n", timeline.a.time.minute, timeline.a.time.second);
            window.start.setText('开始')
        }
        window.disableFocus();
    });
    
    window.start.on("long_click", ()=>{
        window.setAdjustEnabled(!window.isAdjustEnabled());
    });

    function start(){
        // 取出2个技能
        let i = 0;
        let skill1 = timeline[Object.keys(timeline)[i]];
        let skill2 = timeline[Object.keys(timeline)[i+1]];
        let time_left = current_sec - skill1.time.second + 60*(current_min - skill1.time.minute);
        let time_left2 = current_sec - skill2.time.second + 60*(current_min - skill2.time.minute);

        timerId = setInterval(()=>{
            ui.run(function(){
                function go() {
                    str = util.format("剩余时间: %d:%d\n\n", current_min, current_sec);
                    str += "-- " + skill1.name + ": " + util.format("%d 秒\n", time_left);
                    str += "-- " + skill2.name + ": " + util.format("%d 秒\n", time_left2);
                    if (current_min == 0 & current_sec == 0){
                        clearInterval(timerID);
                    }

                    // skill part
                    if(skill1.time.minute == current_min & time_left <=3 & time_left>0){
                        toast(util.format("%d", time_left) + "秒后释放技能: " + skill1.name);
                    }
                    if(skill1.time.minute == current_min & time_left == 0){
                        toast(skill1.name);
                        if(i < numOfSkills){
                            i += 1
                            skill1 = timeline[Object.keys(timeline)[i]];
                            skill2 = timeline[Object.keys(timeline)[i+1]];
                        } else{
                            skill1 = skill2;
                            skill2 = ''
                        }
                    }

                    if(current_sec > 0){
                        current_sec -= 1;
                    } else{
                        current_min -= 1;
                        current_sec = current_sec + 60 - 1;
                    }
                    time_left = current_sec - skill1.time.second + 60*(current_min - skill1.time.minute);
                    time_left2 = current_sec - skill2.time.second + 60*(current_min - skill2.time.minute);
                }
                go();
                window.text.setText(str)
                //window.progress_value.setText((current_sec+1).toString())
                //window.progress.setProgress(current_sec+1)
            })
        }, 1000)
    return timerId
    }
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
