DROP TABLE IF EXISTS users;
CREATE TABLE users (
    userid SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    firstname VARCHAR(255) UNIQUE NOT NULL,
    lastname VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    genderid CHAR(1) REFERENCES gender(genderid) NOT NULL,
    departmentid INT REFERENCES departments(departmentid) NOT NULL,
    roleid INT REFERENCES job_roles(jobrole_id) NOT NULL,
    home_address VARCHAR(255) NOT NULL,
    last_login TIMESTAMP NOT NULL
);
DROP TABLE IF EXISTS articles;
CREATE TABLE articles (
    articleid SERIAL PRIMARY KEY NOT NULL,
    created_on TIMESTAMP NOT NULL,
    authorid VARCHAR(255) REFERENCES users(username) NOT NULL,
    title VARCHAR(255),
    articles TEXT NOT NULL,
    commentid INT REFERENCES articlecomments(commentid) 
);
CREATE TABLE articlecomments (
    commentid SERIAL PRIMARY KEY NOT NULL,
    created_on TIMESTAMP NOT NULL,
    Comment VARCHAR(255),
    authorid VARCHAR(255) REFERENCES users(username) NOT NULL,
    articleid INT REFERENCES articles(articleid) NOT NULL
);

CREATE TABLE gifs (
    gifid SERIAL PRIMARY KEY NOT NULL,
    created_on TIMESTAMP NOT NULL,
    authorid VARCHAR(255) REFERENCES users(username) NOT NULL,
    title VARCHAR(255),
    gif_url VARCHAR(255),
    commentsid INT REFERENCES gifcomments(commentid)
);

CREATE TABLE gifcomments (
    commentid SERIAL PRIMARY KEY NOT NULL,
    created_on TIMESTAMP NOT NULL,
    Comment VARCHAR(255),
    authorid VARCHAR(255) REFERENCES users(username) NOT NULL,
    gifid INT REFERENCES gifs(gifsid) NOT NULL
);

CREATE TABLE gender (
    genderid CHAR(1) PRIMARY KEY NOT NULL,
    gender CHAR(6)
);

CREATE TABLE departments (
    departmentid SERIAL PRIMARY KEY NOT NULL,
    departments VARCHAR(255) NOT NULL
);

CREATE TABLE job_roles (
    jobrole_id SERIAL PRIMARY KEY NOT NULL,
    jobroles VARCHAR(50)
);