import { runTaskForever } from '@/runTaskForever';
import { setupUI } from '@/setupUI';
import { setupTaskRegistry } from '@/tasks';
import { getAssetByResolution, loadAssets } from '@/utils/image';
import { name, version } from 'package.json';

// tslint:disable-next-line: no-floating-promises
(async (): Promise<void> => {
  console.log(`${name}: ${version}`);

  try {
    launch('com.nintendo.zaga');
    device.keepScreenDim(99999);

    setupTaskRegistry();
    setupUI();
    loadAssets(getAssetByResolution());
    await runTaskForever();
  } catch (err) {
    console.error(JSON.stringify(err));
  }
})();
