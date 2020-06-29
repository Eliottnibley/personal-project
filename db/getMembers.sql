select * from work_users
where company_id = $1
order by lastname asc;