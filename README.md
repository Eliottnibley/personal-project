# Quarantine Officespace

## Idea and Users
- A website for employers to keep track of employees work hours and productivity while they work from home
- this is accomplished by using instant messaging and login tracking to help connect employees working from home

## MVP 
- Login and register functionality as employee or admin
- admin can create a company
- Employee and Admin can clock in and clock out
- Dashboard will display who is clocked in or out
- Admin can send an invitation using (NodeMailer) to an employee with a code to join the admin company
- Instant message anyone in the company (socket.io)
- control view based on authentication

**Icebox**
- At clock out employee is promped to report on what they accomplished
- Admin can view when each employee clocked in or out and also view the progress report connected to logout
- Employee can view their total hours worked
- Admin can view total hours worked of all employees
- files can be attached to instant messeging
- ability to create subgroups within a company and message in those groups
- audio call and video call
- make a file storage that can be accessed based on authentication 
- create a projects tab where an admin can create a project. all users can view and update the project status
- project with include a checklist of items to accomplish
- project status will update according to the checklist

## Wireframe
### Authentication
**Login**
![](images/login.png)

**Register**
![](images/register.png)

**Dashboard**
![](images/dashboard.png)

**Files Page**
![](images/filesPage.png)

## Routes
- dynamic messaging route for each employee
- files page route
- timesheet route
- dynamic timesheet route if user is admin

## Database

