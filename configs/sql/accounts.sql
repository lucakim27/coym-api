CREATE TABLE accounts (
    id INT AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    gender VARCHAR(255),
    country VARCHAR(255),
    major VARCHAR(255),
    school VARCHAR(255),
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME,
    PRIMARY KEY (id)
)