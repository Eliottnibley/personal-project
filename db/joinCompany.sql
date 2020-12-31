SELECT * from work_users
full outer join company on work_users.company_id=company.id
where work_users.id = $1;