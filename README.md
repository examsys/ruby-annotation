# rubyAnnotation TinyMCE Plugin

This is a repo containing the rubyAnnotation TinyMCE plugin.

Developed at the University of Nottingham

Contributors:

* Dr Joseph Baxter
* Naseem Sarwar

# Deploy instructions

Run ```yarn build``` to creat dist directory

Copy dist/ruby-annotation to the desired location

See documentation about loading external plugins at [https://www.tiny.cloud/docs/configure/integration-and-setup/#external_plugins](https://www.tiny.cloud/docs/configure/integration-and-setup/#external_plugins)

# Functionality

Adds a ruby annotation button to the toolbar

![ruby toolbar button](./images/rubytoolbar.PNG)

This launches a dialog where you enter your kana in brackets

![ruby dialog](./images/rubypreview.PNG)

A preview is displayed and onec you are happy this can be added to the editor

![ruby insert](./images/rubyinsert.PNG)
