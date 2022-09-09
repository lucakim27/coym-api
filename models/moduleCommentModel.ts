import { pool } from '../configs/db'

export const getModuleComment = function (res: any, req: any) {

    const selectCommentsTableQuery = `SELECT a.id, a.username, c.comment, c.createdAt, c.id AS commentID, m.name FROM moduleComments c
        inner join accounts a on a.id = c.userID
        inner join modules m on m.id = c.moduleID
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

export const postModuleComment = function (res: any, req: any) {

    const insertCommentsTableQuery = `INSERT INTO 
        moduleComments (
            comment, 
            moduleID, 
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

export const editModuleComment = function (res: any, req: any) {

    const selectCommentsTableQuery = `SELECT comment FROM moduleComments 
        WHERE moduleID = ?
    `

    const paramsForSelectCommentsTableQuery = [req.body.page]

    const updateCommentsQuery = `UPDATE moduleComments
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

export const deleteModuleComment = function (res: any, req: any) {

    const selectCommentsTableQuery = `SELECT comment FROM moduleComments 
        WHERE id = ?
    `

    const deleteLikesQuery = `DELETE FROM moduleLikes
        WHERE moduleCommentID = ?
    `

    const deleteRepliesQuery = `DELETE FROM moduleReply
        WHERE moduleCommentID = ?
    `

    const deleteCommentQuery = `DELETE FROM moduleComments
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

export const getModuleCommentCount = function (res: any, req: any) {

    const query = `SELECT m.name, COUNT(m.name) AS count FROM moduleComments c
        inner join modules m on m.id = c.moduleID
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

export const getPopularModules = function (res: any, req: any) {

    const query = `SELECT m.id, m.name, COUNT(m.name) AS count FROM moduleComments c
        inner join modules m on m.id = c.moduleID
        GROUP BY m.name
        ORDER BY count DESC
        LIMIT 3;
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

export const getTotalModuleCommentCount = function (res: any, req: any) {

    const query = `SELECT COUNT(*) FROM moduleComments`

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