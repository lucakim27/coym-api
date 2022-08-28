// export const createOnlineTable = function (connection: any) {

//     const onlineTableDuplicationQuery = `SELECT table_name
//         FROM information_schema.tables
//         WHERE table_schema = 'coym'
//         AND table_name = 'online'
//     `

//     const createOnlineTable = `CREATE TABLE IF NOT EXISTS 
//         online (
//             id INT AUTO_INCREMENT, 
//             socketID VARCHAR(255) NOT NULL, 
//             userID INT NOT NULL, 
//             PRIMARY KEY (id),
//             FOREIGN KEY (userID) REFERENCES accounts(id)
//         ) 
//     `

//     connection.connect(function (err: any) {
//         if (err) throw err
//         connection.query(onlineTableDuplicationQuery, function (err: any, result: any) {
//             if (err) throw err
//             if (!result.length) {
//                 connection.query(createOnlineTable, function (err: any, result: any) {
//                     if (err) throw err
//                 })
//             }
//         })
//     })

// }

// export const dropOnlineTable = function (connection: any) {

//     const dropTableQuery = "DROP TABLE IF EXISTS online"

//     connection.connect(function (err: any) {
//         if (err) throw err
//         connection.query(dropTableQuery, function (err: any, result: any) {
//             if (err) throw err
//         })
//     })

// }

// export const addOnlineUser = function (connection: any, username: any, socketId: any) {

//     // check if user account exists..

//     const selectOnlineQuery = `SELECT * FROM online`

//     const selectAccountsQuery = `SELECT * FROM accounts`

//     const insertOnlineQuery = `INSERT INTO 
//         online (
//             socketID, 
//             userID
//         ) VALUES (
//             '${socketId}', 
//             (SELECT id FROM accounts WHERE username = '${username}')
//         )
//     `

//     connection.connect(function (err: any) {
//         if (err) throw err

//         connection.query(selectAccountsQuery, function (err: any, result: any) {
//             if (err) throw err

//         })


//         connection.query(selectOnlineQuery, function (err: any, result: any) {
//             if (err) throw err
//             var existing = false
//             for (var i = 0; i < result.length; i++) {
//                 if (username === result[i].username && socketId === result[i].socketId) {
//                     existing = true
//                 }
//             }
//             if (!existing) {
//                 connection.query(insertOnlineQuery, function (err: any, result: any) {
//                     if (err) throw err
//                 })
//             }
//         })
//     })

// }

// export const sendOnlineUsers = async function (connection: any, io: any) {

//     const selectOnlineQuery = `SELECT o.*, a.* FROM online o
//         inner join accounts a on a.id = o.userID
//     `

//     setTimeout(async function () {
//         io.sockets.emit('updateOnlineUsers', JSON.stringify(await connection.promise().query(selectOnlineQuery)))
//     }, 500)

// }

// export const removeOnlineUser = function (connection: any, socketId: any) {

//     const deleteOnlineColumnQuery = `DELETE FROM online 
//         WHERE socketId = '${socketId}'
//     `

//     connection.connect(function (err: any) {
//     if (err) throw err
//         connection.query(deleteOnlineColumnQuery, function (err: any, result2: any) {
//             if (err) throw err
//         })
//     })
// }