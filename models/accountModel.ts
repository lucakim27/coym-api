import { pool } from '../configs/db'

const addAccount = (username: any, password: any) => {

    const insertAccountsQuery = `INSERT INTO
        accounts (
            username, 
            password,
            createdAt
        ) VALUES (
            ?, 
            ?,
            ?
        )
    `
    
    const paramsForInsertAccountsQuery = [username, password, new Date().toISOString().slice(0, 19).replace('T', ' ')]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(insertAccountsQuery, paramsForInsertAccountsQuery, function (err: any) {
            if (err) {
                connection.release()
                throw err
            }
        })
        connection.release()
    })

}

const validateSignUp = function (username: any, password: any, passwordConfirm: any) {
    if (username.length < 6 || password.length < 6 || password !== passwordConfirm || username.includes(" ") || password.includes(" ")) {
        return 1
    } else {
        return 0
    }
}

export const authSignUp = (res: any, req: any) => {

    const selectAccountsQuery = "SELECT username, password FROM accounts"

    if (validateSignUp(req.body.username, req.body.password, req.body.passwordConfirm)) {
        res.send({
            status: false,
            message: 'Follow the conditions for the username and password above please.'
        })
    } else {
        pool.getConnection(function (err: any, connection: any) {
            if (err) {
                connection.release()
                throw err
            }
            connection.query(selectAccountsQuery, function (err: any, result: any, fields: any) {
                if (err) {
                    connection.release()
                    throw err
                }
                if (result.length !== 0) {
                    var existing = false
                    for (var i = 0; i < result.length; i++) {
                        if (req.body.username === result[i].username || req.body.password === result[i].password) {
                            res.send({
                                status: false,
                                message: 'It already exists.'
                            })
                            existing = true
                        }
                    }
                    if (!existing) {
                        addAccount(req.body.username, req.body.password)
                        res.send({
                            status: true,
                            message: 'Successfully signed up.'
                        })
                    }
                } else {
                    addAccount(req.body.username, req.body.password)
                    res.send({
                        status: true,
                        message: 'Successfully signed up.'
                    })
                }
            })
            connection.release()
        })

    }
}

export const authSignIn = (res: any, req: any) => {

    const selectAccountsQuery = "SELECT username, password FROM accounts"

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectAccountsQuery, function (err: any, result: any, fields: any) {
            if (err) {
                connection.release()
                throw err
            }
            var existing = false
            for (var i = 0; i < result.length; i++) {
                if (req.query.username === result[i].username && req.query.password === result[i].password) {
                    res.send({
                        status: true,
                        message: 'Successfully signed in.'
                    })
                    existing = true
                }
            }
            if (!existing) {
                res.send({
                    status: false,
                    message: 'You failed to sign in.'
                })
            }
        })
        connection.release()
    })

}

export const cookieValidation = (res: any, req: any) => {

    console.log(req.params)
    console.log(req.query)

    const selectAccountsQuery = "SELECT username, password FROM accounts"

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectAccountsQuery, function (err: any, result: any, fields: any) {
            if (err) {
                connection.release()
                throw err
            }
            var existing = false
            for (var i = 0; i < result.length; i++) {
                if (req.query.username === result[i].username && req.query.password === result[i].password) {
                    res.send({
                        status: true,
                        username: req.query.username
                    })
                    existing = true
                }
            }
            if (!existing) {
                res.send({
                    status: false
                })
            }
        })
        connection.release()
    })

}

export const getUserDetailsByID = (res: any, req: any) => {

    const selectAccountsQuery = `SELECT * FROM accounts WHERE id = ?`

    const paramsForSelectAccountsQuery = [req.params.id]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectAccountsQuery, paramsForSelectAccountsQuery, function (err: any, result: any, fields: any) {
            if (err) {
                connection.release()
                throw err
            }
            res.send({
                status: true,
                data: { username: result[0] }
            })
        })
        connection.release()
    })

}

export const getUserID = (res: any, req: any) => {

    const selectAccountsQuery = `SELECT id FROM accounts WHERE username = ?`

    const paramsForSelectAccountsQuery = [req.query.username]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectAccountsQuery, paramsForSelectAccountsQuery, function (err: any, result: any, fields: any) {
            if (err) {
                connection.release()
                throw err
            }
            res.send({
                status: true,
                data: { id: result[0] }
            })
        })
        connection.release()
    })

}

export const getUserDetails = (res: any, req: any) => {

    const selectAccountsQuery = `SELECT * FROM accounts 
        WHERE username = ?
    `

    const paramsForSelectAccountsQuery = [req.query.username]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectAccountsQuery, paramsForSelectAccountsQuery, function (err: any, result: any, fields: any) {
            if (err) {
                connection.release()
                throw err
            }
            res.send({
                status: true,
                userDetails: {
                    username: result[0].username,
                    gender: result[0].gender,
                    country: result[0].country,
                    major: result[0].major,
                    school: result[0].school
                }
            })
        })
        connection.release()
    })

}

export const updateUserDetails = (res: any, req: any) => {

    const updateAllDetailsQuery = `UPDATE accounts
        SET username = ?,
            gender = ?,
            school = ?,
            country = ?,
            major = ?,
            updatedAt = ?
        WHERE username = ? AND password = ?
    `

    const paramsForUpdateAllDetailsQuery = [req.body.username, req.body.gender, req.body.school, req.body.country, req.body.major, new Date().toISOString().slice(0, 19).replace('T', ' '), req.body.username, req.body.password]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(updateAllDetailsQuery, paramsForUpdateAllDetailsQuery, function (err: any, result: any, fields: any) {
            if (err) {
                connection.release()
                throw err
            }
            if (result.changedRows === 0) {
                res.send({
                    status: false,
                    message: "Either username or password is not matching."
                })
            } else {
                res.send({
                    status: true,
                    message: "You have successfully updated the details."
                })
            }
        })
        connection.release()
    })

}

export const getAllUsers = (res: any, req: any) => {

    const getAllUsers = `SELECT id, username, gender, country, major, school, createdAt FROM accounts`

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(getAllUsers, function (err: any, result: any, fields: any) {
            if (err) {
                connection.release()
                throw err
            }
            res.send({
                status: true,
                data: result
            })
        })
        connection.release()
    })

}

export const getUserCommentDetails = (res: any, req: any) => {

    const getUserCommentDetails = `SELECT m.id, m.name, COUNT(a.username) AS count FROM comments c
        INNER JOIN majors m on m.id = c.majorID
        INNER JOIN accounts a on a.id = c.userID
        WHERE c.userID = ?
        GROUP BY m.id
    `

    const paramForGetUserCommentDetails = [req.params.id]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(getUserCommentDetails, paramForGetUserCommentDetails, function (err: any, result: any, fields: any) {
            if (err) {
                connection.release()
                throw err
            }
            res.send({
                status: true,
                data: result
            })
        })
        connection.release()
    })

}

export const getUserReplyDetails = (res: any, req: any) => {

    const getUserReplyDetails = `SELECT m.id, m.name, COUNT(a.username) AS count FROM reply r
        INNER JOIN majors m on m.id = r.majorID
        INNER JOIN accounts a on a.id = r.userID
        WHERE r.userID = ?
        GROUP BY m.id
    `

    const paramForGetUserReplyDetails = [req.params.id]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(getUserReplyDetails, paramForGetUserReplyDetails, function (err: any, result: any, fields: any) {
            if (err) {
                connection.release()
                throw err
            }
            res.send({
                status: true,
                data: result
            })
        })
        connection.release()
    })

}

export const getUserLikeDetails = (res: any, req: any) => {

    const getUserLikeDetails = `SELECT m.id, m.name, COUNT(a.username) AS count FROM likes l
        INNER JOIN majors m on m.id = l.majorID
        INNER JOIN accounts a on a.id = l.userID
        WHERE l.userID = ?
        GROUP BY m.id
    `

    const paramForGetUserLikeDetails = [req.params.id]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(getUserLikeDetails, paramForGetUserLikeDetails, function (err: any, result: any, fields: any) {
            if (err) {
                connection.release()
                throw err
            }
            res.send({
                status: true,
                data: result
            })
        })
        connection.release()
    })

}

export const getTotalAccountCount = (res: any, req: any) => {

    const selectCommentsTableQuery = `SELECT COUNT(*) FROM accounts`

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectCommentsTableQuery, function (err: any, result: any, fields: any) {
            if (err) {
                connection.release()
                throw err
            }
            res.send({
                status: true,
                message: result
            })
        })
        connection.release()
    })

}

