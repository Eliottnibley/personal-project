update work_users
set company_id = $2
where id = $1;

select * from work_users
where id = $1;