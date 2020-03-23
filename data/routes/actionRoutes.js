const express = require('express');
const db = require('../helpers/actionModel.js');
const projdb = require('../helpers/projectModel.js');

const router = express.Router();

// GET request for all actions on a specific project
router.get("/", (req, res) => {
    db.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There was an error retrieving the actions from the database." });
        });
});

// GET request for specific action
router.get("/:id", (req, res) => {
    const { id } = req.params;

    db.get(id)
        .then(action => {
            if (id) {
                res.status(200).json(action)
            } else {
                res.status(404).json({ errorMessage: "No such action exists!" })
            }
        })
        .catch((err) => {
            res.status(500).json({ errorMessage: "There was an error retrieving the specific action from the database." });
        });
});

// POST request for actions
router.post("/", (req, res) => {
    const { project_id, description, notes } = req.body;
    const action = req.body;

    if (notes && description && project_id) {
        db.insert(action)
            .then(action => {
                res.status(201).json(action)
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "There was an error saving your action to the database." })
            })
    } else {
        res.status(400).json({ errorMessage: "Please fill out all fields." })
    }
})

// PUT request for specific action 
router.put("/:id", (req, res) => {
    const { project_id, description, notes } = req.body;
    const project = req.body;
    const { id } = req.params;

    if (notes && description && project_id) {
        db.update(id, project)
            .then(action => {
                if (action) {
                    res.status(201).json(action)
                } else {
                    res.status(404).json({ errorMessage: "The action with the specified ID does not exist." })
                }
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "There was an error saving your updated action to the database." })
            })
    } else {
        res.status(400).json({ errorMessage: "Please fill out all fields." })
    }
})

// DELETE request for specific action
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    db.remove(id)
        .then(action => {
            if (action) {
                res.status(200).json({ success: true })
            } else {
                res.status(404).json({ errorMessage: "The specified action does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "There was an error removing your action from the database." })
        })
})

module.exports = router;