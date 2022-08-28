export const createRequestsTable = function (pool: any) {

    const tableDuplicationQuery = `SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = "coym"
        AND table_name = "requests";
    `

    const createRequestsTableQuery = `CREATE TABLE 
        requests (
            id INT AUTO_INCREMENT,
            username VARCHAR(255) NOT NULL,
            type VARCHAR(255) NOT NULL, 
            content VARCHAR(255) NOT NULL, 
            createdAt DATETIME NOT NULL,
            PRIMARY KEY (id)
        )
    `

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(tableDuplicationQuery, function (err: any, result: any) {
            if (err) {
                connection.release()
                throw err
            }
            if (!result.length) {
                connection.query(createRequestsTableQuery, function (err: any, result: any) {
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

export const postRequest = function (pool: any, res: any, req: any) {
    
    const insertRequestQuery = `INSERT INTO 
        requests (
            username,
            type, 
            content, 
            createdAt
        ) VALUES (
            ?,
            ?,
            ?,
            ?
        )
    `
    
    const paramsForInsertRequestQuery = [req.body.username, req.body.type, req.body.content, new Date().toISOString().slice(0, 19).replace('T', ' ')]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(insertRequestQuery, paramsForInsertRequestQuery, function (err: any, result: any) {
            if (err) {
                connection.release()
                throw err
            }
            res.send({ 
                status: true, 
                message: 'You have successfully requested.' 
            })
        })
        connection.release()
    })

}