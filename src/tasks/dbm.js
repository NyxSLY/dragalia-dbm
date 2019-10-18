import { timeline } from "@/assets/timeline/";
import layout from "@/tasks/layout.xml";

export function dbm() {
  const fromMin = 4;
  const fromSec = 59;
  let current_min = fromMin;
  let current_sec = fromSec;
  let str = util.format("剩余时间: %d:%d\n", 5, "00");
  var timerId;
  var window = floaty.window(layout);
  // position and size
  window.setSize(550, -2);
  window.setPosition(device.width - 450, device.height * 0.3);
  var numOfSkills = Object.keys(timeline).length;
  var bossBusy = false;
  var refreshTime = 500;
  ui.run(function() {
    window.text.setText(str);
  });
  window.exitOnClose();

  window.start.on("click", () => {
    toast("傻瓜! ");
    console.log();
    if (window.start.getText() == "开始") {
      window.start.setText("RESET");
      timerId = start();
      // toastLog(timeline[Object.keys(timeline)[0]].name);
    } else {
      // RESET all parameters
      clearInterval(timerId);
      str = util.format("剩余时间: %d:%d\n", 5, "00");
      current_min = fromMin;
      current_sec = fromSec;
      bossBusy = false;
      ui.run(function() {
        window.text.setText(str);
      });
      str +=
        timeline.a.name +
        ": " +
        util.format("%d:%d\n", timeline.a.time.minute, timeline.a.time.second);
      window.start.setText("开始");
    }
    window.disableFocus();
  });

  window.start.on("long_click", () => {
    window.setAdjustEnabled(!window.isAdjustEnabled());
  });

  window.break.on("click", () => {
    toast("BREAK!");
    bossBusy = true;
  });

  function start() {
    // 取出2个技能
    let i = 0;
    let skill1 = timeline[Object.keys(timeline)[i]];
    let skill2 = timeline[Object.keys(timeline)[i + 1]];
    let break_left = timeline.break.castTime;
    let delayCauseByBreak = 0;
    let time_left =
      current_sec -
      skill1.time.second +
      60 * (current_min - skill1.time.minute);
    let time_left2 =
      current_sec -
      skill2.time.second +
      60 * (current_min - skill2.time.minute);

    timerId = setInterval(() => {
      ui.run(function() {
        function go() {
          // 查看是否break
          if (bossBusy) {
            skill2 = timeline[Object.keys(timeline)[i]];
            skill1 = timeline.break;

            str = util.format(
              "剩余时间: %d:%d\n\n",
              Math.ceil(current_min),
              Math.ceil(current_sec)
            );
            str +=
              "-- " +
              skill1.name +
              util.format(": %d 秒\n", Math.ceil(break_left));
            str +=
              "-- " +
              skill2.name +
              util.format(": %d 秒\n", Math.ceil(time_left));
            if ((current_min == 0) & (current_sec == 0)) {
              clearInterval(timerID);
            }
          } else {
            str = util.format(
              "剩余时间: %d:%d\n\n",
              Math.ceil(current_min),
              Math.ceil(current_sec)
            );
            str +=
              "-- " +
              skill1.name +
              util.format(": %d 秒\n", Math.ceil(time_left));
            str +=
              "-- " +
              skill2.name +
              util.format(": %d 秒\n", Math.ceil(time_left2));
            if ((current_min == 0) & (current_sec == 0)) {
              clearInterval(timerID);
            }
          }

          // skill part
          if (!bossBusy) {
            if (
              (time_left <= 3) &
              (time_left > 0) &
              Number.isInteger(time_left)
            ) {
              toast(
                util.format("%d", time_left) + "秒后释放技能: " + skill1.name
              );
            } else if (time_left <= 0) {
              toast(skill1.name);
              if (i < numOfSkills) {
                i += 1;
                skill1 = timeline[Object.keys(timeline)[i]];
                skill2 = timeline[Object.keys(timeline)[i + 1]];
              } else {
                skill1 = skill2;
                skill2 = "";
              }
            }
          } else {
            if ((break_left > 0) & Number.isInteger(break_left)) {
              toast(util.format("BREAK 剩余%d秒", break_left));
            } else if (break_left == 0) {
              // break reset, prepare for next break
              bossBusy = false;
              break_left = timeline.break.castTime;
              toast(util.format("BREAK 剩余%d秒", break_left));
              skill1 = timeline[Object.keys(timeline)[i]];
              skill2 = timeline[Object.keys(timeline)[i + 1]];
            }
          }

          // 走时间
          if (current_sec > 0) {
            current_sec -= refreshTime / 1000;
          } else {
            current_min -= 1;
            current_sec = current_sec + 60 - refreshTime / 1000;
          }
          // 更新技能剩余时间
          if (!bossBusy) {
            time_left =
              current_sec -
              skill1.time.second +
              60 * (current_min - skill1.time.minute) +
              delayCauseByBreak;
            time_left2 =
              current_sec -
              skill2.time.second +
              60 * (current_min - skill2.time.minute) +
              delayCauseByBreak;
          } else {
            break_left -= refreshTime / 1000;
            delayCauseByBreak += refreshTime / 1000;
          }
        }
        go();
        window.text.setText(str);
        //console.log(window.getX(), window.getY());
        //console.log(window.getWidth(), window.getHeight());
        //window.progress_value.setText((current_sec+1).toString())
        //window.progress.setProgress(current_sec+1)
      });
    }, refreshTime);
    return timerId;
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
