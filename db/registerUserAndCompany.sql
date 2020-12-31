insert into work_users 
(firstname, lastname, email, password, profile_pic, is_admin, company_id)
values ($1, $2, $3, $4, $5, $6, $7);

SELECT work_users.id, work_users.firstname, work_users.lastname, work_users.email, work_users.password, work_users.profile_pic, work_users.is_admin, work_users.company_id, company.name from work_users
join company on work_users.company_id=company.id
where email = $3