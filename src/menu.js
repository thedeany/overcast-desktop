const electron = require('electron')
const app = electron.app
const appName = app.getName()
const isDev = require('electron-is-dev')

function emit(action) {
  const win = electron.BrowserWindow.getAllWindows()[0]
  win.webContents.send(action)
}

const menu = [
  {
    label: appName,
    submenu: [
      {
        label: `About ${appName}`,
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        label: 'Preferences',
        accelerator: 'Cmd+,',
        click() {
          const win = electron.BrowserWindow.getAllWindows()[0]
          win.loadURL(`file://${__dirname}/pages/preferences.html`)
        }
      },
      {
        label: 'Services',
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        label: `Hide ${appName}`,
        accelerator: 'Cmd+H',
        role: 'hide'
      },
      {
        label: 'Hide Others',
        accelerator: 'Cmd+Shift+H',
        role: 'hideothers'
      },
      {
        label: 'Show All',
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        label: `Quit ${appName}`,
        accelerator: 'Cmd+Q',
        click() {
          app.quit();
        }
      }
    ]
  },
  {
    label: 'File',
    submenu: [
      {
        label: 'Home',
        accelerator: 'Cmd+0',
        click() {
          emit('goto-home')
        }
      },
      {
        label: 'Episodes',
        accelerator: 'Cmd+1',
        click() {
          emit('goto-episodes')
        }
      },
      {
        label: 'Podcasts',
        accelerator: 'Cmd+2',
        click() {
          emit('goto-podcasts')
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'My Account',
        accelerator: 'Cmd+9',
        click() {
          emit('goto-account')
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Reload Page',
        accelerator: 'Cmd+R',
        click() {
          emit('reload-page')
        }
      }
    ]
  }
]

// allow toggling of DevTools if in dev environment
if (isDev) {
  menu[1].submenu.push({
    label: 'Show DevTools',
    accelerator: 'Cmd+Alt+I',
    click() {
      const win = electron.BrowserWindow.getAllWindows()[0]
      win.webContents.toggleDevTools()
    }
  })
}

exports.build = () => {
  return electron.Menu.buildFromTemplate(menu)
}
