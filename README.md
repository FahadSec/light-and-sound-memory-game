# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: **Fahad Alothman**

Time spent: **8** hours spent in total

Link to project: (https://glitch.com/edit/#!/rambunctious-carbonated-wire)

Live site: (https://rambunctious-carbonated-wire.glitch.me)


## Video Walkthrough

Here's a walkthrough of implemented user stories:  
      
#### Easy difficulity - Classic mode:  
![](easy-classic.gif)
        
#### Hard difficulity - Unlimited mode:
![](hard-unlimited.gif)

## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

https://www.w3schools.com/html/html_paragraphs.asp

https://www.w3schools.com/js/js_arrays.asp

https://stackoverflow.com/questions/5119711/whats-the-easiest-way-to-put-space-between-2-side-by-side-buttons-in-asp-net

https://stackoverflow.com/questions/40858456/how-to-display-a-javascript-var-in-html-body

https://cssgradient.io/

http://www.sengpielaudio.com/calculator-notenames.htm

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 

I didn't encounter any significant challenges. However I had to look up some HTML/js/css functions to understand how they work exactly, such as 
Math.random and javascript arrays. I also looked up how to put a space between two buttons in CSS, to seperate the start buttons from
change difficulity button. And I also looked up how to display a javascript variable in an HTML body. (the resources used are linked above).
Also, with the added difficulity levels and the unlimated mode, I encountered some problems like buttons showing up where they are not supposed to
, and where if you press "easy" multiple times the pattern array will keep getting smaller more and more, I fixed these problems by debugging the code
and trying to think of a way to solve them. For example, I solved the error with the "easy" button by making a resetPattern() function which basically
resets the pattern back to 8, and used that whenever the difficlity buttons are pressed. I also had a problem with the speeding up clue playback, where
it keep decreasing super fast, but I fixed that by trying out different values until I found the appropiate speeds, and also set a conditional so it 
doesn't shave more time when it's at minimum speed, 50 milliseconds.

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 

After doing this app, I became more interested in learning about more things in web. So I want to learn about things like the backend and how it's connected to the frontend, and how does website hosting, servers, and API work.
Another question I had was about how to make a web app mobile-friendly, because I tried running the game on my iPhone but it wasn't working proberly.
I'm also wondering about the security side of web applications, and what steps do I need to take to make sure my application is secured.
I'm also interested in learning about other wep languages like PHP and and how they are related to html/css/js.

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 

If I had more time on this project, I would add more features to the game to improve replayability. For example, I would try to implement a system where players can create an account and keep their best scores recorded and can compete with others' best scores in a leaderboard. 
To improve replayability further, I would add the option to unlock certain game themes and sounds if a particular score in the unlimited mode is reached.
Additionally, I would try to make the game mobile-friendly so it's accessible for more people. (And maybe monetize the game with ads ;p).
I would also add an option to recieve feedback/suggestions from players so I can improve the game even further.


## License

    Copyright Fahad Alothman

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
