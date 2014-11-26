Pls
=======

A simple JavaScript Library for launching request overlays

> Pls helps you easily control common tasks for ajax overlays and general succes/error messaging.

## Getting Started
1. Include [pls.js](https://github.com/hankthewhale/pls/blob/master/js/pls.js) and [waitpls.css](https://github.com/hankthewhale/pls/blob/master/css/waitpls.css) in your html. 
   ```html
   <link rel="stylesheet" href="css/waitpls.css">
   <script src="js/pls.js"></script>
   ```

2. Add the overlay template in ```<body>```
   ```html
   <div class="pls-wait" id="pls-overlay">
      <div class="container">
        <div class="spinner"></div>
        <p class="pls-text"></p>
      </div>
      <div class="background"></div>
    </div>
   ```

## Usage  
### Pls overlay
Append new overlays via the ```wait()``` method.
```js
pls('#bodyContainer').wait({
   text: 'Pls wait',
   main: true
});
```

#### wait() options
```js
text: 'your initial message' // (e.g please wait, loading, etc.),
main: true // (Tells the overlay if it's going to be fixed position vs absolutely positioned to a relative parent), 
success: 'Your success message',
error: 'Your error message',
delay: time in milliseconds // (how long after the success/error message appears will the overlay stay visible)
```
For trigger your success/error messages when the ajax call completes, use the ```send()``` method.
```js
pls('#bodyContainer').send('success'); // use error to trigger the error
```

Additionally, you can override the success/error messages set in the ```wait()``` method. This is useful for displaying data that might be returning from the ajax call.
```js
pls('#bodyContainer').send('success', data); // data will override the success/error message.
```


### Pls success/error messages
  
Pls also comes with a general messaging system to append messages at time using ```.message()```.
```js
pls('#bodyContainer').message({
   text: 'I am a success message',
   type: 'success'
});

pls('#bodyContainer').message({
   text: 'I am a error message',
   type: 'error'
});
```

You can also pass in a delay which determines how long the message will display
```js
pls('#bodyContainer').message({
   text: 'I am a success message',
   type: 'success',
   delay: 4000
});
```

To remove all messages, use ```clearMessages()```.
```js
pls(#bodyContainer).clearMessages();
```

You can remove only success or error messages by passing in ```'success'``` or ```'error'``` respectively.
```js
pls(#bodyContainer).clearMessages('success');
```

