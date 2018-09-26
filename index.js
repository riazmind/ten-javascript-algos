
    function clearNames() {
        var rootDiv = document.getElementById('listContainer');
        if (rootDiv) {
            while (rootDiv.hasChildNodes()) {
                rootDiv.removeChild(rootDiv.lastChild);
            }
        }
    }

    function initDocument() {
        clearNames();
        initUsersNames();
        initMessages();
        initConstantTimeNameFileter();
    }

    function initUsersNames() {
        var rootDiv = document.createElement('div');
        rootDiv.id = 'listContainer';
        var userNamesContainer = document.createElement('div');
        userNames.forEach( function(userName, index) {
            var childDiv = document.createElement('div');
            var text = document.createTextNode(index.toString().concat(' .) ').concat(`${userName.firstName} ${userName.lastName}`));
            childDiv.appendChild(text);
            userNamesContainer.appendChild(childDiv);
        });
        rootDiv.appendChild(userNamesContainer);
        document.body.appendChild(rootDiv);
    }

    function initMessages() {
        var rootDiv = document.createElement('div');
        var messagesContainer = document.createElement('div');
        messagesContainer.id = 'messagesContainer';
        messagesContainer.style['float'] = 'left';
        document.body.appendChild(messagesContainer);
    }

    function clearMessages() { 

        var messagesContainer = document.getElementById('messagesContainer');

        if (messagesContainer) { 
            while (messagesContainer.hasChildNodes()) {
                messagesContainer.removeChild(messagesContainer.lastChild);
            }
        }

        clearFilteredNames();
        clearUserInput();
    }

    function addPlainMessage() {
        const userText = getUserText();
        var messagesContainer = document.getElementById('messagesContainer');
        var messageDiv = document.createElement('p');
        const text = document.createTextNode(userText);
        messageDiv.appendChild(text);
        messagesContainer.appendChild(messageDiv);
        clearUserInput();
    }

    function addHandleMessage(handle) {
        var messagesContainer = document.getElementById('messagesContainer');
        var messageDiv = document.createElement('p');
        var handleSpan = document.createElement('span');
        handleSpan.style['color'] = 'dodgerblue';
        handleText = document.createTextNode(handle);
        handleSpan.appendChild(handleText);
        
        // removed handle from user Text message because it already display in code above 
        let userText = getUserText().replace(/@\S+/g, ''); //start from @ and end at first space to get handle name 
        var messageText = document.createTextNode(userText); 
        
        messageDiv.appendChild(handleSpan);
        messageDiv.appendChild(messageText);
        messagesContainer.appendChild(messageDiv);

        clearFilteredNames();
        clearUserInput();
    }
    
    // Set the flag to True 
    const instructionsFlag = false;
    if (instructionsFlag) {
        console.log(`README`);
        console.log(`
            SETUP ->
            1. INSTALL LODASH USING NPM AND SAVE THE DEPENDENCY TO YOUR PACKAGE.JSON FILE
    
            2. IMPORT LODASH INTO THE INDEX.JS FILE.
    
            3. COMPLETE ALL TODOS
        `);
    }
    
    // Added 10 objects in userNames array. 
    const userNames = [
        {
            firstName: 'Chandler',
            lastName: 'Gegg',
            handle: '@CGegg'
        },
        {
            firstName: 'Phil',
            lastName: 'Mickelson',
            handle: '@PMickelson'
        },
        {
            firstName: 'Grace',
            lastName: 'Hopper',
            handle: '@GHopper'
        },
        {
            firstName: 'Horace',
            lastName: 'Grant',
            handle: '@HGrant'
        },
        {
            firstName: 'Mark',
            lastName: 'Gil',
            handle: '@MGil'
        },
        {
            firstName: 'Hales',
            lastName: 'Riles',
            handle: '@JRiles'
        },
        {
            firstName: 'Alex',
            lastName: 'Joe',
            handle: '@AJoe'
        },
        {
            firstName: 'Gilace',
            lastName: 'Downey',
            handle: '@GDowney'
        },
        {
            firstName: 'Brown',
            lastName: 'Winn',
            handle: '@BWinn'
        },
        {
            firstName: 'Jef',
            lastName: 'Soft',
            handle: '@JSoft'
        }
    ];

    const userMessages = [];
    const dictionaryUserNames = {};

    const debounce = (func, delay) => {
        let inDebounce
        return function() {
            const context = this
            const args = arguments
            clearTimeout(inDebounce)
            inDebounce = setTimeout(() => func.apply(context, args), delay)
        }
    }

    function initConstantTimeNameFileter() {
        // Added Code to create dictionary to use in constant time name filter 
        // First create dictionary having all user names and their keys will be first three characters for both first and last names. 
        // If any new names added with the same first and last name then do not add it as new entry and add it as a part of array in the previous added entry. 

        for (i in userNames) {
            //console.log(userNames[i]);
            //console.log(dictionaryUserNames);

            const firstName3Letters = userNames[i].firstName.toLowerCase().slice(0,3);
            const lastName3Letters = userNames[i].lastName.toLowerCase().slice(0,3);

            if(firstName3Letters in dictionaryUserNames) {
                // add in previous added key array  
                dictionaryUserNames[firstName3Letters].push(userNames[i]);
            } else { 
                // add a new key in object 
                dictionaryUserNames[firstName3Letters] = [userNames[i]]; // add as an array 
            }

            if(lastName3Letters in dictionaryUserNames) {
                // add in previous added key array  
                dictionaryUserNames[lastName3Letters].push(userNames[i]);
            } else { 
                // add a new key in object 
                dictionaryUserNames[lastName3Letters] = [userNames[i]]; // add as an array
            }
        }
    }

    function constantTimeNameFilter(userText) {
        
        // Added Code for Constant Time Name Filter 
        // search name in dictionaryUserNames object. 
        const firstThreeChars = userText.toLowerCase().slice(1,4); 
        console.log(`Search result = ${dictionaryUserNames[firstThreeChars]}`);
        return dictionaryUserNames[firstThreeChars];

    }

    function filterNames(userText) {
        const firstThreeChars = userText.toLowerCase().slice(1,4);
        var re = new RegExp(firstThreeChars, 'g');
        console.log(`First three characters: ${firstThreeChars} `);
        //console.log(`First three characters: ${firstThreeChars} `);
        const filteredNames = [];
        userNames.forEach( (userName) => {
            const fullname = `${userName.firstName.toLowerCase()} ${userName.lastName.toLowerCase()}`;
            //var isMatch = !!userName.firstName.toLowerCase().match(re) || !!userName.lastName.toLowerCase().match(re);
            var isMatch = userName.firstName.toLowerCase().match(re) || userName.lastName.toLowerCase().match(re);
            console.log(`Fullname: ${fullname}` );
            console.log(isMatch);
            console.log(`Fullname: ${fullname}` );
            if (isMatch) {
                filteredNames.push(userName);
            }
        });
        return filteredNames;
    }

    function initFilteredNames(filteredNames) {
        
        // clear all user names 
        clearNames();
        
        // removes all handle buttons
        clearFilteredNames();

        var rootDiv = document.createElement('div');
        rootDiv.id = 'filteredNamesContainer';
        var namesContainer = document.createElement('div');
        filteredNames.forEach( (name) => {
            var nameElm = document.createElement('button');
            nameElm.style['background-color'] = 'dodgerblue';
            nameElm.style['cursor'] = 'pointer';
            nameElm.setAttribute('class', 'filtered-name');
            var text = document.createTextNode(`${name.firstName} ${name.lastName}`);
            nameElm.appendChild(text);
            namesContainer.appendChild(nameElm);

            // added Code
            nameElm.addEventListener('click', () => addHandleMessage(`${name.handle}`));
        
        });
        rootDiv.appendChild(namesContainer);
        document.body.appendChild(rootDiv);
    }

    function clearUserInput() {
        document.getElementById('inputText').value = '';
    }

    function clearFilteredNames() {
        const filteredNames = document.getElementsByClassName('filtered-name');
        Array.from(filteredNames).forEach( (filteredName) => {
            filteredName.remove();
        });        
        
    }

    function getUserText() {
        return document.getElementById('inputText').value.trim();
    }

    function searchNames() {
        const userText = getUserText();
        console.log('Search names ...');
        console.log(userText);
        console.log('Search names ...');

        const firstChar = userText[0] || '';
        if (firstChar === '@') {
            console.log('filter names ...');

            // Regular filter Name 
            // const filteredNames = filterNames(userText);

            // Constant Time filter name. 
            const filteredNames = constantTimeNameFilter(userText);
            //console.log("filteredNames = " + filteredNames); 

            // if filteredNames does not populate then do not display it because sometimes match is not found so filteredNames is undefined.  
            if (typeof filteredNames !== "undefined") {
                initFilteredNames(filteredNames);
            }
        } else {
            console.log('MISSING @ IN USER TEXT');
        }
    }

    document.addEventListener("DOMContentLoaded", function(event) {
        document.getElementById('inputText').addEventListener(
            'input',
            debounce(
                searchNames,
                1000 
            )
        );
        initDocument();
    });
    
