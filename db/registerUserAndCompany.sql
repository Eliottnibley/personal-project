insert into work_users 
(firstname, lastname, email, password, profile_pic, is_admin, company_id)
values ($1, $2, $3, $4, $5, $6, $7);

select * from work_users
where email = $3