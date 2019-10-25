//import { assets, timeline } from "@/assets/timeline/";
import layout from "@/tasks/layout.xml";

// Object.assign(timeline), assets[];
export function dbm() {

  let str = util.format("剩余时间: %d:%d\n", 5, "00");
  var window = floaty.window(layout);
  // position and size
  window.setSize(450, -2);
  window.setPosition(device.width - 450, device.height * 0.3);

  var timerId;
  ui.run(function () {
    window.text.setText(str);
  });
  window.exitOnClose();
  // auto start mode
  // if (autoStart()) {
  //   toastLog("自动自动自动");
  //   sleep(3500);
  //   window.start.click();
  //   ui.run(function () {
  //     window.start.click();
  //   })
  // }
  window.setAdjustEnabled(true);
  setInterval(() => { }, 1e3);
  return window;
}


function autoStart() {
  toastLog("自动开始模式");
  let start = false;
  images.requestScreenCapture(false);
  while (!start) {
    let img = images.captureScreen();
    // sleep(100);
    if (
      images.detectsColor(
        img,
        "#000000",
        device.width / 5,
        device.height / 5,
        5,
        "equal"
      ) &&
      images.detectsColor(
        img,
        "#000000",
        (device.width / 5) * 2,
        (device.height / 5) * 2,
        5,
        "equal"
      ) &&
      images.detectsColor(
        img,
        "#000000",
        (device.width / 5) * 3,
        (device.height / 5) * 3,
        5,
        "equal"
      ) &&
      images.detectsColor(
        img,
        "#000000",
        (device.width / 5) * 4,
        (device.height / 5) * 4,
        5,
        "equal"
      ) &&
      images.detectsColor(
        img,
        "#000000",
        (device.width / 5) * 4.5,
        (device.height / 5) * 4.5,
        5,
        "equal"
      )
    ) {
      toastLog("Going to start in 5s");
      start = true;
      return start;
    }
  }
}
