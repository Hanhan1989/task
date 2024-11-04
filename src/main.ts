import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';
import expressApp from './app'; // Importa tu archivo app.ts de Express

// Configura tu servidor Express en el puerto 8888
expressApp.listen(8888, () => {
    console.log('Servidor Express corriendo en http://localhost:8888');
});

let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
    // Obtener la pantalla principal
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    mainWindow = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // Quitar el menú
    mainWindow.setMenu(null);

    // Cargar la aplicación Express dentro de la ventana Electron
    mainWindow.loadURL('http://localhost:8888');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
