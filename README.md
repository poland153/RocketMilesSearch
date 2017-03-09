# RocketMilesSearch

In order to run the test suite, you must first have Node.js v6.10.0 LTS for Windows x64 installed.  https://nodejs.org/en/

After that, go to http://www.protractortest.org/#/protractor-setup to follow the Setting Up Protractor instructions.
This consists of opening 'Node.js command prompt' from the start menu and running: 'npm install -g protractor'

The next step is to install the Selenium Server.  
You need to have JDK installed; I run it with Version 8 Update 66 on my desktop.

First open a command prompt and enter: 'webdriver-manager update'. This will install the selenium server with ChromeDriver.
Next enter: 'webdriver-manager start'.  This will start the Selenium hub from command prompt.  It defaults to http://localhost:4444/wd/hub

From there, download the 'tests' folder which contains the config.js for protractor and the test cases under homepage/homepage.spec.js.
Inside of the 'tests' folder, start a command prompt and enter: 'protractor config.js'.  This will cause protractor to read the config.js file and launch an instance of the ChromeDriver and you will see the tests begin to run.  The '.' signifies a PASS while an 'F' signifies a FAILURE.
