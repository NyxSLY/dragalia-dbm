import { dbm } from "@/utils/dbm";
//import { assets, timeline } from "@/assets/timeline/";
import { timeline_gaoshui_bbk } from "@/assets/timeline/timeline_gaoshui_bbk";
import { timeline_gaoshui_abk } from "@/assets/timeline/timeline_gaoshui_abk";


const fromMin = 4;
const fromSec = 59;
var current_min = fromMin;
var current_sec = fromSec;

export function HZhenShui() {
    var window = dbm();
    var timerId;
    window.start.on("click", () => {
        if (window.start.getText() == "开始") {
            toast("傻瓜! ");
            window.start.setText("RESET");
            current_min = fromMin;
            current_sec = fromSec;
            timerId = start(window, timeline_gaoshui_bbk, 0);
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

    window.break.on("click", () => {
        toast("BREAK!");
        clearInterval(timerId);
        const bk_time_length = 7;
        var adjust = (timeline_gaoshui_abk.a.time.minute - current_min) * 60 +
            timeline_gaoshui_abk.a.time.second - current_sec;

        adjust = adjust + bk_time_length

        console.log(adjust)
        timerId = start(window, timeline_gaoshui_abk, adjust);
    });

}


function start(window, timeline, adjust) {
    var numOfSkills = Object.keys(timeline).length;
    var refreshTime = 1000;
    var str;

    // 取出2个技能
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

        // skill part
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
        ui.run(function () {
            go();
            window.text.setText(str);
        });
    }, refreshTime);
    return timerId;
}
