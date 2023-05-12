// Express
var express = require('express');
var router = express.Router();

// GET /grades
router.get('/', (req, res, next) => {
    const sql = 'SELECT * FROM grades'

    req.db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        res.status(200).json(rows);
    });
});

// GET/grades/:id
router.get('/:id', (req, res, next) => {
    const sql = 'SELECT * FROM grades WHERE id = ?'

    req.db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            return res.status(400).json({error: err.message});
        }

        if (row === undefined) return res.sendStatus(404);

        res.status(200).json(row);
    });
});

// POST /grades
router.post('/', (req, res, next) => {
    const {question_id, student_id, grade_percent} = req.body;
    const sql = 'INSERT INTO grades(question_id, student_id, grade_percent) VALUES (?, ?, ?)'

    req.db.run(sql, [question_id, student_id, grade_percent], function (err) {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        res.status(201).json({id: this.lastID});
    });
});

// PUT /grades/:id
router.put('/:id', (req, res, next) => {
    const {question_id, student_id, grade_percent} = req.body;
    const sql = "UPDATE grades SET question_id = ?, student_id = ?, grade_percent = ? WHERE id = ?";

    req.db.run(sql, [question_id, student_id, grade_percent, req.params.id], function (err) {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        res.status(200).json({changes: this.changes});
    });
});

// DELETE /grades/:id
router.delete('/:id', (req, res, next) => {
    const sql = 'DELETE FROM grades WHERE id = ?'

    req.db.run(sql, req.params.id, function (err) {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        res.status(200).json({deleted: this.changes});
    });
});

module.exports = router;