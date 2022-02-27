const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Pearl Jam'));
bands.addBand(new Band('Metallica'));

module.exports = {
    listen: (io) => {
        io.on('connection', client => {
            console.log('CLIENTE CONECTADO');

            client.emit('active-bands', bands.getBands());

            client.on('vote-band', payload => {
                console.log(payload);

                bands.voteBand(payload.id);
                io.emit('active-bands', bands.getBands());
            })

            client.on('add-band', payload => {
                const band = new Band(payload.name);
                bands.addBand(band);

                io.emit('active-bands', bands.getBands());
            })

            client.on('delete-band', payload => {
                bands.deleteBand(payload.id);
                
                io.emit('active-bands', bands.getBands());
            })

            client.on('disconnect', () => {
                console.log('CLIENTE DESCONECTADO');
            });

            client.on('mensaje', (e) => {
                console.log(e);

                io.emit('mensaje', { admin: 'Nuevo mensaje' });
            })

            client.on('nuevo-mensaje', (e) => {
                console.log(e);

                // io.emit('nuevo-mensaje', e); emite a todos!!
                client.broadcast.emit('nuevo-mensaje', e) // emite a todos menos el que lo emitió
            })
        });
    }
}
