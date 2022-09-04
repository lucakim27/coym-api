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