dash-discovery
===============

This codeline supports the local discovery page for testing. The dash server has a cgi-bin directory behind Shibboleth, and in order to access the printenv or PrintShibInfo.pl scripts, they are directed through the local discovery page.  This page reads localDiscoFeed.json to build the drop-down menu of campus IDPs.  This helps tests that basic Shibboleth authentication configuration is defined properly and to assist in troubleshooting Shibboleth issues.

**Adding a new institution**

When adding new institutions to Dash which are Shibboleth enabled, you need to add information to the localdisofeed.json file and redeploy to the proper server (development, stage, or production).

**Deploy command** 

`$ cap <development> deploy`

replace < development > with name of environment  (development | stage | production) 


