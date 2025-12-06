import { pool } from '../configs/db'

export const getMajorList = function (res: any, req: any) {

    const selectMajorsQuery = `SELECT * FROM majors`

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            console.error('DB connection error:', err);
            return;
        }
        connection.query(selectMajorsQuery, function (err: any, result: any, fields: any) {
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

export const getMajorName = function (res: any, req: any) {

    const selectMajorsQuery = `SELECT name FROM majors WHERE id = ?`

    const param = [req.params.id]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            console.error('DB connection error:', err);
            return;
        }
        connection.query(selectMajorsQuery, param,  function (err: any, result: any, fields: any) {
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