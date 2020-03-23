const express = require('express');
const db = require('../helpers/projectModel.js');

const router = express.Router();

// GET request for all projects
router.get("/", (req, res) => {
    db.get()
        .then(proj => {
            res.status(200).json(proj);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There was an error retrieving the projects from the database." })
        })
})

// GET request for specific project
router.get("/:id", (req, res) => {
    const { id } = req.params;

    db.get(id)
        .then(proj => {
            if (proj) {
                res.status(200).json(proj)
            } else {
                res.status(404).json({ errorMessage: "The project with the specified ID does not exist in this database." })
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There was an error retrieving the specified project from the database." })
        })
})

// POST request for projects 
router.post("/", (req, res) => {
    const { name, description } = req.body;
    const project = req.body;

    if (name && description) {
        db.insert(project)
            .then(proj => {
                res.status(201).json(proj)
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "There was an error saving the project to the database." })
            })
    } else {
        res.status(400).json({ errorMessage: "Please include both a name and description for the project." })
    }
})

// PUT request for a specific project 
router.put("/:id", (req, res) => {
    const { name, description } = req.body;
    const project = req.body;
    const { id } = req.params;

    if (name && description) {
        db.update(id, project)
            .then(proj => {
                if (proj) {
                    res.status(201).json(proj)
                } else {
                    res.status(404).json({ errorMessage: "The project with the specified ID does not exist." })
                }
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "There was an error saving your updated project to the database." })
            })
    } else {
        res.status(400).json({ errorMessage: "Please provide both a name and description for the project." })
    }
})

// DELETE request for a specific project 
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    db.remove(id)
        .then(proj => {
            if (proj) {
                res.status(200).json({ success: true })
            } else {
                res.status(404).json({ errorMessage: "The project with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There was an error removing your project from the database." })
        })
})

// GET request for all actions on a specific project
router.get("/:id/actions", (req, res) => {
    const project_id = req.params.id;

    if (project_id) {
        db.getProjectActions(project_id)
            .then(actions => {
                res.status(200).json(actions)
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "There was an error retrieving the actions from the database." })
            })
    } else {
        res.status(404).json({ errorMessage: "The project with the specified ID doesn't exist." })
    }
})

module.exports = router;