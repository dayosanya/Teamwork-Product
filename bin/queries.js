/* eslint-disable no-unused-vars */
/* eslint-disable radix */
const {Pool } = require('pg');

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'olubunmi7944',
  port: 5432,
});
exports.createArticle = (request, response, _next) => {
  const values = Object.values(request.body);
  pool.query(`INSERT INTO articles (created_on, authorid, title, article)
        VALUES (now(), $1, $2, $3)`,
  [...values], (error, _results) => {
    if (error) {
      response.status(400).json({ error: 'Post failed!' });
    } else {
      response.status(201).json({
        status: 'Success!',
        Data: {
          message: 'Article successfully posted!',
          createon: request.body.created_on,
          title: request.body.title,
        },
      });
    }
  });
};

exports.updateArticle = (request, response, _next) => {
  const id = parseInt(request.params.id);
  const values = Object.values(request.body);
  pool.query('UPDATE articles SET authorid=$1, title=$2, article=$3 WHERE articleid=$4',
    [...values, id], (error, _results) => {
      if (error) {
        response.status(400).json({ error: 'Failed to update!' });
      } else {
        response.status(201).json({
          status: 'Success',
          Data: {
            message: 'Article successfully updated!',
            title: request.body.title,
            article: request.body.article,
          },
        });
      }
    });
};

exports.deleteOneArticle = (request, response, _next) => {
  const values = parseInt(request.params.id);
  pool.query('DELETE FROM articles where articleid = $1', [values], (error, _results) => {
    if (error) {
      response.status(400).json({ error: 'Failed to delete Article!' });
    } else {
      response.status(200).json({
        status: 'Success!',
        Data: {
          message: 'Deleted successfully!',
        },
      });
    }
  });
};

exports.createComment = (request, response, _next) => {
  const values = Object.values(request.body);
  pool.query(`INSERT INTO articlecomments (created_on, comment, authorid, articleid)
        VALUES (now(), $1, $2, $3)`,
  [...values], (error, _results) => {
    if (error) {
      response.status(400).json({ error: 'Failed to post comment!' });
    } else {
      response.status(201).json({
        status: 'success',
        Data: {
          message: 'Comment successfully created!',
          createdOn: request.body.created_on,
          author: request.body.authorid,
          comment: request.body.comment,
        },
      });
    }
  });
};

exports.getOneArticle = (request, response, _next) => {
  const values = parseInt(request.params.id);
  pool.query(`SELECT a.articleid, a.created_on, a.title, a.post, c.commentid, c.comment, c.authorid FROM articles a
    JOIN articlecomments c
    ON a.articleid = c.articleid
    WHERE a.articleid = $1`, [values], (error, results) => {
    if (error || results.rows < 1) {
      response.status(404).json({ error: 'Article not found!' });
    } else {
      response.status(200).json({
        status: 'Success',
        Data: results.rows,
      });
    }
  });
};
exports.createGif = (request, response, _next) => {
  const values = Object.values(request.body);
  pool.query(`INSERT INTO gifs (created_on, authorid, title, url)
      VALUES (now(), $1, $2, $3)`, [...values], (error, _results) => {
    if (error) {
      response.status(400).json({ error: 'Post failed!' });
    } else {
      cloudinary.uploader.upload(request.body.url, (_error, result) => {
        response.status(201).json({
          status: 'Success',
          Data: {
            gifid: result.public_id,
            message: 'GIF image successfully posted!',
            createdOn: result.created_at,
            Title: request.body.title,
            url: result.url,
          },
        });
      });
    }
  });
};

exports.deleteOneGif = (request, response, _next) => {
  const values = parseInt(request.params.id);
  pool.query('DELETE FROM gifs WHERE gifid = $1', [values], (error, _results) => {
    if (error) {
      response.status(400).json({ error: 'Cannot be deleted!' });
    } else {
      response.status(200).json({
        status: 'Success!',
        Data: {
          message: 'Gif post successfully deleted!',
        },
      });
    }
  });
};

exports.createComment = (request, response, _next) => {
  const values = Object.values(request.body);
  pool.query(`INSERT INTO gifcomments (created_on, comment, authorid, gifid)
      VALUES (now(), $1, $2, $3)`,
  [...values], (error, _results) => {
    if (error) {
      response.status(400).json({ error: 'Failed to post comment!' });
    } else {
      response.status(201).json({
        status: 'success',
        Data: {
          message: 'Comment successfully created!',
          createdOn: request.body.created_on,
          author: request.body.authorid,
          comment: request.body.comment,
        },
      });
    }
  });
};

exports.getOneGif = (request, response, _next) => {
  const values = parseInt(request.params.id);
  pool.query(`SELECT g.gifid, g.created_on, g.title, g.post, c.commentid, c.comment, c.authorid FROM gifs g
  JOIN gifcomments c
  ON g.gifid = c.gifid
  WHERE g.gifid = $1`, [values], (error, results) => {
    if (error || results.rows < 1) {
      response.status(404).json({ error: 'Gif not found!' });
    } else {
      response.status(200).json({
        status: 'Success',
        Data: results.rows,
      });
    }
  });
};
exports.feeds = (_request, response, _next) => {
  pool.query(`SELECT * FROM articles
              UNION ALL
              SELECT * FROM gifs
              ORDER BY created_on DESC`, (error, results) => {
    if (error || results.rows < 1) {
      response.status(404).json({ error: 'No Feeds found' });
    } else {
      response.status(200).json(results.rows);
    }
  });
};
