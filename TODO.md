# TAIL

* **TODO**
  - [ ] refactor code
  - [ ] remove the repeated code in parser
  - [ ] refactor the parseArgs of tail

<br/>

* **MAYBE**

  - [ ] write test for parse and validate of tests
  
<br/>

* **DONE**
  - [x] ~~consider generic parser~~
  - [x] implement for +0 case
  - [x] implement -r option
  - [x] implement -q option
  - [x] cover the tail -2 file.txt case
  - [x] cover the tail +2 file.txt case
  - [x] check if new contract can be handled using existing parser
  - [x] implement tail main
  - [x] check the parser 
  - [x] modify the validators for tail
  - [x] take the arguments from command prompt
  - [x] use the print function from head
  - [x] make tail works for explicitly for single line 
        if given data contains more than 1 line
  - [x] write test for more than one line.
  - [x] extract tail function from test in to src/tailSrc
  - [x] create file of testTailLib.js in test/tailTest/
  - [x] write expectation
  - [x] take the contract from tail command from shell
  - [x] experiment tail in shell
  - [x] change the directory structure
  - [x] make sure every test is passing

<br/>

----------------------
# HEAD

* **TODO**
  - [ ] refactor parseArgs
  - [ ] duplicate mock functions
  - [ ] seperate mock functions into seperate file

<br/>

* **MAYBE**

<br/>

* **DONE**
  - [x] check for --help is not working properly
  - [x] extract the while loop into seperate function in head/parseArgs
  - [x] seperate test from headMain into headMain and headOFFiles
  - [x] change to lines and bytes structure
  - [x] extract mapper function into headOfFiles
  - [x] remove the getSeperator from the loop executin
  - [x] test console.error in head main function
  - [x] write seperate function for error and log
  - [x] extract into print function seperate file
  - [x] add tests for headMain
  - [x] remove the messy from parseValueAndFile function
  - [x] consider by taking all the files after one file found
  - [x] extract validation into separate file
  - [x] write tests for headMain in headLib.js if more then one file is given
  - [x] implement the console.error
  - [x] throw the related errors for certain validations
  - [x] should works for -1 as option
  - [x] consider `node head.js -1 -c1 a.txt` should throw an error
  - [x] consider more then one file or single file.
  - [x] change the contract of parse args and head
  - [x] refactor the parse and validation
  - [x] remove the complexity from parse args
  - [x] seperate validation from parse args
  - [x] do validation of options 
  - [x] extract joinLines and splitLines into new file.
  - [x] write test for extract function
  - [x] write test for getSeparator
  - [x] remove the references from head
  - [x] think about head function test that reference is taking or not
  - [x] write a parser that will take arguments nad gives structured parameters
  - [x] consider default case.
  - [x] add more test to head
  - [x] run the noOfLines option from head.js
  - [x] use option for no of lines 
  - [x] use option for no of characters
  - [x] implement head.js to use from command line
  - [x] change the contracts of lines and characters
  - [x] think about data structure. are Arrays ok or should i need to change
  - [x] should i need to change the name of headMain . think in a break
  - [x] use the lines and characters function from top level
  - [x] extract joinLines and splitLines in to separate functions
  - [x] refactor filter with slice
  - [x] use parameter for no of characters
  - [x] add character function
  - [x] change the file names from `headMain` to `headLib` 
  - [x] ~~extract filter from headMain function~~
  - [x] change the headMain to lines function
  - [x] write test for more than one line.
  - [x] make head works for explicitly for single line 
        if given data contains more than 1 line
  - [x] ~~consider extension for head contract changing to nl contract~~
  - [x] extract the headMain function in newFile.
  - [x] write expectation for test.
  - [x] create testHeadMain.js.
  - [x] check mocha is working or not.
  - [x] make directory structure.