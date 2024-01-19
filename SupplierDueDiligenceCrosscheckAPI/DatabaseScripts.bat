@ECHO OFF

REM Execute EF Core commands to create and apply migrations
dotnet ef migrations add InitialCreate
dotnet ef database update

REM Pause to keep the console window open for viewing output
PAUSE
