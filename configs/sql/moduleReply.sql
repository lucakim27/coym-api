CREATE TABLE moduleReply (
    id INT AUTO_INCREMENT, 
    moduleID INT NOT NULL, 
    userID INT NOT NULL, 
    moduleCommentID INT NOT NULL, 
    reply TEXT NOT NULL, 
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME,
    PRIMARY KEY (id),
    FOREIGN KEY (moduleID) REFERENCES modules(id),
    FOREIGN KEY (userID) REFERENCES accounts(id),
    FOREIGN KEY (moduleCommentID) REFERENCES moduleComments(id)
);