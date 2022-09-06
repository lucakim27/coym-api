CREATE TABLE reply (
    id INT AUTO_INCREMENT, 
    majorID INT NOT NULL, 
    userID INT NOT NULL, 
    commentID INT NOT NULL, 
    reply TEXT NOT NULL, 
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME,
    PRIMARY KEY (id),
    FOREIGN KEY (majorID) REFERENCES majors(id),
    FOREIGN KEY (userID) REFERENCES accounts(id),
    FOREIGN KEY (commentID) REFERENCES comments(id)
);