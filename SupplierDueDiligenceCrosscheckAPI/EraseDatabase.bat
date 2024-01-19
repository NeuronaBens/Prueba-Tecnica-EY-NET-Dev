@ECHO OFF

REM Set the SQL Server instance and database name
SET ServerInstance=(localdb)\mssqllocaldb
SET DatabaseName=SupplierDueDiligenceCrosscheckAPIDB

REM Build the SQL command to drop the database
SET SqlCommand=sqlcmd -S %ServerInstance% -d master -Q "DROP DATABASE %DatabaseName%;"

REM Execute the SQL command
%SqlCommand%

REM Pause to keep the console window open for viewing output
PAUSE
