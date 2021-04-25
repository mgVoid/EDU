Once started, prints out to the console following data:
- users;
- photos related to users;
- unique tags related to photos;
We have no real data, so we'll use "faker" package to fake it.

Requirements:

- Use node.js server
- Use JS class
- Use typescript types
- Use "faker" package to fill the data (data should be appended when initiating the class and calling its methods)

Data structure:

1. users (id, first name, last name, pseudo name, status[enum for active/disabled/banned], created at, updated at, deleted at)
2. photos [relation to users] - (id, user id, img url, verified status[verified or not], description[string max length 500], fire count, created at, updated at, deleted at)
3. tags [related to photos] (id, photo id, tag [string], created at, updated at, deleted at)
