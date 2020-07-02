update work_users 
set
firstname = $2,
lastname = $3,
email = $4,
profile_pic = $5
where id = $1;

select * from work_users
where id = $1