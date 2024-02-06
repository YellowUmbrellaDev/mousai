DROP TABLE IF EXISTS commissions; 
DROP TABLE IF EXISTS users; 
CREATE TABLE users (
  email VARCHAR(255) PRIMARY KEY, 
  username VARCHAR(255)
); 
CREATE TABLE commissions (
    id VARCHAR(255) PRIMARY KEY, 
    name VARCHAR(255) NOT NULL, 
    pronouns VARCHAR(255) NOT NULL, 
    description TEXT, 
    tier VARCHAR(255) NOT NULL, 
    status VARCHAR(255) DEFAULT 'pending', 
    price DECIMAL(10, 2) NULL, 
    paid BOOLEAN DEFAULT FALSE, 
    email VARCHAR(255), 
    cardId VARCHAR(255),  
    date DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (email) REFERENCES users(email)
);
-- In one line for easy copy-pasting
-- DROP TABLE IF EXISTS commissions; DROP TABLE IF EXISTS users; CREATE TABLE users (email VARCHAR(255) PRIMARY KEY, username VARCHAR(255)); CREATE TABLE commissions (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255) NOT NULL, pronouns VARCHAR(255) NOT NULL, description TEXT, tier VARCHAR(255) NOT NULL, status VARCHAR(255) DEFAULT 'pending', price DECIMAL(10, 2) NULL, paid BOOLEAN DEFAULT FALSE, email VARCHAR(255), cardId VARCHAR(255), date DATE DEFAULT (CURRENT_DATE), FOREIGN KEY (email) REFERENCES users(email));