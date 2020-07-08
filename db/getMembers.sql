select work_users.id, work_users.firstname, work_users.lastname, work_users.email, work_users.profile_pic, work_users.is_admin from company
join work_users on work_users.company_id = company.id
where company_id = $1
order by lastname asc;