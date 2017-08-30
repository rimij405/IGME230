# HW1B

## Links:
*These are links used to showcase the .htaccess files.*

- [people.rit.edu/iae2784/230](https://people.rit.edu/iae2784/230/ "Link to Homepage for IGME 230 class.")
- [people.rit.edu/iae2784/230/error/](https://people.rit.edu/iae2784/230/error/ "Link to NotError.HTML page for IGME 230 class.")
- [people.rit.edu/iae2784/230/auth/](https://people.rit.edu/iae2784/230/auth/myPage.html "Link to page requiring authorization on the website.") 

## ZIP file:
The .zip file includes three folders: home, error, and auth.

### home
Contains the .htaccess file for the entire website.
(Uses the directive ModPagespeed off)

### error
Contains the .htaccess file for the error page.
Uses ErrorDocument 404 directive in order to redirect site to custom hypno-toad 404 error page.
Uses DirectoryIndex to set the directory's main index page to noterror.html.

### auth
Contains the .htaccess file for the authorization page.
Uses the series of required directives to enable Shibboleth service authorization for all valid RIT users.
