# Manga List
The plan is to make a site where you can create a user, log in, and create a manga list that is connected to your user only.

## Routes
:/

:/account (Sign up and log in) (bytte till :/users istället)

:/mangalist (Need a log in)

## CRUD
Create and Remove manga, edit the current chapter, get mangalist connected to specific user.

## Database
users - Store all logins.

manga - Store manga entries, somehow connected to their respective user, either on this tabell or through the other one.

(Finns nu en tredje tabell som binder manga id till användare, d.v.s varje användare har sin egen lista)

## Frontend
Home page - no real content. (Har nu en lista av manga som man kan lägga till sin användare)

Sign up and log in - a form to send data to users.

Mangalist page - list of all manga the user is currently reading.

## Backend
NJK.

## Avgränsningar
Learn more about login.

Figure out how to connect mangalist to specific user, maybe have the entries connected to the user, however that will create a lot of dupilicates the more users there are.



