export function autoStart() {
    toastLog("自动开始模式");
    images.requestScreenCapture(false);
    while (true) {
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
            sleep(3500);
            return true;
        }
    }
}
