export const createLikesTable = function (pool: any) {

    const likesTableDuplicationQuery = `SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = "coym"
        AND table_name = "likes"
    `

    const createLikesQuery = `CREATE TABLE IF NOT EXISTS 
        likes (
            id INT AUTO_INCREMENT, 
            commentID INT NOT NULL, 
            majorID INT NOT NULL, 
            userID INT NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (commentID) REFERENCES comments(id),
            FOREIGN KEY (majorID) REFERENCES majors(id),
            FOREIGN KEY (userID) REFERENCES accounts(id)
        ) 
    `

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(likesTableDuplicationQuery, function (err: any, result: any) {
            if (err) {
                connection.release()
                throw err
            }
            if (!result.length) {
                connection.query(createLikesQuery, function (err: any, result: any) {
                    if (err) {
                        connection.release()
                        throw err
                    }
                })
            }
        })
        connection.release()
    })

}

export const postLike = function (pool: any, res: any, req: any) {

    const selectLikesQuery = `SELECT * FROM likes
        WHERE commentID = ? AND
            majorID = ? AND 
            userID = (SELECT id FROM accounts WHERE username = ?)
    `

    const deleteLikesColumnQuery = `DELETE FROM likes 
        WHERE commentID = ? AND
            majorID = ? AND 
            userID = (SELECT id FROM accounts WHERE username = ?)
    `
    
    const selectParams = [req.params.id, req.body.page ,req.body.username]

    const insertLikesQuery = `INSERT INTO 
        likes (
            commentID, 
            majorID, 
            userID
        ) VALUES (
            ?, 
            ?, 
            (SELECT id FROM accounts WHERE username = ?)
        )
    `

    const insertParams = [req.params.id, req.body.page ,req.body.username]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectLikesQuery, selectParams, function (err: any, result: any) {
            if (err) {
                connection.release()
                throw err
            }
            if (!result.length) {
                connection.query(insertLikesQuery, insertParams, function (err: any, result: any) {
                    if (err) {
                        connection.release()
                        throw err
                    }
                    res.send({
                        status: true,
                        message: 'You have liked the comment.'
                    })
                })
            } else {
                connection.query(deleteLikesColumnQuery, selectParams, function (err: any, result: any) {
                    if (err) {
                        connection.release()
                        throw err
                    }
                    res.send({
                        status: true,
                        message: 'You have unliked the comment.'
                    })
                })
            }
        })
        connection.release()
    })

}

export const getLike = function (pool: any, res: any, req: any) {

    const selectLikesQuery = `SELECT a.username, m.name, c.comment, c.id AS commentID FROM likes l
        inner join accounts a on a.id = l.userID
        inner join majors m on m.id = l.majorID
        inner join comments c on c.id = l.commentID
        WHERE m.id = ?
    `
    
    const paramsForSelectLikesQuery = [req.params.id]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectLikesQuery, paramsForSelectLikesQuery, function (err: any, result: any, fields: any) {
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

export const getLikeCount = function (pool: any, res: any, req: any) {

    const selectLikesQuery = `SELECT m.id, m.name FROM likes l
        inner join majors m on m.id = l.majorID
    `

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectLikesQuery, function (err: any, result: any, fields: any) {
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

export const getTotalLikeCount = function (pool: any, res: any, req: any) {

    const selectLikesQuery = `SELECT COUNT(*) FROM likes`

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectLikesQuery, function (err: any, result: any, fields: any) {
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
