const SoftUniFy = require('./app');
const assert = require('chai').assert;

describe('Sfotunify', function () {
    let softunify;

    beforeEach(() => {
        softunify = new SoftUniFy();
    });

    it('should initialize allSongs object', function () {
        let expected = {};
        assert.deepEqual(softunify.allSongs, expected);
    });

    it('should return message if no songs', function () {
        assert.equal(softunify.songsList, `Your song list is empty`)
    });

    describe('downloadSong(artist, song, lyrics)', function () {
        it('should add song to allSongs', function () {
            softunify.downloadSong('Disturbed', 'Stronger on your own', '(...)');
            let expected = {
                Disturbed:
                    {rate: 0, votes: 0, songs: ['Stronger on your own - (...)']}
            };
            assert.deepEqual(softunify.allSongs, expected);
        });

        it('should add new song to existing artist', function () {
            softunify.downloadSong('Disturbed', 'Stronger on your own', '(...)');
            softunify.downloadSong('Disturbed', 'Down with the sickness', '(...)');
            let expected = {
                    Disturbed:
                        {
                            rate: 0,
                            votes: 0,
                            songs:
                                ['Stronger on your own - (...)',
                                    'Down with the sickness - (...)']
                        }
                }
            ;
            assert.deepEqual(softunify.allSongs, expected);
        });

        it('should add songs from multiple artists', function () {
            softunify.downloadSong('Disturbed', 'Stronger on your own', '(...)');
            softunify.downloadSong('Shinedown', 'Call me', '(...)');
            let expected = {
                    Disturbed:
                        {rate: 0, votes: 0, songs: ['Stronger on your own - (...)']},
                    Shinedown: {rate: 0, votes: 0, songs: ['Call me - (...)']}
                }
            ;
            assert.deepEqual(softunify.allSongs, expected);
        });
    });

    describe('rateArtist()', function () {
        it('should return message if artist does not exist', function () {
            assert.equal(softunify.rateArtist('ArtistName'), 'The ArtistName is not on your artist list.');
        });

        it('should add rate to artist', function () {
            softunify.downloadSong('Disturbed', 'Stronger on your own', '(...)');
            assert.equal(softunify.rateArtist('Disturbed', 2), 2);
        });

        it('should calculate avg rate for artist', function () {
            softunify.downloadSong('Disturbed', 'Stronger on your own', '(...)');
            softunify.rateArtist('Disturbed', 2);
            assert.equal(softunify.rateArtist('Disturbed', 1), 1.50);
        });
    });

    describe('playSong(song)', function () {
        it('should ', function () {
            assert.equal(softunify.playSong('SONG'),'You have not downloaded a SONG song yet. Use SoftUniFy\'s function downloadSong() to change that!');
        });

        it('should play song', function () {
            softunify.downloadSong('Disturbed', 'Stronger on your own', '(...)');
            assert.equal(softunify.playSong('Stronger on your own'), 'Disturbed:\n' +
                'Stronger on your own - (...)\n')
        });
    });
});