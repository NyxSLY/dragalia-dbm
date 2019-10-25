import { dbm } from "@/utils/dbm";
//import { assets, timeline } from "@/assets/timeline/";
import { timeline_gaofeng } from "@/assets/timeline/timeline_gaofeng";

var bossBusy = false;

export function HZhenFeng() {
  var window = dbm();
  var timerId;
  window.start.on("click", () => {
    if (window.start.getText() == "开始") {
      toast("傻瓜! ");
      window.start.setText("RESET");
      timerId = start(window, timeline_gaofeng);
    } else {
      // RESET all parameters
      clearInterval(timerId);
      var str = util.format("剩余时间: %d:%d\n", 5, "00");
      ui.run(function () {
        window.text.setText(str);
      });
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

}


function start(window, timeline) {
  const fromMin = 4;
  const fromSec = 59;
  let current_min = fromMin;
  let current_sec = fromSec;
  var numOfSkills = Object.keys(timeline).length;
  var refreshTime = 1000;
  var str;


  // 取出2个技能
  let i = 0;
  let skill1 = timeline[Object.keys(timeline)[i]];
  let skill2 = timeline[Object.keys(timeline)[i + 1]];
  let break_left = timeline.break.castTime - 1;
  let delayCauseByBreak = 0;
  let time_left =
    current_sec -
    skill1.time.second +
    60 * (current_min - skill1.time.minute);
  let time_left2 =
    current_sec -
    skill2.time.second +
    60 * (current_min - skill2.time.minute);

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
      if (time_left <= 0) {
        // toast(skill1.name);
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
        toast(util.format("BREAK 剩余%d秒 - ", break_left));
        break_left = timeline.break.castTime;
        skill1 = timeline[Object.keys(timeline)[i]];
        skill2 = timeline[Object.keys(timeline)[i + 1]];
      }
    }

    // 走时间
    if (current_sec > 0) {
      current_sec -= refreshTime / 1000;
    } else {
      current_min -= 1;
      current_sec = 60 - (refreshTime / 1000) * 2;
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

  var timerId = setInterval(() => {
    ui.run(function () {
      go();
      window.text.setText(str);
    });
  }, refreshTime);
  return timerId;
}
