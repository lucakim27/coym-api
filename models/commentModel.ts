import { pool } from '../configs/db'

export const getComment = function (res: any, req: any) {

    const query = `SELECT a.id, a.username, c.comment, c.createdAt, c.id AS commentID, m.name FROM comments c
        inner join accounts a on a.id = c.userID
        inner join majors m on m.id = c.majorID
        WHERE m.id = ?
    `

    const param = [req.params.id]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(query, param, function (err: any, result: any, fields: any) {
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

export const getCommentCount = function (res: any, req: any) {

    const query = `SELECT m.name, COUNT(m.name) AS count FROM comments c
        inner join majors m on m.id = c.majorID
        GROUP BY m.name;
    `

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(query, function (err: any, result: any, fields: any) {
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

export const getTotalCommentCount = function (res: any, req: any) {

    const query = `SELECT COUNT(*) FROM comments`

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(query, function (err: any, result: any, fields: any) {
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

export const getPopularMajors = function (res: any, req: any) {

    // const query = `SELECT m.id, m.name, COUNT(m.name) AS count FROM comments c
    //     inner join majors m on m.id = c.majorID
    //     GROUP BY m.name
    //     ORDER BY count DESC
    //     LIMIT 3;
    // `

    const query = `
        SELECT m.id, m.name, COUNT(*) AS count
        FROM comments c
        INNER JOIN majors m ON m.id = c.majorID
        GROUP BY m.id, m.name
        ORDER BY count DESC
        LIMIT 3;
    `;

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(query, function (err: any, result: any, fields: any) {
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

export const getRecentComments = function (res: any, req: any) {

    const query =  `SELECT a.id, a.username, c.comment, c.createdAt, c.id AS commentID, m.name, m.id AS majorID FROM comments c
        inner join accounts a on a.id = c.userID
        inner join majors m on m.id = c.majorID
        ORDER BY c.createdAt DESC LIMIT 3;
    `

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(query, function (err: any, result: any, fields: any) {
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

export const postComment = function (res: any, req: any) {

    const query = `INSERT INTO 
        comments (
            comment, 
            majorID, 
            userID, 
            createdAt
        ) VALUES (
            ?, 
            ?, 
            (SELECT id FROM accounts WHERE username = ?), 
            ?
        )
    `

    const params = [req.body.comment, req.params.id, req.body.username, new Date().toISOString().slice(0, 19).replace('T', ' ')]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(query, params, function (err: any, result: any) {
            if (err) {
                connection.release()
                throw err
            }
            res.send({
                status: true
            })
        })
        connection.release()
    })

}

export const editComment = function (res: any, req: any) {

    const selectQuery = `SELECT comment FROM comments 
        WHERE majorID = ?
    `

    const param = [req.body.page]

    const updateQuery = `UPDATE comments
        SET comment = ?,
            updatedAt = ?
        WHERE id = ?
    `

    const params = [req.body.comment, new Date().toISOString().slice(0, 19).replace('T', ' '), req.params.id]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectQuery, param, function (err: any, result: any) {
            if (err) {
                connection.release()
                throw err
            }
            var existing = false
            for (var i = 0; i < result.length; i++) {
                if (req.body.comment === result[i].comment) {
                    existing = true
                    res.send({
                        status: false
                    })
                }
            }
            if (!existing) {
                connection.query(updateQuery, params, function (err: any, result: any) {
                    if (err) {
                        connection.release()
                        throw err
                    }
                    res.send({
                        status: true
                    })
                })
            }
        })
        connection.release()
    })

}

export const deleteComment = function (res: any, req: any) {

    const selectQuery = `SELECT comment FROM comments 
        WHERE id = ?
    `

    const deleteLikesQuery = `DELETE FROM likes
        WHERE commentID = ?
    `

    const deleteRepliesQuery = `DELETE FROM reply
        WHERE commentID = ?
    `

    const deleteCommentQuery = `DELETE FROM comments
        WHERE id = ?
    `
    
    const param = [req.params.id]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }

        connection.query(selectQuery, param, function (err: any, result: any) {
            if (err) {
                connection.release()
                throw err
            }

            if (result.length !== 0) {
                connection.query(deleteLikesQuery, param, function (err: any, result: any) {
                    if (err) {
                        connection.release()
                        throw err
                    }
                })
        
                connection.query(deleteRepliesQuery, param, function (err: any, result: any) {
                    if (err) {
                        connection.release()
                        throw err
                    }
                })
        
                connection.query(deleteCommentQuery, param, function (err: any, result: any) {
                    if (err) {
                        connection.release()
                        throw err
                    }
                    res.send({
                        status: true
                    })
                })
            }
        })
        connection.release()
    })

}