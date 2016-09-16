var expect = require('chai').expect;

var Sequelize = require('sequelize');

var db = require('../../../server/db');

var Address = db.model('address');

describe('address model', function() {

            beforeEach('Sync DB', function() {
                return db.sync({ force: true });
            });

            var addressFactory = function(addressParams) {
                addressParams = addressParams || {};
                var defaults = {
                    address_line_one: '911 Pumpkin Lane',
                    address_line_two: 'apartment D13',
                    city: 'New York City',
                    state: 'NY',
                    zip: 12345
                };
                return Address.build(Object.assign(defaults, addressParams));
            };

            describe('validations', function() {
                it('throws error if no address_line_one', function() {
                    return addressFactory({
                    	address_line_one: null,
                    })
                        .validate()
                        .then(function(err) {
                            expect(err).not.to.be.null;
                            expect(err.errors.length).to.equal(1);
                        })
                });
                it('throws error if no city', function() {
                    return addressFactory({
                    	city: null,
                    })
                        .validate()
                        .then(function(err) {
                            expect(err).not.to.be.null;
                            expect(err.errors.length).to.equal(1);
                        })
                });
                it('throws error if no state', function() {
                    return addressFactory({
                    	state: null,
                    })
                        .validate()
                        .then(function(err) {
                            expect(err).not.to.be.null;
                            expect(err.errors.length).to.equal(1);
                        })
                });
                it('throws error if zip is null', function() {
                    return addressFactory({
                    	zip: null,
                    })
                        .validate()
                        .then(function(err) {
                            expect(err).not.to.be.null;
                            expect(err.errors.length).to.equal(1);
                        })
                });


            });
});

