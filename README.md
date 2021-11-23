# TNHDashboard
A leaderboard website for the H3VR gamemode TNH

[Click this link to view to github page!](https://devyndamonster.github.io/TNHDashboard/index.html)

## How It Works
- Users play through the **H3VR** gamemode **Take and Hold**
- Using my mod [TNH Tweaker](https://github.com/devyndamonster/TakeAndHoldTweaker), scores from this gamemode are automatically sent to an [ASP.NET web API](https://github.com/devyndamonster/TNHDashboardAPI)
- The API writes the scores to an SQL Database hosted on Azure
- This website queries the ASP.NET web API for user scores
