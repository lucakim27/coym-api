export const getModuleList = function (pool: any, res: any, req: any) {

    const query = `SELECT * FROM modules`

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


export const getModuleName = function (pool: any, res: any, req: any) {

    const selectMajorsQuery = `SELECT name FROM modules WHERE id = ?`

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