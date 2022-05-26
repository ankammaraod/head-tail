# TAIL #

  => display the last part of a file

**SYNOPSIS: tail [-c # | -n #] file1,[file2,...]**

-n number
  =>The location is number lines.

-c number
  => The location is number bytes.

-q  

  =>Suppresses printing of headers when multiple files are being examined.

-r

  =>Displays the lines in reverse order

<br/>

----------------------
# HEAD #

  => Head displays the first count lines or bytes of a files,
    If count is omitted it defaults to 10

**SYNOPSIS: head [-n lines | -c bytes] file1,[file2,...]**

 -n number 

  => give the first given number of lines 

 -c number

  => give the first given number of characters

 byDefault 

  =>give the first 10 lines from a file