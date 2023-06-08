describe("landing flow", () => {
  it("should load", () => {
    cy.visit("http://127.0.0.1:4173");
    cy.get("[data-testid='LandingHeader']").should("be.visible");
  });
});
