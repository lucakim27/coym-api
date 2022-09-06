CREATE TABLE moduleLikes (
    id INT AUTO_INCREMENT, 
    moduleCommentID INT NOT NULL, 
    moduleID INT NOT NULL, 
    userID INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (moduleCommentID) REFERENCES moduleComments(id),
    FOREIGN KEY (moduleID) REFERENCES modules(id),
    FOREIGN KEY (userID) REFERENCES accounts(id)
);