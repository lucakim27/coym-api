export const getMajorList = function (pool: any, res: any, req: any) {

    const selectMajorsQuery = `SELECT * FROM majors`

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectMajorsQuery, function (err: any, result: any, fields: any) {
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

export const getMajorName = function (pool: any, res: any, req: any) {

    const selectMajorsQuery = `SELECT name FROM majors WHERE id = ?`

    const param = [req.params.id]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectMajorsQuery, param,  function (err: any, result: any, fields: any) {
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