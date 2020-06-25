insert into company
(name)
values ($1);

select * from company
where name = $1