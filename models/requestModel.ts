import { pool } from '../configs/db'

export const postRequest = function (res: any, req: any) {
    
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
            console.error('DB connection error:', err);
            return;
        }
        connection.query(insertRequestQuery, paramsForInsertRequestQuery, function (err: any, result: any) {
            if (err) {
                connection.release()
                console.error('Query error:', err);
                return;
            }
            res.send({ 
                status: true, 
                message: 'You have successfully requested.' 
            })
        })
    })

}