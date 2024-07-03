const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  onQuestion: (callback) => ipcRenderer.on('question', (event, question) => callback(question))
})
