update work_users
set company_id = $2
where id = $1;

SELECT work_users.id, work_users.firstname, work_users.lastname, work_users.email, work_users.password, work_users.profile_pic, work_users.is_admin, company.id, company.name from work_users
join company on work_users.company_id=company.id
where id = $1;