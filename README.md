Pls
=======

A simple JavaScript Library for launching request overlays

> Pls helps you easily control common tasks for ajax overlays and general succes/error messaging.

## Getting Started
1. Include [pls.js](https://github.com/hankthewhale/pls/blob/master/js/pls.js) and [waitpls.css](https://github.com/hankthewhale/pls/blob/master/js/waitpls.css) in your html. 
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
  
3.  Append the overlay template when making an ajax call
   ```js
   pls('#bodyContainer').wait({
     text: 'Pls wait',
     main: true
   });
   ```
  
4. Hide the overlay when the ajax completes
    ```js
   pls('#bodyContainer').send('success');
   ```
