module.exports = {
    listen: (io) => {
        io.on('connection', client => {
            console.log('CLIENTE CONECTADO');
            client.on('disconnect', () => { 
              console.log('CLIENTE DESCONECTADO');
             });
          
             client.on('mensaje', (e) => {
               console.log(e);
          
               io.emit('mensaje', { admin: 'Nuevo mensaje' });
             })
        });
    }
}