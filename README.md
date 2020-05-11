# resume
A project to showcase my work

### How To Run
```sh
$ git clone https://github.com/spiresd55/resume.git
$ cd ./resume/resume-server
$ npm install
$ npm run start
```

### Consuming the rest services
* localhost:3000/problems/noTimeForTaxi?directions=R3,L3,L3,R4&start=3,5
[get]
  - directions: [R{N}, L{N], ...]
  - start:  x,y
  - This solves: No Time For A Taxi Cab
  - Returns {originalPath, shortestPath, shortestDistance, dijkstraTable}
  - ShortestDistance is the answer
* http://localhost:3000/problems/checksum [POST]
  - ReqBody: {names: ["aaaaa-bbb-z-y-x-123[abxyz]"], ...}
  - This solves: Security Through Obscurity
  - Returns the sum of valid encrypted room names
* http://localhost:3000/problems/bots?start=61&low=17&high=61
  - start: the starting chip number     
  - high: the high-chip value the bot should compare 
  - low: the low-chip value the bot should compare
  - This solves: Balance Bots
  - Returns the bot that compares the high-chip/low-chip based on the starting chip
  - Returns -1 if no bot is found 

### How to test
```sh
$ npm run test
```

This project is using to ts-jest to run tests. 
Coverage report can be found within resume-server/coverage

*Note: I did not test controllers, and I didnt mock much either. 
Since everything was locally written, I thought mocks were unecessary.
I aimed for 95% test coverage. 


##About this project: 
- Used typescript, express, and node
- ./resume-server/src/dataStructures contains a custom circularList, PriorityQueue, and a Graph
- I wrote the data structures and the shortest path algorithim lives within Graph.ts
- I used a mvc pattern for the apis[Router, Route, Controller, and Services]
- ./resume-server/src/services contains the problems seperated into different directories.
- I started writing a client, but ran out of time. I was going to use the original path and shortest path from 
the first question, and animate a html canvas in react. The canvas would of had a coordinate plane with 2 paths. The shortest
and the orignal.
- In the client I was going to use redux-form, redux, and react.
- Extra: ./client contains all the client code I did write. I built a custom grid system in react.
Check out ./src/molecules/Grid. The client is using atomic design.
Read this for more info: https://github.com/danilowoz/react-atomic-design#atoms


***NOTE I AM MORE THAN HAPPY TO IMPLEMENT THE CLIENT, IF THIS WOULD PROOF USEFUL***

