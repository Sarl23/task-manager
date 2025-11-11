describe("Task Manager - Pruebas E2E", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("Task Manager", { timeout: 8000 }).should("be.visible");
  });

  it("Should create a new task correctly", () => {
    cy.get('input[placeholder="Ingrese el titulo de la tarea"]', {
      timeout: 8000,
    }).should("be.visible");
    cy.get('input[placeholder="Ingrese el titulo de la tarea"]').type(
      "Tarea de prueba Cypress"
    );
    cy.get('textarea[placeholder="(opcional)"]').type(
      "Esta es una descripción de prueba"
    );
    cy.contains("button", "Agregar Tarea").click();

    cy.contains("Tarea de prueba Cypress").should("be.visible");
    cy.contains("Esta es una descripción de prueba").should("be.visible");
    cy.contains("Pendiente").should("be.visible");

    cy.get('input[placeholder="Ingrese el titulo de la tarea"]').should(
      "have.value",
      ""
    );
    cy.get('textarea[placeholder="(opcional)"]').should("have.value", "");
  });
});
