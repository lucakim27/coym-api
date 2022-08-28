import { pool } from '../configs/db'

export const getComment = (res: any, req: any) => {

    const selectCommentsTableQuery = `SELECT a.id, a.username, c.comment, c.createdAt, c.id AS commentID, m.name FROM comments c
        inner join accounts a on a.id = c.userID
        inner join majors m on m.id = c.majorID
        WHERE m.id = ?
    `

    const paramForSelectCommentsTableQuery = [req.params.id]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectCommentsTableQuery, paramForSelectCommentsTableQuery, function (err: any, result: any, fields: any) {
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

export const getCommentCount = (res: any, req: any) => {

    const selectCommentsTableQuery = `SELECT m.id, m.name FROM comments c
        inner join majors m on m.id = c.majorID
    `

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

export const getTotalCommentCount = (res: any, req: any) => {

    const selectCommentsTableQuery = `SELECT COUNT(*) FROM comments`

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

export const postComment = (res: any, req: any) => {

    const insertCommentsTableQuery = `INSERT INTO 
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

    const paramsForInsertCommentsTableQuery = [req.body.comment, req.params.id, req.body.username, new Date().toISOString().slice(0, 19).replace('T', ' ')]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(insertCommentsTableQuery, paramsForInsertCommentsTableQuery, function (err: any, result: any) {
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

export const editComment = (res: any, req: any) => {

    const selectCommentsTableQuery = `SELECT comment FROM comments 
        WHERE majorID = ?
    `

    const paramsForSelectCommentsTableQuery = [req.body.page]

    const updateCommentsQuery = `UPDATE comments
        SET comment = ?,
            updatedAt = ?
        WHERE id = ?
    `

    const paramsForUpdateCommentsQuery = [req.body.comment, new Date().toISOString().slice(0, 19).replace('T', ' '), req.params.id]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectCommentsTableQuery, paramsForSelectCommentsTableQuery, function (err: any, result: any) {
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
                connection.query(updateCommentsQuery, paramsForUpdateCommentsQuery, function (err: any, result: any) {
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

export const deleteComment = (res: any, req: any) => {

    const selectCommentsTableQuery = `SELECT comment FROM comments 
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
    
    const commentParam = [req.params.id]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }

        connection.query(selectCommentsTableQuery, commentParam, function (err: any, result: any) {
            if (err) {
                connection.release()
                throw err
            }

            if (result.length !== 0) {
                connection.query(deleteLikesQuery, commentParam, function (err: any, result: any) {
                    if (err) {
                        connection.release()
                        throw err
                    }
                })
        
                connection.query(deleteRepliesQuery, commentParam, function (err: any, result: any) {
                    if (err) {
                        connection.release()
                        throw err
                    }
                })
        
                connection.query(deleteCommentQuery, commentParam, function (err: any, result: any) {
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