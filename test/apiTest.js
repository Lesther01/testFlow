'use stricts'
const chai      = require('chai');
const should    = chai.should();
const chaiHttp  = require('chai-http');
const tiempo    = require('../routes/index');
const expect    = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000';


describe('get all location: ',()=>{
	it('should location', () => {
		chai.request(url)
			.get('/location')
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(200);
			});
	});
});

describe('get all current: ',()=>{
	it('should get all current', () => {
		chai.request(url)
			.get('/current')
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(200);
			});
	});
});

describe('get all forecast: ',()=>{
	it('should get all forecast', () => {
		chai.request(url)
			.get('/forecast')
			.end( function(err,res){
				console.log(res.body)
				expect(res).to.have.status(200);
			});
	});
});
