import { test, expect } from '../../src/fixtures/returns-fixtures';

test.describe('Returns application smoke coverage', () => {
  test('@smoke @country opens localized Returns entry point', async ({ returnsHomePage }) => {
    await returnsHomePage.goto();
    await expect.soft(returnsHomePage.startReturnLink.or(returnsHomePage.associateQueueLink).first()).toBeVisible();
  });

  test('@smoke @external external users can reach return creation', async ({ returnsWorkflow, personaProfile }) => {
    test.skip(personaProfile.channel !== 'external', 'External journey applies to reseller and customer personas only.');

    await returnsWorkflow.createReturnForOrder(process.env.RETURNS_ORDER_NUMBER ?? 'ORDER-PLACEHOLDER');
  });

  test('@smoke @internal associates can reach the returns queue', async ({ returnsWorkflow, personaProfile }) => {
    test.skip(personaProfile.channel !== 'internal', 'Internal journey applies to associate personas only.');

    await returnsWorkflow.openPersonaLandingPage();
  });
});
