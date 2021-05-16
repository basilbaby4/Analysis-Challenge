# Analysis-Challenge
 

●	What do you think is wrong with the code, if anything?
        -> Invalid return methods
        -> Response data is in different formats
●	Can you see any potential problems that could lead to exceptions
        -> These 2 scenarios will not work properly -  'No shop found' OR 'User already invited to this shop'.  before that below code will be executed.
           ```sh  res.json(invitationResponse) ```
●	How would you refactor this code to:
        -> Create sub functions , then we can reuse same functions later.
●	How might you use the latest JavaScript features to refactor the code?
        -> Use promise 

