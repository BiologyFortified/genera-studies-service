/* jshint expr:true */
/* globals -expect */

'use strict';

const expect = require('chai').expect;
const _ = require('lodash');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Study = require('./study');

describe('Study Model', function() {

  describe('required fields', function() {
    const requiredFields = [
      'generaid',
      'publicationDetails.publicationType',
      'title'
    ];

    _.forEach(requiredFields, function(field) {
      it('should be invalid without ' + field, function(done) {
        const study = new Study();
        study.validate(function(err) {
          expect(err.errors[field]).to.exist;
          done();
        });
      });
    });

    it('should valid when any other fields are missing', function(done) {
      const study = new Study();
      study.validate(function(err) {
        const allMissingRequiredFields = _.chain(err)
          .get('errors')
          .filter(function(error) {
            return error.kind === 'required';
          })
          .map('path')
          .value();
        expect(allMissingRequiredFields).to.have.members(requiredFields);
        done();
      });
    });
  });

  describe('enum fields', function() {
    const enumaratedFields = {
      'publicationDetails.publicationType': ['Journal article', 'Perspective', 'University report'],
      'publicationDetails.status': ['Retracted', 'Withdrawn', 'Special circumstances'],
      'studyAnalysis.efficacy': ['Positive effect', 'No effect', 'Mixed', 'Negative effect'],
      'studyAnalysis.equivalence': ['Positive effect', 'No effect', 'Mixed', 'Negative effect'],
      'studyAnalysis.safeconsume': ['Positive effect', 'No effect', 'Mixed', 'Negative effect'],
      'studyAnalysis.safeenviro': ['Positive effect', 'No effect', 'Mixed', 'Negative effect']
    };

    _.forEach(enumaratedFields, function(allowedValues, field) {
      describe(field, function() {
        it('should be invalid when given an arbitary value', function(done) {
          const study = new Study();
          _.set(study, field, 'random_gibberish');
          study.validate(function(err) {
            expect(err.errors[field]).to.exist;
            done();
          });
        });

        _.forEach(allowedValues, function(allowedValue) {
          it('should be valid when given "' + allowedValue + '"', function(done) {
            const study = new Study();
            _.set(study, field, allowedValue);
            study.validate(function(err) {
              expect(err.errors[field]).to.not.exist;
              done();
            });
          });
        });
      });
    });
  });

});
