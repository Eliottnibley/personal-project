insert into company
(name, access_code)
values ($1, $2);

select * from company
where access_code = $2