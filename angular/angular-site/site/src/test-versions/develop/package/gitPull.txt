d:
cd D:\dv-chart\sites\development\public\lib\dv
git pull

xcopy D:\dv-chart\sites\development\public\lib\dv\index.min.js   D:\Angular\DV-TestSite\src\assets\   /F/R/Y
xcopy D:\dv-chart\sites\development\public\lib\dv\dv.plugins.min.js   D:\Angular\DV-TestSite\src\assets\plugins\   /F/R/Y
xcopy D:\dv-chart\sites\development\public\lib\dv\gcdv.css   D:\Angular\DV-TestSite\src\assets\   /F/R/Y

e:
cd E:\package

md %date:~0,4%-%date:~5,2%-%date:~8,2%
xcopy D:\dv-chart\sites\development\public\lib\dv\index.min.js   E:\package\%date:~0,4%-%date:~5,2%-%date:~8,2%\
xcopy D:\dv-chart\sites\development\public\lib\dv\dv.plugins.min.js   E:\package\%date:~0,4%-%date:~5,2%-%date:~8,2%\
xcopy D:\dv-chart\sites\development\public\lib\dv\gcdv.css   E:\package\%date:~0,4%-%date:~5,2%-%date:~8,2%\