const callForPaperModel = require("../models/callForPaper.model");
const steerCommMemModel = require("../models/steercommsmem.model");

module.exports = {
    getHome: (req, res, next) => {
        const attemptedRequest = req.query.attemptedRequest || null
        res.render('index', { attemptedRequest: attemptedRequest })
    },

    getAbout: (req, res, next) => {
        res.render("about");
    },

    getPapers: async (req, res, next) => {
        const cfp_list = await callForPaperModel
        .find({})
        res.render("papers",{cfpList: cfp_list});
    },

    getSessions: (req, res, next) => {
        res.render("spl_session");
    },

    getRegistration: (req, res, next) => {
        res.render("registration");
    },

    getSponsorship: (req, res, next) => {
        res.render("sponsorship");
    },

    getPublication: (req, res, next) => {
        res.render("publication")
    },

    getCommitte: async (req, res, next) => {
        const sMemList = await steerCommMemModel
        .find({})
        res.render("committe",{steerMemList: sMemList});
    },

    getVenue: (req, res, next) => {
        res.render("venue")
    },

    getDownloads: (req, res, next) => {
        res.render("downloads")
    },

    getPreviousConference: (req, res, next) => {
        res.render("prev_conf")
    },

    // Post Routes

    postPapersCallForPapers: (req, res, next) => {
        const paperSubHeading = req.body
        callForPaperModel.create( paperSubHeading, (err, data) => {
            if(err){
                res.status(500).send(err)
            } else {
                res.status(201).send(data)
            }
        })
    },

    postSteeringCommitteeMembers: (req, res, next) => {
        const SterrMember = req.body
        steerCommMemModel.create( SterrMember, (err, data) => {
            if(err){
                res.status(500).send(err)
            } else {
                res.status(201).send(data)
            }
        })
    }
}