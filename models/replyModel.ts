import { pool } from '../configs/db'

export const getReply = function (res: any, req: any) {

    const selectReplyQuery = `SELECT a.id, a.username, c.id AS commentID, c.comment, r.reply, m.name, r.createdAt, r.id AS replyID FROM reply r
        inner join accounts a on a.id = r.userID
        inner join majors m on m.id = r.majorID
        inner join comments c on c.id = r.commentID
        WHERE m.id = ?
    `

    const paramsForSelectReplyQuery = [req.params.id]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectReplyQuery, paramsForSelectReplyQuery, function (err: any, result: any, fields: any) {
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

export const getReplyCount = function (res: any, req: any) {

    const selectReplyQuery = `SELECT m.name, COUNT(m.name) AS count FROM reply r
        inner join majors m on m.id = r.majorID
        GROUP BY m.name
    `

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectReplyQuery, function (err: any, result: any, fields: any) {
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

export const getTotalReplyCount = function (res: any, req: any) {

    const selectReplyQuery = `SELECT COUNT(*) FROM reply`

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectReplyQuery, function (err: any, result: any, fields: any) {
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

export const postReply = function (res: any, req: any) {

    const insertReplyQuery = `INSERT INTO 
        reply (
            majorID,
            userID,
            commentID,
            reply,
            createdAt
        ) VALUES (
            ?, 
            (SELECT id FROM accounts WHERE username = ?), 
            ?, 
            ?,
            ?
        )
    `

    const paramsForInsertReplyQuery = [req.body.page, req.body.username, req.params.id, req.body.reply, new Date().toISOString().slice(0, 19).replace('T', ' ')]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(insertReplyQuery, paramsForInsertReplyQuery, function (err: any, result: any) {
            if (err) {
                connection.release()
                throw err
            }
            res.send({ 
                status: true, 
                message: 'You have successfully replied.'
            })
        }) 
        connection.release()
    })

}

export const editReply = function (res: any, req: any) {

    const updateCommentsQuery = `UPDATE reply
        SET reply = ?,
            updatedAt = ?
        WHERE id = ?
    `

    const paramsForUpdateCommentsQuery = [req.body.reply, new Date().toISOString().slice(0, 19).replace('T', ' '), req.params.id]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(updateCommentsQuery, paramsForUpdateCommentsQuery, function (err: any, result: any) {
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

export const deleteReply = function (res: any, req: any) {

    const selectCommentsTableQuery = `SELECT reply FROM reply 
        WHERE id = ?
    `

    const deleteCommentQuery = `DELETE FROM reply
        WHERE id = ?
    `
    
    const replyParam = [req.params.id]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectCommentsTableQuery, replyParam, function (err: any, result: any) {
            if (err) {
                connection.release()
                throw err
            }
            if (result.length === 1) {
                connection.query(deleteCommentQuery, replyParam, function (err: any, result: any) {
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