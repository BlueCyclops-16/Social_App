const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator')

const User = require('../../models/User');  // Requiring the schemas from models folder



// @route    POST api/users
// @desc     Register User
// @access   Public
router.post('/',
    // Data Validation
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Email should be valid').isEmail(),
    body('password', 'Password should be of minimum length 5.').isLength({ min: 5 }),

    // Response sending

    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, email, password } = req.body;


        try {
            // Check if user exists
            let user = await User.findOne({ email: email });
            if (user) {
                res.status(400).json({ errors: [{ msg: "User already exist" }] })
            }

            // Get users gravatar 
            const avatar = gravatar.url(email, {
                s: '200',   // Size
                r: 'pg',    // Rating (adult or not)
                d: 'mm'     // Default
            });

            user = new User({
                name,
                email,
                avatar,
                password
            });


            // Encrypt password using bcrypt
            const salt = await bcryptjs.genSalt(12);           // To create a hashing

            user.password = await bcryptjs.hash(password, salt);

            await user.save();  // To save the instance that we have created into the database.
            // Also here user.save() also returns a promise that we have to resolve using then() but since we are using async, we can just use await


            // Return jsonwebtoken :- This is required because we want our user to be directly logged in when registered.
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload,
                config.get('jwtSecret'),
                { expiresIn: 36000000 },
                (err, token) => {
                    if (err) throw err;

                    res.json({ token })
                });

        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    })

module.exports = router;