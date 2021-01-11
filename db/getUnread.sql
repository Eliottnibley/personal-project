select count(message) from messages
where read = false and message_identifier = $1 and sender <> $2;