update messages set read = true
where message_identifier = $1 and sender <> $2;