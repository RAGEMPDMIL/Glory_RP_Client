let authBrowser ,authCam;

// Disabling movment, camera and chat 
mp.events.add('client:auth:userConnected', () => {
    authBrowser = mp.browsers.new('package://DM_IL_Client/authentication/UI/login/login.html');
    mp.players.local.freezePosition(true);
    mp.game.ui.setMinimapVisible(true);
    mp.gui.chat.activate(false);
    mp.gui.chat.show(false);
    setTimeout(() => {
        mp.gui.cursor.show(true, true);
    }, 500);
    mp.game.ui.displayRadar(false);
    mp.events.call('client:auth:enableCamera');
});

// Hidding loading screen
mp.events.add('client:auth:hideLoginScreen', () => {
    authBrowser.destroy();
    mp.gui.chat.activate(true);
    mp.gui.chat.show(true);
    mp.game.ui.displayRadar(true);
    mp.gui.cursor.show(false, false);
});

// Events for camare control when in authentication
mp.events.add('client:auth:enableCamera', () => {
    authCam = mp.cameras.new('default', new mp.Vector3(0, 0, 0), new mp.Vector3(0, 0, 0), 40);
    mp.players.local.position = new mp.Vector3(-1757.12, -739.53, 10);
    mp.players.local.freezePosition(true);

    authCam.setActive(true);
    authCam.setCoord(-1757.12, -739.53, 25);
    authCam.pointAtCoord(-1764, -715, 35);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
});

mp.events.add('client:auth:disableCamera', () => {
    authCam.destroy();
    mp.game.cam.renderScriptCams(false, false, 0, false, false);
    mp.players.local.freezePosition(false);
});

// Switching between login and register page //
mp.events.add('client:auth:showRegisterPage', () => {
    authBrowser.destroy();
    authBrowser = mp.browsers.new('package://DM_IL_Client/authentication/UI/registration/registration.html');
});

mp.events.add('client:auth:showLoginPage', () => {
    authBrowser.destroy();
    authBrowser = mp.browsers.new('package://DM_IL_Client/authentication/UI/login/login.html');
});

// Login attempted
mp.events.add('client:auth:userLogin', (player, username, password) => {
    mp.events.callRemote('server:auth:userLogin', player ,username, password);
});

// Register attempted
mp.events.add('client:auth:SubmitRegistration', (username, password, email) => {
    mp.events.callRemote('server:auth:userRegister', username, password, email);
})

//Check verification code in mail.
mp.events.add('client:auth:checkVarification',(insertedCode)=>{
    mp.events.callRemote('server:register:checkVarificationMode',insertedCode)
        
    
})

//verification code handler
mp.events.add('client:auth:verificationHandler',(result)=>{
    if(result)
    {
        mp.events.call('client:auth:showLoginPage');
    }
    else
    {
        authBrowser.execute(`onBadRegister(\`codeNotCorrect\`);`);
    }
})

// Login handler
mp.events.add('client:auth:loginHandler', (handle, username) => {
    switch (handle) {
        case 'success': 
        {
            mp.events.call('client:auth:disableCamera');
            mp.events.call('client:auth:hideLoginScreen');
            mp.gui.chat.push(`!{#FB4E4E}Welcome to Israel DeathMatch Server !, ${username}`);
            break;
        }
        case 'incorrectInfo':
        {
            authBrowser.execute(`onBadLogin(\`incorrectInfo\`);`);
            break;
        }
        case 'logged': 
        {
            authBrowser.execute(`onBadLogin(\`logged\`);`);
            break;
        }
        case 'doesntExist':
        {
            authBrowser.execute(`onBadLogin(\`doesntExist\`);`);
            break;
        }
    }
});

// Register handler
mp.events.add('client:auth:registerHandler', (handle) => {
    switch (handle) {
        case 'success':
        {
            authBrowser.execute(`onBadRegister(\`success\`);`);
            //mp.events.call('client:auth:showLoginPage');
            break;
        }
        case 'userExists':
        {
            authBrowser.execute(`onBadRegister(\`userExists\`);`);
            break;
        }
    }
});
