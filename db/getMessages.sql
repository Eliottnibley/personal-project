select * from messages
where message_identifier = concat('user', $1, ':user', $2)