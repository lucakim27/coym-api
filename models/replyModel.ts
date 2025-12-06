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
            console.error('DB connection error:', err);
            return;
        }
        connection.query(selectReplyQuery, paramsForSelectReplyQuery, function (err: any, result: any, fields: any) {
            connection.release()
            if (err) {
                console.error('Query error:', err);
                return;
            }
            res.send({ 
                status: true, 
                message: result 
            })
        })
    })

}

export const getTotalReplyCount = function (res: any, req: any) {

    const selectReplyQuery = `SELECT COUNT(*) FROM reply`

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            console.error('DB connection error:', err);
            return;
        }
        connection.query(selectReplyQuery, function (err: any, result: any, fields: any) {
            connection.release()
            if (err) {
                console.error('Query error:', err);
                return;
            }
            res.send({
                status: true,
                message: result
            })
        })
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
            console.error('DB connection error:', err);
            return;
        }
        connection.query(insertReplyQuery, paramsForInsertReplyQuery, function (err: any, result: any) {
            connection.release()
            if (err) {
                console.error('Query error:', err);
                return;
            }
            res.send({ 
                status: true, 
                message: 'You have successfully replied.'
            })
        })
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
            console.error('DB connection error:', err);
            return;
        }
        connection.query(updateCommentsQuery, paramsForUpdateCommentsQuery, function (err: any, result: any) {
            connection.release()
            if (err) {
                console.error('Query error:', err);
                return;
            }
            res.send({
                status: true
            })
        })
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
            console.error('DB connection error:', err);
            return;
        }
        connection.query(selectCommentsTableQuery, replyParam, function (err: any, result: any) {
            connection.release()
            if (err) {
                console.error('Query error:', err);
                return;
            }
            if (result.length === 1) {
                connection.query(deleteCommentQuery, replyParam, function (err: any, result: any) {
                    connection.release()
                    if (err) {
                        console.error('Query error:', err);
                        return;
                    }
                    res.send({
                        status: true
                    })
                })
            }
        })
    })

}