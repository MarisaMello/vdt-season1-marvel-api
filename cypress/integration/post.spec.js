describe('POST /characters', function () {


    it('deve ser cadastrar um personagem', function () {

        const characters = {
            name: 'Peter Paker',
            alias: 'Homen Aranha',
            team: ['x-men', 'illuminatis'],
            active: true
        }

        cy.postCharacters(characters)
            .then(function (response) {
                expect(response.status).to.eql(201)
                cy.log(response.body.character_id)
                expect(response.body.character_id.length).to.eql(24)
            })
    })

    context('quando o personagem já existe', function () {

        const characters = {
            name: 'Bruce Wayne',
            alias: 'Batman',
            team: ["x-men", "illuminatis"],
            active: true
        }

        before(function () {
            cy.postCharacters(characters).then(function (response) {
                expect(response.status).to.eql(201)
            })
        })

        it('não deve cadastrar duplicado', function () {
            cy.postCharacters(characters).then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.error).to.eql('Duplicate character')
            })
        })
    })
})

