// import { Pool } from 'pg'
 const post=require('pg');
 const Pool=post.Pool;

const pool=new Pool();

module.exports= {
    query:(text,params)=>pool.query(text,params)
};
