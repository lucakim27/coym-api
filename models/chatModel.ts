// export const createChatUserTable = function (connection: any) {

//     const chatUserTableDuplicationQuery = `SELECT table_name
//         FROM information_schema.tables
//         WHERE table_schema = 'coym'
//         AND table_name = 'chatUser'
//     `

//     const createChatUserTableQuery = `CREATE TABLE chatUser 
//         (
//             id INT AUTO_INCREMENT,
//             userID INT NOT NULL,
//             counterpartID INT NOT NULL,
//             PRIMARY KEY (id),
//             FOREIGN KEY (userID) REFERENCES accounts(id),
//             FOREIGN KEY (counterpartID) REFERENCES accounts(id)
//         )
//     `

//     connection.connect(function (err: any) {
//         if (err) throw err
//         connection.query(chatUserTableDuplicationQuery, function (err: any, result: any) {
//             if (err) throw err
//             if (!result.length) {
//                 connection.query(createChatUserTableQuery, function (err: any, result: any) {
//                     if (err) throw err
//                 })
//             }
//         })
//     })

// }

// export const createChatTable = function (connection: any) {

//     const chatTableDuplicationQuery = `SELECT table_name
//         FROM information_schema.tables
//         WHERE table_schema = 'coym'
//         AND table_name = 'chat'
//     `

//     const createChatTableQuery = `CREATE TABLE chat 
//         (
//             id INT AUTO_INCREMENT,
//             text TEXT NOT NULL,
//             chatUserID INT NOT NULL,
//             userID INT NOT NULL,
//             createdAt DATETIME NOT NULL,
//             updatedAt DATETIME,
//             PRIMARY KEY (id),
//             FOREIGN KEY (chatUserID) REFERENCES chatUser(id),
//             FOREIGN KEY (userID) REFERENCES accounts(id)
//         )
//     `

//     connection.connect(function (err: any) {
//         if (err) throw err
//         connection.query(chatTableDuplicationQuery, function (err: any, result: any) {
//             if (err) throw err
//             if (!result.length) {
//                 connection.query(createChatTableQuery, function (err: any, result: any) {
//                     if (err) throw err
//                 })
//             }
//         })
//     })

// }

// export const addChatUserAndChat = function (connection: any, username: any, counterpart: any, text: any) {

//     const insertChatQuery = `INSERT INTO 
//         chat (
//             text, 
//             chatUserID, 
//             userID, 
//             createdAt
//         ) VALUES (
//             '${text}', 
//             (
//                 SELECT id FROM chatUser WHERE (
//                     userID = (SELECT id FROM accounts WHERE username = '${username}') 
//                     AND counterpartID = (SELECT id FROM accounts WHERE username = '${counterpart}')
//                 ) OR (
//                     userID = (SELECT id FROM accounts WHERE username = '${counterpart}') 
//                     AND counterpartID = (SELECT id FROM accounts WHERE username = '${username}')
//                 )
//             ), 
//             (SELECT id FROM accounts WHERE username = '${username}'), 
//             '${new Date().toISOString().slice(0, 19).replace('T', ' ')}'
//         )
//     `

//     const insertChatUserQuery = `INSERT INTO 
//         chatUser (
//             userID, 
//             counterpartID
//         ) VALUES (
//             (SELECT id FROM accounts WHERE username = '${username}'), 
//             (SELECT id FROM accounts WHERE username = '${counterpart}')
//         )
//     `

//     const selectChatUserQuery = `SELECT * FROM chatUser
//         WHERE (userID = (SELECT id FROM accounts WHERE username = '${username}')
//         AND counterpartID = (SELECT id FROM accounts WHERE username = '${counterpart}'))
//         OR (userID = (SELECT id FROM accounts WHERE username = '${counterpart}')
//         AND counterpartID = (SELECT id FROM accounts WHERE username = '${username}'))
//     `
    
//     connection.connect(function (err: any) {
//         if (err) throw err
//         connection.query(selectChatUserQuery, function(err: any, result: any) {
//             if (err) throw err
//             if (!result.length) {
//                 connection.query(insertChatUserQuery, function (err: any, result: any) {
//                     if (err) throw err
//                 })
//                 connection.query(insertChatQuery, function (err: any, result: any) {
//                     if (err) throw err
//                 })
//             } else {
//                 connection.query(insertChatQuery, function (err: any, result: any) {
//                     if (err) throw err
//                 })
//             }
//         })
//     })

// }

// export const sendChatUser = function (connection: any, username: any, io: any, socket: any) {

//     const selectChatUserQuery = `SELECT a.username, c.id FROM chatUser c
//         INNER JOIN accounts a on a.id = c.userID or a.id = c.counterpartID
//         WHERE c.userID = (SELECT id FROM accounts WHERE username = '${username}')
//         OR c.counterpartID = (SELECT id FROM accounts WHERE username = '${username}')
//     `
    
//     connection.connect(function (err: any) {
//         if (err) throw err
//         connection.query(selectChatUserQuery, function (err: any, result: any) {
//             if (err) throw err
//             setTimeout(async function () {
//                 io.to(socket.id).emit('sendChatUser', JSON.stringify(result))
//             }, 500)
//         })
//     })

// }

// export const sendChat = function (connection: any, username: any, counterpart: any, io: any, socket: any) {

//     const selectChatQuery = `SELECT c.text, a.username FROM chat c
//         INNER JOIN chatUser u on c.chatUserID = u.id
//         INNER JOIN accounts a on a.id = c.userID
//         WHERE (u.userID = (SELECT id FROM accounts WHERE username = '${username}') AND u.counterpartID = (SELECT id FROM accounts WHERE username = '${counterpart}'))
//         OR (u.userID = (SELECT id FROM accounts WHERE username = '${counterpart}') AND u.counterpartID = (SELECT id FROM accounts WHERE username = '${username}'))
//         ORDER BY c.createdAt ASC
//     `

//     setTimeout(async function () {
//         io.to(socket.id).emit('sendChat', JSON.stringify(await connection.promise().query(selectChatQuery)))
//     }, 500)

// }