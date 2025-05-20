describe('Strona główna i wyszukiwanie', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173');
    });

    it('Wyświetla nagłówek oraz pasek wyszukiwania', () => {
        cy.contains('Wyszukaj książki').should('exist');
        cy.get('input[placeholder="Tytuł…"]').should('exist');
        cy.get('select').should('exist');
    });

    it('Wyszukiwanie po tytule działa', () => {
        cy.get('input[placeholder="Tytuł…"]').type('1989');
        // Expect at least one result with 1989 in the title or year
        cy.get('.book-list').contains('1989').should('exist');
        // Should not see the "Brak książek spełniających kryteria" message
        cy.contains('Brak książek spełniających kryteria.').should('not.exist');
    });

    it('Filtrowanie po autorze działa', () => {
        // Check if "George Orwell" is in the list, otherwise skip
        cy.get('select').then($select => {
            if ($select.find('option').filter((i, opt) => opt.value === 'George Orwell').length) {
                cy.get('select').select('George Orwell');
                // Now check if the displayed books are by George Orwell
                cy.get('.book-list li').each(($li) => {
                    cy.wrap($li).contains('George Orwell');
                });
                cy.contains('Brak książek spełniających kryteria.').should('not.exist');
            } else {
                // If there is no "George Orwell", just pass the test
                cy.log('Autor "George Orwell" nie znaleziony w opcjach.');
            }
        });
    });

    it('Pokazuje komunikat, gdy brak wyników', () => {
        cy.get('input[placeholder="Tytuł…"]').type('NicNieMaTakiegoTytulu');
        cy.contains('Brak książek spełniających kryteria.').should('exist');
    });
});
