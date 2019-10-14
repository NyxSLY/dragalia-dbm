import { img } from '@/assets/images';
import { tryCastSupportSkill, tryTransform2dragon } from '@/utils/battle';
import { clickImage, tryClickImage, waitAndClickImage } from '@/utils/image';

export async function repeatRaid(): Promise<void> {
  tryClickImage(img.startBattleButton);
  tryClickImage(img.autoBattleSwitchOff);
  tryClickImage(img.retryButtonRed);
  tryClickImage(img.okButton);
  tryClickImage(img.closeButton);
  tryClickImage(img.cancelButton);
  tryClickImage(img.tapButton);
  tryClickImage(img.nextText);
  if (tryClickImage(img.giveUpButtonWhite)) {
    await waitAndClickImage(img.giveUpButtonBlue, { timeout: 60e3 });
    throw new Error('队伍战力不足, 无法通关');
  }
  // tslint:disable-next-line: no-floating-promises
  tryTransform2dragon();
  // tslint:disable-next-line: no-floating-promises
  tryCastSupportSkill();
  await tryRepeatWithStamina();
}

async function tryRepeatWithStamina(): Promise<void> {
  try {
    await repeatWithStamina();
  } catch {
    tryClickImage(img.continueButtonRed);
  }
}
async function repeatWithStamina(): Promise<void> {
  clickImage(img.repeatBattleButton);
  await waitAndClickImage(img.repeatWithStaminaButton, { timeout: 5e3 });
  await waitAndClickImage(img.okButton, { timeout: 5e3 });
}
