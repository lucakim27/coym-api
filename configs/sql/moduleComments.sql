CREATE TABLE moduleComments (
    id INT AUTO_INCREMENT, 
    comment TEXT, 
    moduleID INT, 
    userID INT, 
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME,
    PRIMARY KEY (id),
    FOREIGN KEY (moduleID) REFERENCES modules(id),
    FOREIGN KEY (userID) REFERENCES accounts(id)
);