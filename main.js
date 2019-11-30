const { menubar } = require('menubar');
const { BrowserWindow, app } = require('electron');
const Classroom = require('@lit79/classroom.core');
const {join} = require('path');
const express = require("express");

const api = express();
let classroom = new Classroom("302"); 

api.get("/machines", (req, res)=>{
  res.json(classroom.core.machines);
})

app.on("ready", () => {
  let locked = false;
  let lockWindow = new BrowserWindow({skipTaskbar: true, frame: true, fullscreen: true, minimizable: false, darkTheme: true, draggable: false, autoHideMenuBar: true, resizable: false, closable: false, vibrancy: "dark", show: false, transparent: true, alwaysOnTop: true, title: ":(", titleBarStyle: "hidden"})


  api.get("/lock", (req, res)=>{
    lockWindow.setMenuBarVisibility(false);
    lockWindow.setFullScreen(true);
    lockWindow.setKiosk(true);
    lockWindow.show();
    lockWindow.loadURL(join("file://", __dirname, "index.html"));
    locked = true;
    res.send();
  })
  setInterval(()=>{
    if(locked){
      lockWindow.setMenuBarVisibility(false);
    lockWindow.setFullScreen(true);
    lockWindow.setKiosk(true);
    lockWindow.show();
    lockWindow.loadURL(join("file://", __dirname, "index.html"));
    }
  }, 250);
  api.get("/unlock", (req, res)=>{
    lockWindow.setMenuBarVisibility(true);
    lockWindow.setKiosk(false);
    lockWindow.hide();
    locked = false;
    res.send();
  })
  
  const mb = menubar({
    icon: "./menu_icon.png",
    browserWindow: {
      resizable: false,
      movable: false
    }
  });
  
  mb.on('ready', () => {
    api.listen(7979);
  });
});
