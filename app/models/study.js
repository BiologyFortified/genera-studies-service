'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studySchema = new Schema({
  generaid: { type: 'String', required: true },
  title: { type: 'String', required: true },
  abstract: { type: 'String' },
  keywords: { type: [String] },

  locators: {
    studyUrl: { type: 'String'},
    doi: { type: 'String'},
    pmid: { type: 'String'},
    contact: { type: 'String'}
  },

  publicationDetails: {
    journal: { type: 'String'},
    issns: { type: [String]},
    volume: { type: Number},
    number: { type: Number},
    pages: { type: 'String'},
    publicationDate: {
      month: { type: 'String'},
      year: { type: Number},
    },
    history: { type: 'String' },
    status: {
      type: 'String',
      enum: [
        'Retracted',
        'Withdrawn',
        'Special circumstances'
      ]
    },
    publicationType: {
      type: 'String',
      required: true,
      enum: [
        'Journal article',
        'Perspective',
        'University report'
      ]
    },
    openaccess: { type: Boolean }
  },

  studyDetails: {
    organism: { type: [String]},
    commonname: { type: [String]},
    event: { type: [String]},
    trait: { type: [String]},
    testorganism: { type: [String]},
    review: { type: Boolean},
    studytype: { type: [String]},
  },

  fundingDetails: {
    fundcountry: { type: [String]},
    fundsource: { type: [String]},
    fundtype: { type: [String]},
  },

  studyAnalysis: {
    efficacy: {
      type: 'String',
      enum: [
        'Positive effect',
        'No effect',
        'Mixed',
        'Negative effect'
      ]
    },
    equivalence: {
      type: 'String',
      enum: [
        'Positive effect',
        'No effect',
        'Mixed',
        'Negative effect'
      ]
    },
    safeconsume: {
      type: 'String',
      enum: [
        'Positive effect',
        'No effect',
        'Mixed',
        'Negative effect'
      ]
    },
    safeenviro: {
      type: 'String',
      enum: [
        'Positive effect',
        'No effect',
        'Mixed',
        'Negative effect'
      ]
    },
    analysislink: { type: 'String'},
  }
});

module.exports = mongoose.model('Study', studySchema);
