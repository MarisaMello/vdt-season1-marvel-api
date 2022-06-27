describe('Get Characters', function () {


    const characters = [

        {
            name: 'Peter Paker',
            alias: 'Homen Aranha',
            team: ['Novos Vingadores'],
            active: true
        },
        {
            name: 'Bruce Wayne',
            alias: 'Batman',
            team: ['Novos vingadores'],
            active: true
        },
        {
            name: 'Charles Xavier',
            alias: 'Professor x',
            team: ['x-men'],
            active: true
        },
        {
            name: 'Princesa Diana',
            alias: 'Mulher Maravilha',
            team: ['Novos vingadores'],
            active: true
        }
    ]

    before(function () {
        cy.populateCharacters(characters)
    })

    it('Deve retornar uma lista de personagem', function () {
        cy.getCharacters().then(function (response) {
            expect(response.status).to.eql(200)
            expect(response.body).to.be.a('array') // retorna a quantidade de array
            expect(response.body.length).greaterThan(0) // length retorna quantidade//greaterThan acima de o
        })
    })

    it('Deve poder buscar personagem por nome', function () {
        cy.searchCharacters('Princesa Diana').then(function (response) {
            expect(response.status).to.eql(200)
            expect(response.body.length).to.eql(1)
            expect(response.body[0].alias).to.eql('Mulher Maravilha')
            expect(response.body[0].team).to.eql(['Novos vingadores'])
            expect(response.body[0].active).to.eql(true)

        })
    })
    it('Deve poder buscar  o id do personagem ', function () {
        cy.searchCharacters('Princesa Diana').then(function (response) {
            expect(response.status).to.eql(200)
            expect(response._id)
            expect(response.body.length).to.eql(1)
            expect(response.body[0].alias).to.eql('Mulher Maravilha')
            expect(response.body[0].team).to.eql(['Novos vingadores'])
            expect(response.body[0].active).to.eql(true)

        })
    })
})
describe('GET /Characters/id', function () {

    const tonyStark = {
        name: 'Tony Stark',
        alias: 'Homem de Ferro',
        team: ['vingadores'],
        active: true
    }

    context('Quando tenho um personagem cadastrado', function() {

        before(function() {
            // todo
            cy.postCharacters(tonyStark).then(function (response) {
                Cypress.env('characterId', response.body.character_id)

            })
        })
        it('Deve buscar o personagem pelo id', function () {

            const id = Cypress.env('characterId')
            cy.getCharacterById(id).then(function (response){
                expect(response.status).to.eql(200)
                expect(response.body.alias).to.eql('Homem de Ferro')
                expect(response.body.team).to.eql(['vingadores'])
                expect(response.body.active).to.eql(true)
            })

        })

    })
    it('Deve retornar 404 ao buscar por id não cadastrado', function(){
        const id = '62b9f15e014c3819e30f7959'
    
        cy.getCharacterById(id).then(function (response){
            expect(response.status).to.eql(404)
            
        })

    })
})        