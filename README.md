# DanceParty - Hack Western 7

## :tada: WINNER :trophy: of Telus Mental Health award AND 2nd Place over all at HackWestern7 :trophy:

## Inspiration
The pandemic has ruined our collective health. Since its onset, rates of depression amongst teens and adults alike have risen to unprecedented levels. In a world where we are told for our own safety to keep distance from those who we cherish, how do we maintain these relationships and with it, our wellbeing? 

These problems were the inspiration for our solution – Dance Party. What better way to connect with loved ones, promote physical and mental health, then with a little dance and song? Join us as we use cutting edge technologies to build a brighter future, together. 


## What it does

Dance Party is a web application for anyone who is looking to have some fun dancing with friends. It is a cause for good times and good laughs. There is also a little bit of competition for when things get serious. The application is super user-friendly. Once you launch Dance Party and join with the same meeting ID, you can immediately pick a “Dance Leader” to lead the dance and your favorite songs, and then the fun begins. The ‘Dance Leader” leads the choreography and the rest of the group has to match what the “Dance Leader” is doing. You get accumulated points based on how closely you are following the routine in real time. At the end of the time limit, you get to see how you placed amongst your friends, and do it all over again! 

## How we built it

###PoseNet Training Model
We utilized a TensorFlow.js machine learning extension, called PoseNet, to generate the rigid body skeletons of the people in Dance Party. PoseNet can take a picture of individuals and return the data points in the form of x and y coordinates of the 17 major body parts. Using this data, we ran our scoring algorithm to match closeness of the users’ pose to the host’s post. Moreover, to ensure best performance of PoseNet, we performed cross-validation by running the model through various simulated trials and fine-tuned the hyperparameters to ensure the highest average confidence scores.
###Similarity Score and Scoring Algorithm
For the scoring algorithm, we had to compare the rigid body skeletons of the client and the host. We superimposed and normalized each of the body parts through linear algebra, more specifically, through a linear transformation and a favorable change of basis, ensuring that we accounted for potential inversion of the camera and varying lengths of body parts. Once we had each body part superimposed, we simply compared the difference in degrees of each of the skeleton lines and generated a similarity score from 0 to 1. This frame by frame aggregate of score is then used to generate the closest match within a time range, and a score is then given to users who were the closest to the host’s dance moves. To factor in the issue of time lag between the host performing a move and the client copying the move, we cached the last 25 frames of data and used them to get a max score between the different poses. This allowed us to still credit the client, even if they were half a second behind in trying to copy the dance move.
###Frontend
To build the frontend of our app we used React as several of our group members had heard a lot of the hype around it but had yet to try it. We used React to build the room selection page where users can enter in a room ID and username, as well as the Dance Room layout. We utilized webRTC for the group streaming of video, assisted by the Agora API, which handled a lot of the low level work necessary to handle group calling - including built in functionality, such as the video routing between different networks. We then intercepted the video stream and passed it to the PoseNet TensorFlow Model which handled single pose detection. In every Dance Room, there is one host and many participants. Hosts have access to additional settings, having the control to start and pause the Dance Game and the ability to reset the score of all members. If we had more time, we would have liked to flesh this out and create mini games that the host could choose for their room.


## Challenges we ran into
One of the biggest challenges we ran into was in our implementation of Sockets. Sockets are a really powerful way to provide real time updates between a client (website) and the server. However, we were faced with a lot of debugging ‘finicky’ situations where our server was not correctly identifying who was trying to connect to it. It turned out to be a result of a 5 second default timeout value that Socket.Io had and the process-intensive task of pose detection. Recognizing this bug was one of the big ‘euphoria’ moments for the project.  



## Accomplishments that we're proud of
We’re super proud of our Similarity Score algorithm that we made from scratch.  We were a little nervous when putting all of our pieces together, as things always work differently than they theoretically do, but we were pleasantly surprised when we first began testing to see that it worked at a high level of accuracy even at a basepoint, before fine tuning it. It is always great when things you conceptualize in your head come to fruition, and this project is a prime example of that. Going in, we knew this idea was going to be tough to implement, but after two all-nighters and a lot of confidence in each other, we were able to transform our imaginations to reality. 

## What we learned
We learned how to use websockets in conjunction with react to provide real time updates to all connected users in a given socket room. Additionally, we learned the greater lesson of the power of future planning. Our development process would have been a lot more smoother, if planned out, using diagrams and all, how parts would mesh together. 



## What's next for Dance Party
- Add Youtube/external dance routine functionality
  - The core functionality exists, it would be well within the realm of reason to add a YouTube stream and use our detection and similarity algorithms on it. 
- Improve performance
- Host publically
