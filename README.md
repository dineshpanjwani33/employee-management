This project was bootstrapped with [Create React App]

## Getting started

To get the frontend running locally:

```sh
 git clone https://github.com/dineshpanjwani33/employee-management.git
 cd employee-management
 npm install
 npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Functionality overview
General functionality:
* Authenticate managers (login/signup pages + logout button on navigation)
* Create, Update, Delete and Display Employees

The general page breakdown looks like this:
* Sign in/Sign up pages (URL: /auth )
	* Used JWT and stored the token in localStorage
* Dashboard page (URL: / )
	* List of Employees with edit and delete button
	* Add Employee button
	
## Followed Requirements Checklist
* Used the concepts of React
* Used react routing and http server calls using fetch()
* Used custom forms and validation
* Used React Lazy Loading, to load components in chunks
* Used an auth guard by checking token.
* Handled JWT.
* Designed components clear & clean code with proper comments.
* Used Bootstrap framework
* Used SCSS for styling.
