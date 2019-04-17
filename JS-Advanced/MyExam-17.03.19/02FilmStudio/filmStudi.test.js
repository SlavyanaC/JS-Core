let FilmStudio = require('./filmStudio');
let assert = require('chai').assert;

describe('FilmStudio', function () {
    let filmStudio;
    beforeEach(() => {
        filmStudio = new FilmStudio('Studio');
    });

    it('ctor should work correctly', function () {
        assert.deepEqual(filmStudio.films, []);
        assert.equal(filmStudio.name, 'Studio')
    });

    describe('makeMovie(filmName, roles)', function () {
        it('should throw error with invalid args', function () {
            assert.throws(() => filmStudio.makeMovie('Film'), 'Invalid arguments count')
        });

        it('should throw error with invalitd type of args', function () {
            assert.throws(() => filmStudio.makeMovie('Film', -2), 'Invalid arguments')
        });

        it(' should create movie', function () {
            let expected = {
                filmName: 'The Avengers',
                filmRoles:
                    [{role: 'Iron-Man', actor: false},
                        {role: 'Thor', actor: false},
                        {role: 'Hulk', actor: false},
                        {role: 'Arrow guy', actor: false}]
            };
            assert.deepEqual(filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']), expected);
        });

        it('should add second movie in sequence', function () {
            filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
            let expected = {
                filmName: 'The Avengers 2',
                filmRoles:
                    [{role: 'Iron-Man', actor: false},
                        {role: 'Hulk', actor: false},
                        {role: 'Arrow guy', actor: false},
                        {role: 'Ant-man', actor: false}]
            };
            assert.deepEqual(filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Hulk', 'Arrow guy', 'Ant-man']), expected);
        });

        it('should add film', function () {
            filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
            assert.equal(filmStudio.films.length, 1);
        });
    });

    describe('casting(actor, role)', function () {
        it('should assign role to actor', function () {
            filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
            let expected = 'You got the job! Mr. Slavi you are next Hulk in the The Avengers. Congratz!';
            assert.equal(filmStudio.casting('Slavi', 'Hulk'), expected);
        });

        it('should return message if no movies', function () {
            let expected = 'There are no films yet in Studio.';
            assert.equal(filmStudio.casting('Slavi', 'Hulk'), expected);
        });

        it('should return message if no such role', function () {
            filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy']);
            let expected = 'Slavi, we cannot find a Princess role...';
            assert.equal(filmStudio.casting('Slavi', 'Princess'), expected);
        });
    });

    describe('lookForProducer(film)', function () {
        it('should throw error if movie not found', function () {
            assert.throws(() => filmStudio.lookForProducer('Frozen'), 'Frozen do not exist yet, but we need the money...')
        });

        it('should return msg', function () {
            let expected = 'Film name: The Avengers\n' +
                'Cast:\n' +
                'false as Iron-Man\n' +
                'false as Thor\n' +
                'Slavi as Hulk\n' +
                'false as Arrow guy\n';

            filmStudio.makeMovie('The Avengers', ['Iron-Man', 'Thor', 'Hulk', 'Arrow guy'])
            filmStudio.casting('Slavi', 'Hulk');

            assert.equal(filmStudio.lookForProducer('The Avengers'), expected);
        });
    });
});