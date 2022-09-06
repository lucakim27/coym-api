CREATE TABLE likes (
    id INT AUTO_INCREMENT, 
    commentID INT NOT NULL, 
    majorID INT NOT NULL, 
    userID INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (commentID) REFERENCES comments(id),
    FOREIGN KEY (majorID) REFERENCES majors(id),
    FOREIGN KEY (userID) REFERENCES accounts(id)
);