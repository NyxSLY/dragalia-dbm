import { dbm } from "@/utils/dbmAuto";
//import { assets, timeline } from "@/assets/timeline/";
import { timeline_gaoshui_bbk } from "@/assets/timeline/timeline_gaoshui_bbk";
import { timeline_gaoshui_abk } from "@/assets/timeline/timeline_gaoshui_abk";
import { autoStart } from "@/utils/autoStart"


const fromMin = 0;
const fromSec = 59;
var current_min = fromMin;
var current_sec = fromSec;
var start_timer = false;
var timerId;
var adjust = 0;
var ifbk = false;
var newWindow;

export function HZhenShuiAuto() {
    newWindow = dbm();
    buttons(newWindow);
    timerId = start(timeline_gaoshui_bbk, timeline_gaoshui_abk);
    // start_timer = autoStart();
    console.log('I am here');
}


function buttons(window) {
    window.break.on("click", () => {
        if (window.break.getText() == "BREAK") {
            if (start_timer) {
                const bk_time_length = 7;
                adjust = (timeline_gaoshui_abk.a.time.minute - current_min) * 60 +
                    timeline_gaoshui_abk.a.time.second - current_sec + bk_time_length;
                ifbk = true;
                window.break.setText("RESET");
            } else {
                toastLog('战斗还没开始呢')
            }
        } else {
            // it's RESET
            start_timer = false;
            adjust = 0;
            window.break.setText("BREAK");
        }
        window.disableFocus();
    });
}


function start(timeline1, timeline2) {
    var refreshTime = 1000;
    var str;
    var timeline = timeline1

    // 初始化
    var numOfSkills = Object.keys(timeline).length;
    let i = 0;
    let skill1 = timeline[Object.keys(timeline)[i]];
    let skill2 = timeline[Object.keys(timeline)[i + 1]];
    let time_left =
        current_sec -
        skill1.time.second +
        60 * (current_min - skill1.time.minute) + adjust;
    let time_left2 =
        current_sec -
        skill2.time.second +
        60 * (current_min - skill2.time.minute) + adjust;

    function go() {
        if (ifbk) {
            timeline = timeline2
            // 初始化
            numOfSkills = Object.keys(timeline).length;
            i = 0;
            skill1 = timeline[Object.keys(timeline)[i]];
            skill2 = timeline[Object.keys(timeline)[i + 1]];
            time_left =
                current_sec -
                skill1.time.second +
                60 * (current_min - skill1.time.minute) + adjust;
            time_left2 =
                current_sec -
                skill2.time.second +
                60 * (current_min - skill2.time.minute) + adjust;
            ifbk = false;
        }

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
        if ((current_min <= 0) & (current_sec <= 0)) {
            clearInterval(timerId);
        }

        // skill part
        if (time_left <= 0) {
            // toast(skill1.name);
            if (i < (numOfSkills - 2)) {
                i += 1;
                console.log(i)
                skill1 = timeline[Object.keys(timeline)[i]];
                skill2 = timeline[Object.keys(timeline)[i + 1]];
            } else {
                skill1 = skill2;
                skill2 = timeline.break;
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
        time_left =
            current_sec -
            skill1.time.second +
            60 * (current_min - skill1.time.minute) + adjust
        time_left2 =
            current_sec -
            skill2.time.second +
            60 * (current_min - skill2.time.minute) + adjust
    }

    var timerId = setInterval(() => {
        if (start_timer) {
            go();
            ui.run(function () {
                newWindow.text.setText(str);
            });
        } else {
            timeline = timeline1;
            i = 0;
            current_min = fromMin;
            current_sec = fromSec;
            skill1 = timeline[Object.keys(timeline)[i]];
            skill2 = timeline[Object.keys(timeline)[i + 1]];
            time_left =
                current_sec -
                skill1.time.second +
                60 * (current_min - skill1.time.minute) + adjust;
            time_left2 =
                current_sec -
                skill2.time.second +
                60 * (current_min - skill2.time.minute) + adjust;
            str = util.format("剩余时间: %d:%d\n", 5, "00");
            ui.run(function () {
                newWindow.text.setText(str);
            });
            start_timer = autoStart(); // should stuck here
        }

    }, refreshTime);

    return timerId;
}
