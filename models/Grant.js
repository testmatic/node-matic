const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GrantSchema = new Schema({
  OPPORTUNITY_NUMBER: {
    type: String,
    trim: true,
  },
  OPPORTUNITY_TITLE: {
    type: String,
    trim: true,
  },
  AGENCY_CODE: {
    type: String,
    trim: true,
  },
  AGENCY_NAME: {
    type: String,
    trim: true,
  },
  ESTIMATED_FUNDING: {
    type: String,
    trim: true,
  },
  EXPECTED_NUMBER_OF_AWARDS: {
    type: String,
    trim: true,
  },
  GRANTOR_CONTACT: {
    type: String,
    trim: true,
  },
  AGENCY_CONTACT_PHONE: {
    type: String,
    trim: true,
  },
  AGENCY_CONTACT_EMAIL: {
    type: String,
    trim: true,
  },
  ESTIMATED_POST_DATE: {
    type: String,
    trim: true,
  },
  ESTIMATED_APPLICATION_DUE_DATE: {
    type: String,
    trim: true,
  },
  POSTED_DATE: {
    type: String,
    trim: true,
  },
  CLOSE_DATE: {
    type: String,
    trim: true,
  },
  LAST_UPDATED_DATE_TIME: {
    type: String,
    trim: true,
  },
  VERSION: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Grant", GrantSchema, "grants");
