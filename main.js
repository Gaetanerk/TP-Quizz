const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  fs.readFile('questions.json', 'utf-8', (err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier JSON:', err)
      return
    }
    const questions = JSON.parse(data)
    const randomIndex = Math.floor(Math.random() * questions.questions.length)
    const question = questions.questions[randomIndex]
    mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.webContents.send('question', question)
    })
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
