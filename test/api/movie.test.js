const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../../app');

chai.use(chaiHttp);

let token;
let movie_id;

describe('/api/movies tests', () => {
    
    /* Test öncesi gerekririkler icin. ex: Token */
    before((done) => {
        chai.request(server)
        .post('/authenticate')
        .send({username: 'bmnurullah', password: '123456'})        
        .end((err, res) => {
            token = res.body.token;
            console.log("Token : " + token)
            done();
        });
    });

    /* All Movies */
    describe('/GET movies', () => {
        it('it should get all the movies', (done) => {
            chai.request(server)
            .get('/api/movies')
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
 
        })
    });

    /* Save Movies */
    describe('/POST Create Movie', () => {
        it('it should post a movie', (done) => {
            chai.request(server)
            .post('/api/movies')
            .set('x-access-token', token)
            .send(
                { 
                    title: 'Test Movie', 
                    imdb_score: 8, 
                    category: 'Suç', 
                    country: 'Turkey', 
                    year: 2010, 
                    director_id: '5ec17f61de594322a58f7bc8'
                }
            )
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                res.body.status.should.equal(true)
                res.body.data.should.have.property('_id');
                res.body.data.should.have.property('title');

                movie_id = res.body.data._id;
                done();
            })
        })
    });

    /*  Get a Movie */
    describe('/GET a Movie', () => {
        it('it should get a movie by the given id', (done) => {
            chai.request(server)
            .get('/api/movies/' + movie_id)
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('title');
                res.body.should.have.property('_id').equal(movie_id);
                done();
            })
        });
    });

    /* Update Movie */
    describe('/PUT a movie', () => {
        it('it should put a movie by the given id', (done) => {
            let movie = {
                title: 'Udemy test'
            };

            chai.request(server)
            .put('/api/movies/' + movie_id)
            .send(movie)
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('title');
                res.body.should.have.property('_id').equal(movie_id);

                // old and new value equal control
                res.body.should.have.property('title').equal(movie.title);

                done();
            })
        });
    });

    /* Delete movie */
    describe('/DELETE a movie', () => {
        it('it should delete a movie by the given id', (done) => {
            chai.request(server)
            .delete('/api/movies/' + movie_id)
            .set('x-access-token', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.property('status');
                res.body.should.property('status').equal(true);
               
                done();
            })
        });
    });
    


}); 
