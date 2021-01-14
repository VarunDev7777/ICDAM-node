const express = require('express');
const Router = express.Router();

const HomeControl = require('../controllers/Home.controller');

Router.get('/', HomeControl.getHome);
Router.get('/about', HomeControl.getAbout);
Router.get('/papers', HomeControl.getPapers);
Router.get('/special-sessions', HomeControl.getSessions);
Router.get('/registrations', HomeControl.getRegistration);
Router.get('/sponsorship', HomeControl.getSponsorship);
Router.get('/publication', HomeControl.getPublication);
Router.get('/committe', HomeControl.getCommitte);
Router.get('/conference-venue', HomeControl.getVenue);
Router.get('/downloads', HomeControl.getDownloads);
Router.get('/previous-conference', HomeControl.getPreviousConference);

// Post Routes
Router.post('/papers/call-for-paper', HomeControl.postPapersCallForPapers);
Router.post('/committe', HomeControl.postSteeringCommitteeMembers);
  

module.exports = Router;