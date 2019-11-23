CREATE TABLE articlecomments (
    commentid SERIAL PRIMARY KEY NOT NULL,
    created_on TIMESTAMP NOT NULL,
    Comment VARCHAR(255),
    authorid VARCHAR(255) REFERENCES users(username) NOT NULL,
    articleid INT REFERENCES articles(articleid) NOT NULL
);
