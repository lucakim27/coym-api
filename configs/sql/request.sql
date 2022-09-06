CREATE TABLE requests (
    id INT AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL, 
    content VARCHAR(255) NOT NULL, 
    createdAt DATETIME NOT NULL,
    PRIMARY KEY (id)
);