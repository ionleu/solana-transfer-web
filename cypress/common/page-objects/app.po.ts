export class AppPage {
  /**
   * @name visit
   * @description
   * Visit the app successfully
   */
  visit() {
    cy.visit("/");
  }

  /**
   * @name intercept
   * @description
   * Spy and stub network requests and responses.
   *
   * @param {string} path Part of the end point you should to intercept.
   * @param {string} aliasName Assign an alias for later use.
   */
  intercept(path, aliasName) {
    cy.intercept(path).as(aliasName);
  }

  /**
   * @name childShould
   * @description
   * Get the children of each DOM element and create an assertion
   *
   * @param {string} locator Locator of needed element.
   * @param {number} child Index of needed children.
   * @param {string} chainer Any valid chainer that comes from Chai.
   * @param {string} value Value for needed element.
   */
  childShould(locator, child, chainer, value) {
    cy.get(locator).eq(child).should(chainer, value);
  }

  /**
   * @name click
   * @description
   * Click on elements
   *
   * @param {string} locator Locator of needed element.
   */
  click(locator) {
    cy.get(locator).click();
  }

  /**
   * @name type
   * @description
   * Type into a DOM element
   *
   * @param {string} locator Locator of needed element.
   * @param {string} value Value to assert against locator.
   */
  type(locator, value) {
    cy.get(locator).type(value);
  }

  /**
   * @name should
   * @description
   * Get and compare locator value
   *
   * @param {string} locator Locator of needed element.
   * @param {string} chainer Any valid chainer that comes from Chai.
   */
  should(locator, chainer, value) {
    cy.get(locator).should(chainer, value);
  }

  /**
   * @name shouldContain
   * @description
   * Get and compare locator value
   *
   * @param {string} locator Locator of needed element.
   * @param {string} contain Get the DOM element containing the text.
   */
  shouldContain(locator, contain) {
    cy.get(locator).contains(contain).click();
  }

  /**
   * @name clickAndContain
   * @description
   * Get and compare locator value
   *
   * @param {string} locator Locator of needed element.
   * @param {string} contain Get the DOM element containing the text.
   * @param {string} chainer Any valid chainer that comes from Chai.
   * @param {string} value Value for needed element.
   */
  clickAndContain(locator, contain, chainer, value) {
    cy.get(locator).contains(contain).should(chainer, value);
  }

  /**
   * @name wait
   * @description
   * Wait for a number of milliseconds or wait for an aliased resource to resolve before moving on to the next command.
   *
   * @param {any} alias The amount of time to wait or an request alias.
   */
  wait(alias) {
    return cy.wait(alias);
  }
}
