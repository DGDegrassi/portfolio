'use strict';

const chai = require('chai')
	, chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);

const app = require('../routes/index.js') // The app

describe('index', function() {
	this.timeout(500); // How long to wait for a response (ms)

	before(function() {

	});

	after(function() {

	});

	it('should have a successful http response from index', function() {
		chai.request(app)
			.get('/')
			.then(function(res) {
				expect(res).to.have.status(200);
			});
	});

	it('should return Not Found', function() {
		chai.request(app)
			.get('/INVALID PATH')
			.then(function(res) {
				throw new Error('Path exists!');
			});
	});
});