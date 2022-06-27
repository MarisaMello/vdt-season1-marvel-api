describe.only('DELETE /Characters/id', function () {

    const tochaHumana = {
        name: 'Jhonny storm',
        alias: 'Tocha humana',
        team: ['Quarteto Fantástico'],
        active: true
    }

    context('Quando tenho um personagem cadastrado', function () {

        before(function () {
            cy.postCharacters(tochaHumana).then(function (response) {
                Cypress.env('characterId', response.body.character_id)

            })
        })

        it('Deve remover o personagem pelo id', function () {

            const id = Cypress.env('characterId')
             cy.deleteCharacterById(id).then(function (response) {
                expect(response.status).to.eql(204)
            })

        })
        after(function (){
          const id = Cypress.env('characterId')
            cy.getCharacterById(id).then(function (response) {
              expect(response.status).to.eql(404)

            })
        })  

    })
    it('Deve retornar 404 ao remover por id não cadastrado', function () {
        const id = '62b9f15e014c3819e30f7959'

        cy.deleteCharacterById(id).then(function (response) {
            expect(response.status).to.eql(404)

        })

    })
})  