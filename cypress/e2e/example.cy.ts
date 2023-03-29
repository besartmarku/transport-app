describe("Example Test", () => {
  it("visits the app root url", () => {
    cy.visit("/");
    cy.get("[data-testid='add-destination']").should(
      "contain.text",
      "Add destination"
    );
  });
});

export {};