CREATE TABLE comments (
    id INT AUTO_INCREMENT, 
    comment TEXT, 
    majorID INT, 
    userID INT, 
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME,
    PRIMARY KEY (id),
    FOREIGN KEY (majorID) REFERENCES majors(id),
    FOREIGN KEY (userID) REFERENCES accounts(id)
);