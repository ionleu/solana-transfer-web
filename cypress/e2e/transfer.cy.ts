import { AppData } from "../common/data";
import { AppLocators } from "../common/locators";
import { AppPage } from "../common/page-objects";

describe("E2E: Transfer", () => {
  const appPO: AppPage = new AppPage();

  beforeEach(() => {
    appPO.visit();
  });

  it("Transfer: transfer SOL amount to another wallet", () => {
    appPO.type(AppLocators.amountInput, AppData.transfer.amount);
    appPO.type(AppLocators.destinationInput, AppData.transfer.destination);
    appPO.click(AppLocators.transferBtn);
    appPO.shouldContain(AppLocators.toast, AppData.transfer.successMessage);
    appPO.shouldContain(AppLocators.notification, AppData.transfer);
  });
});
